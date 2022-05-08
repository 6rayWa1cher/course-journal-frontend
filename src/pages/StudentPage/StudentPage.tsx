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

  const facultyId = Number(params.facultyId);
  const studentId = Number(params.studentId);

  const student = useParamSelector(studentByIdSelector, { studentId });
  const authUser = useParamSelector(authUserByStudentIdSelector, { studentId });
  useDocumentTitle(
    student != null ? formatFullNameWithInitials(student) : 'Студент'
  );
  const thunk = useCallback(
    () => getStudentWithAuthUserThunk({ studentId }),
    [studentId]
  );
  const loadingAction = useLoadingActionThunk(thunk);

  return (
    <Paper>
      <Container>
        <PreLoading action={loadingAction}>
          {student && (
            <StudentModule
              facultyId={facultyId}
              student={student}
              authUser={authUser}
            />
          )}
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default StudentPage;
