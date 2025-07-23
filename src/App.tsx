import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import UploadProduct from './pages/UploadProduct';
import SeeProduct from './pages/SeeProduct';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element=<Login /> />
          {/* <Route path='' element=<Home /> /> */}
          {/* <Route path='search' element=<Search /> /> */}
          <Route path='upload-product' element=<UploadProduct /> />
          <Route path='' element=<SeeProduct /> />
          <Route path='dashboard' element=<Dashboard /> />
          <Route path='/edit-product/:id' element=<UploadProduct /> />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
