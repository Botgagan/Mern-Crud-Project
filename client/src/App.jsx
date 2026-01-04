import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/login';
import Signup from './component/signUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Default path "/" now opens Login */}
        <Route path="/" element={<Signup />} />
        
        {/* 2. Also map "/login" to Login just in case */}
        <Route path="/login" element={<Login />} />
        
        {/* 3. Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* 4. The Book List is now on "/home" */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
