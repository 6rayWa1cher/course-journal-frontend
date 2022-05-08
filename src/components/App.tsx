import React from 'react';
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
import MainPage from 'pages/MainPage';
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
            <Route index element={<MainPage />} />
            <Route
              element={
                <RoleRoute role={UserRole.ADMIN} fallback="/">
                  <Outlet />
                </RoleRoute>
              }
            >
              <Route path="/employees" element={<EmployeeExplorerPage />} />
              <Route
                path="/employees/create"
                element={<CreateEmployeePage />}
              />
              <Route
                path="/employees/:employeeId"
                element={<EditEmployeePage />}
              />
              <Route path="/faculties" element={<FacultyExplorerPage />} />
              <Route path="/faculties/:facultyId" element={<FacultyPage />} />
              <Route
                path="/faculties/:facultyId/students/:studentId"
                element={<StudentPage />}
              />
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
  </ThemeProvider>
);

export default App;
