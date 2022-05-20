import { yupResolver } from '@hookform/resolvers/yup';
import {
  setSubmissionsForStudentAndCourseThunk,
  submissionsByStudentAndCourseSelector,
} from '@redux/submissions';
import { tasksByCourseTaskNumberSortSelector } from '@redux/tasks';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import ScoringForm from 'components/forms/ScoringForm';
import { pick } from 'lodash';
import { CourseId } from 'models/course';
import { StudentId } from 'models/student';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useDebounce, useMySnackbar, useParamSelector } from 'utils/hooks';
import {
  batchSetSubmissionsSchema,
  BatchSetSubmissionsSchemaType,
} from 'validation/yup/submission';
import { ScoringModuleStatus } from './types';

export interface ScoringModuleProps {
  studentId: StudentId;
  courseId: CourseId;
  status: ScoringModuleStatus;
  setStatus: (status: ScoringModuleStatus) => void;
}

const ScoringModule = ({
  studentId,
  courseId,
  status,
  setStatus,
}: ScoringModuleProps) => {
  const tasks = useParamSelector(tasksByCourseTaskNumberSortSelector, {
    courseId,
  });

  const submissions = useParamSelector(submissionsByStudentAndCourseSelector, {
    studentId,
    courseId,
  });

  const getDefaultValues = useCallback(() => {
    const coveredTaskIds = new Set(submissions.map((s) => s.task));
    const taskToNumber = new Map(tasks.map((t) => [t.id, t.taskNumber]));
    const convertSubs = submissions.map((s) => ({
      ...pick(s, 'task', 'satisfiedCriteria', 'additionalScore'),
      submittedAt: new Date(s.submittedAt),
    }));
    const newSubs = tasks
      .filter((t) => !coveredTaskIds.has(t.id))
      .map((t) => ({
        task: t.id,
        submittedAt: new Date(),
        satisfiedCriteria: [],
        additionalScore: 0,
      }));
    const newValues = {
      courseId,
      studentId,
      submissions: [...convertSubs, ...newSubs].sort(
        (a, b) =>
          (taskToNumber.get(a.task) ?? 0) - (taskToNumber.get(b.task) ?? 0)
      ),
    };
    return newValues;
  }, [courseId, studentId, submissions, tasks]);

  const methods = useForm<BatchSetSubmissionsSchemaType>({
    resolver: yupResolver(batchSetSubmissionsSchema),
    mode: 'all',
    defaultValues: getDefaultValues(),
  });
  const {
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = methods;

  const dispatch = useAppDispatch();
  const { enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    async (data: BatchSetSubmissionsSchemaType) => {
      setStatus(ScoringModuleStatus.SUBMITTING);
      try {
        await dispatch(
          setSubmissionsForStudentAndCourseThunk({
            ...data,
            submissions: data.submissions
              .filter((s) => s.satisfiedCriteria.length > 0)
              .map((s) => ({
                ...s,
                submittedAt: s.submittedAt.toISOString(),
              })),
          })
        ).then(unwrapResult);
        setStatus(ScoringModuleStatus.COMPLETE);
      } catch (e) {
        defaultErrorEnqueue(e as Error, enqueueError);
        setStatus(ScoringModuleStatus.ERROR);
      } finally {
        setStatus(ScoringModuleStatus.COMPLETE);
      }
    },
    [dispatch, enqueueError, setStatus]
  );
  const onSubmitDebounced = useDebounce(onSubmit, 500);

  const formCourseId = watch('courseId');
  const formStudentId = watch('studentId');

  // we want to change submissions in the form whenever of these events happen:
  // a. studentId changed
  // b. courseId changed
  // any of these events will reset submissions list
  useEffect(() => {
    if (formCourseId !== courseId || formStudentId !== studentId) {
      reset(getDefaultValues());
    }
  }, [
    courseId,
    formCourseId,
    formStudentId,
    getDefaultValues,
    reset,
    studentId,
  ]);

  useEffect(() => {
    const subscription = watch((_, { name, type }) => {
      // if react-hook-form emitted the 'change' event on some field,
      // upload changes to the server
      if (type === 'change' && name != null) {
        setStatus(ScoringModuleStatus.WAITING);
        handleSubmit(onSubmitDebounced)();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onSubmitDebounced, handleSubmit, isDirty, setStatus]);

  useEffect(() => setStatus(ScoringModuleStatus.IDLE), [setStatus]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ScoringForm status={status} />
      </form>
    </FormProvider>
  );
};

export default ScoringModule;
