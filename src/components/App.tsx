/* eslint-disable react/jsx-no-undef */
import PreloaderWrapper from './PreloaderWrapper';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import StageRoute from './StageRoute';
import LoginPage from 'pages/LoginPage';
import StageRedirect from './StageRedirect';
import 'react-toastify/dist/ReactToastify.css';
import MainElement from './MainElement';
import { Stage } from '@redux/app';
import Logout from './Logout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserRole } from 'models/authUser';
import RoleRoute from './RoleRoute';
import EmployeeExplorerPage from 'pages/EmployeeExplorerPage';
import EditEmployeePage from 'pages/EditEmployeePage';
import CreateEmployeePage from 'pages/CreateEmployeePage';
import FacultyExplorerPage from 'pages/FacultyExplorerPage';
import FacultyPage from 'pages/FacultyPage';
import { CssBaseline } from '@mui/material';
import StudentPage from 'pages/StudentPage';
import SettingsPage from 'pages/SettingsPage';
import CourseSelectorPage from 'pages/CourseSelectorPage';
import IndexRedirect from './IndexRedirect';
import CreateCoursePage from 'pages/CreateCoursePage';
import CoursePage from 'pages/CoursePage';
import TaskListPage from 'pages/TaskListPage';
import CreateTaskPage from 'pages/CreateTaskPage';
import { LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import EditTaskPage from 'pages/EditTaskPage';
import SubmissionsPage from 'pages/SubmissionsPage';
import EditCoursePage from 'pages/EditCoursePage';
import CourseSettingsPage from 'pages/CourseSettingsPage';
import CourseTokenLoader from './CourseTokenLoader';
import CourseTokenRedirect from './CourseTokenRedirect';
import CourseTokenCoursePage from 'pages/CourseTokenCoursePage';
import TaskPage from 'pages/TaskPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
      <CssBaseline enableColorScheme />
      <PreloaderWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainElement />}>
              <Route index element={<IndexRedirect />} />

              <Route
                path="employees"
                element={
                  <RoleRoute role={UserRole.ADMIN} fallback="/">
                    <Outlet />
                  </RoleRoute>
                }
              >
                <Route index element={<EmployeeExplorerPage />} />
                <Route path="create" element={<CreateEmployeePage />} />
                <Route path=":employeeId" element={<EditEmployeePage />} />
              </Route>

              <Route
                path="faculties"
                element={
                  <RoleRoute role={UserRole.ADMIN} fallback="/">
                    <Outlet />
                  </RoleRoute>
                }
              >
                <Route index element={<FacultyExplorerPage />} />
                <Route path=":facultyId">
                  <Route index element={<FacultyPage />} />
                  <Route path="students/:studentId" element={<StudentPage />} />
                </Route>
              </Route>

              <Route
                path="courses"
                element={
                  <RoleRoute role={UserRole.TEACHER} fallback="/">
                    <Outlet />
                  </RoleRoute>
                }
              >
                <Route index element={<CourseSelectorPage />} />
                <Route path="create" element={<CreateCoursePage />} />
                <Route path=":courseId">
                  <Route index element={<CoursePage />} />
                  <Route path="edit" element={<EditCoursePage />} />
                  <Route path="tasks">
                    <Route index element={<TaskListPage />} />
                    <Route path="create" element={<CreateTaskPage />} />
                    <Route path=":taskId">
                      <Route index element={<TaskPage />} />
                      <Route path="edit" element={<EditTaskPage />} />
                    </Route>
                  </Route>
                  <Route path="submissions" element={<SubmissionsPage />} />
                  <Route path="settings" element={<CourseSettingsPage />} />
                </Route>
              </Route>

              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route
              path="/ct/:token"
              element={
                <CourseTokenLoader>
                  <MainElement />
                </CourseTokenLoader>
              }
            >
              <Route index element={<CourseTokenRedirect />} />
              <Route path="courses">
                <Route index element={<CourseTokenRedirect />} />
                <Route path=":courseId">
                  <Route index element={<CourseTokenCoursePage />} />
                  <Route path="tasks">
                    <Route index element={<TaskListPage readonly />} />
                    <Route path=":taskId" element={<TaskPage readonly />} />
                  </Route>
                  <Route
                    path="submissions"
                    element={<SubmissionsPage readonly />}
                  />
                </Route>
              </Route>
            </Route>
            <Route
              element={
                <StageRoute stage={Stage.UNAUTHORIZED}>
                  <Outlet />
                </StageRoute>
              }
            >
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<StageRedirect />} />
          </Routes>
        </BrowserRouter>
      </PreloaderWrapper>
      <ToastContainer />
    </LocalizationProvider>
  </ThemeProvider>
);

export default App;
