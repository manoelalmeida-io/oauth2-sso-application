import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import LoginCallback from './pages/Login/Callback';
import { AuthProvider } from './contexts/auth';
import { UnauthorizedInterceptor } from './services/todo-api';

function App() {
  return (
    <AuthProvider>
      <UnauthorizedInterceptor>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login/callback' element={<LoginCallback/>} />
        </Routes>
      </UnauthorizedInterceptor>
    </AuthProvider>
  );
}

export default App;
