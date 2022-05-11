import React from 'react';
import PreloaderWrapper from './PreloaderWrapper';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import StageRoute from './StageRoute';
import LoginPage from 'pages/LoginPage';
import StageRedirect from './StageRedirect';
import 'react-toastify/dist/ReactToastify.css';
import MainElement from './MainElement';
import { Stage } from '@redux/app';
import Logout from './Logout';
import AdminMainPage from 'pages/AdminMainPage';
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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
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
            </Route>

            <Route path="settings" element={<SettingsPage />} />
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
  </ThemeProvider>
);

export default App;
