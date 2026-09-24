
import { BrowserRouter, Outlet, Route, Routes, Navigate } from 'react-router';
import Login from './pages/Login';
import UploadProduct from './pages/UploadProduct';
import SeeProduct from './pages/SeeProduct';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/Register';
import { useUser } from './Context/UserContext';

function ProtectedRoutes() {
  const { isLoading, isLoggedIn } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<SeeProduct />} />
            <Route path="/upload-product" element={<UploadProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-product/:id" element={<UploadProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;
