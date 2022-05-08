import { Container, Paper } from '@mui/material';
import { authUserByStudentIdSelector } from '@redux/authUsers';
import { getGroupByIdThunk } from '@redux/groups';
import {
  getStudentWithAuthUserThunk,
  studentByIdSelector,
} from '@redux/students';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import PreLoading from 'components/PreLoading';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useMySnackbar,
  useParamSelector,
} from 'utils/hooks';
import { formatFullNameWithInitials } from 'utils/string';
import StudentModule from './StudentModule';

const StudentPage = () => {
  const params = useParams();

  const studentId = Number(params.studentId);

  const student = useParamSelector(studentByIdSelector, { studentId });
  const authUser = useParamSelector(authUserByStudentIdSelector, { studentId });
  useDocumentTitle(
    student != null ? formatFullNameWithInitials(student) : 'Студент'
  );

  const dispatch = useAppDispatch();
  const { enqueueError } = useMySnackbar();
  const loadingAction = useCallback(async () => {
    try {
      const { student } = await dispatch(
        getStudentWithAuthUserThunk({ studentId })
      ).then(unwrapResult);
      await dispatch(getGroupByIdThunk({ groupId: student.group })).then(
        unwrapResult
      );
      return student;
    } catch (err) {
      defaultErrorEnqueue(err as Error, enqueueError);
    }
  }, [dispatch, enqueueError, studentId]);

  return (
    <Paper>
      <Container>
        <PreLoading action={loadingAction}>
          {student && <StudentModule student={student} authUser={authUser} />}
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default StudentPage;
