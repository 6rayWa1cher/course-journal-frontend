import { Container, Paper } from '@mui/material';
import { authUserByStudentIdSelector } from '@redux/authUsers';
import {
  getStudentWithAuthUserThunk,
  studentByIdSelector,
} from '@redux/students';
import StudentForm from 'components/forms/StudentForm/StudentForm';
import PreLoading from 'components/PreLoading';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useParamSelector,
} from 'utils/hooks';
import { formatFullNameWithInitials } from 'utils/string';

const StudentPage = () => {
  const params = useParams();

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
          {student && <StudentForm student={student} authUser={authUser} />}
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default StudentPage;
