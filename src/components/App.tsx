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
import { UserRole } from 'models/authUser';
import RoleRoute from './RoleRoute';
import EmployeeExplorerPage from 'pages/admin/EmployeeExplorerPage';
import EditEmployeePage from 'pages/admin/EditEmployeePage';
import CreateEmployeePage from 'pages/admin/CreateEmployeePage';
import FacultyExplorerPage from 'pages/admin/FacultyExplorerPage';
import FacultyPage from 'pages/admin/FacultyPage';
import { CssBaseline } from '@mui/material';
import StudentPage from 'pages/admin/StudentPage';
import SettingsPage from 'pages/SettingsPage';
import CourseSelectorPage from 'pages/teacher/CourseSelectorPage';
import IndexRedirect from './IndexRedirect';
import CreateCoursePage from 'pages/CreateCoursePage';
import CoursePage from 'pages/teacher/CoursePage';
import TaskListPage from 'pages/TaskListPage';
import CreateTaskPage from 'pages/teacher/CreateTaskPage';
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
import LocalThemeProvider from './LocalThemeProvider';
import AttendanceJournal from 'pages/teacher/AttendanceJournal';
import HeadmanCourseSelectorPage from 'pages/headman/HeadmanCourseSelectorPage';

const App = () => (
  <LocalThemeProvider>
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
                  <Route path="attendance" element={<AttendanceJournal />} />
                  <Route path="submissions" element={<SubmissionsPage />} />
                  <Route path="settings" element={<CourseSettingsPage />} />
                </Route>
              </Route>

              <Route
                path="headman"
                element={
                  <RoleRoute role={UserRole.HEADMAN} fallback="/">
                    <Outlet />
                  </RoleRoute>
                }
              >
                <Route index element={<HeadmanCourseSelectorPage />} />
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
  </LocalThemeProvider>
);

export default App;
