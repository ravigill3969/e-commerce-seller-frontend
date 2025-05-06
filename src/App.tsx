import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
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
          <Route path='' element=<Home /> />
          <Route path='search' element=<Search /> />
          <Route path='upload-product' element=<UploadProduct /> />
          <Route path='see-product' element=<SeeProduct /> />
          <Route path='dashboard' element=<Dashboard /> />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
