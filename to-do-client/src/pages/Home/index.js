import { useContext, useEffect } from "react";
import api from '../../services/todo-api';
import AuthContext from "../../contexts/auth";

function Home() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    loadTasks();
  }, []);

  function loadTasks() {
    api.get('tasks').then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Home;