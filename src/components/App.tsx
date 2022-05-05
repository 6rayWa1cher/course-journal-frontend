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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
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
                path="/employees/:employeeId"
                element={<EditEmployeePage />}
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
