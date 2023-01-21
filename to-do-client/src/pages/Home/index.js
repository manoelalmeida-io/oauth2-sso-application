import { useEffect } from "react";
import api from '../../services/todo-api';

function Home() {

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
    </div>
  );
}

export default Home;