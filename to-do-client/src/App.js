import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import LoginCallback from './pages/Login/Callback';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login/callback' element={<LoginCallback/>} />
    </Routes>
  );
}

export default App;
