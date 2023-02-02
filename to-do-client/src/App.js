import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import LoginCallback from './pages/Login/Callback';
import SignOut from './pages/Login/SignOut';
import { AuthProvider } from './contexts/auth';
import { UnauthorizedInterceptor } from './services/todo-api';

function App() {
  return (
    <AuthProvider>
      <UnauthorizedInterceptor>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login/callback' element={<LoginCallback/>} />
          <Route path='/login/signout' element={<SignOut/>} />
        </Routes>
      </UnauthorizedInterceptor>
    </AuthProvider>
  );
}

export default App;
