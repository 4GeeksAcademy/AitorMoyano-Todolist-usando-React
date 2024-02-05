import React, {useState} from "react";


export const TodoList = () => {
  // estados
  const [task, setTask] = useState("");
  const [user, setUser] = useState('Aitor');
  const [list, setList] = useState([]);  // array de objetos.
  const url_base = 'https://playground.4geeks.com/apis/fake/todos/';

// post
  const createTodoList = async () => {
    const url = url_base + '/user/' + user;
    const options = {
      method : "POST",
      body: JSON.stringify([]),
      headers: {"Content-type": "application/json"}
      
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      //tratamos el error
      console.log('Error: ', response.status, response.statusText)
      return response.status
    }
    const data = await response.json();
    console.log(data);
    getTodoList();
  }
// GET  
  const getTodoList = async () => {
    const url = url_base + '/user/' + user;
    const options = {
      method: "GET"
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      console.log('Error : ', response.status, response.statusText)
      return response.status
    }
    const data = await response.json();
    console.log(data);
    setList(data);
  }
//PUT  
  const updapeTodoList = async (newTask) => {
    const dataToSend = list
    const url = url_base + '/user/' + user;
    const options = {
      method: "PUT",
      body: JSON.stringify(list),
      headers:{
        "content-type":"application/json"
      }
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      console.log('Error : ', response.status, response.statusText)
      return response.status
    }
    const data = await response.json();
    console.log(data)
    getTodoList();
  }
  
//DELETE  
  const deleteTodoList = async () => {
    const url=url_base + '/user/' + user;
    const options = {
      method: "DELETE"
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      console.log('Error : ', response.status, response.statusText)
      return 
    }
    const data = await response.json();
    console.log(data)
    setList("")
  }

  const deleteTaskFetch = async () => {
    const url = url_base + '/user/' + user;
    const options = {
      method: "PUT",
      body: JSON.stringify(list),
      headers:{
        "content-type":"application/json"
      }
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      console.log('Error : ', response.status, response.statusText)
      return response.status
    }
    const data = await response.json();
    console.log(data)
    getTodoList()
  }
  

  // Funcion onClick del icono trash
  const deleteTask = async (item) => {
    setList(list.filter((element, id) => {
      return item !== element;
    }))
    const tarea = () => deleteTaskFetch();
  };

  // Función onSubmit del formualario
  const addTask = (event) => {
    event.preventDefault();
    if (task.trim() === "") {
      return
    };
    const newTask = {label: task, done: false}
    updateTodoList(task)  // nuevo
   
    setTask('');
    //setTask("");
    //setList([...list, newTask]);
  }


  return (
    <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
      
      <button onClick={createTodoList} className="btn btn-primary m-3">Crear TodoList</button>
      <button onClick={getTodoList} className="btn btn-warning m-3">Obtener Tareas</button>
      <button onClick={deleteTodoList} className="btn btn-danger m-3">Borrar TodoList</button>

      {/* Formulario para agregar tareas */}
      <div className="my-3">
        <h1>Todos</h1>
        <form onSubmit={addTask}>
          <input className="form-control" placeholder="Write a new task" type="text"
            value={task}
            onChange={(event) => { setTask(event.target.value); }} />
        </form>
      </div>

      {/* Lista de Tareas */}
      <h2 className="text-primary mt-2">Todos List</h2>
      <div className="list">
        <ul className="list-group">
          {list.map((item, id) => {
            return <li key={id} className="list-group-item d-flex justify-content-between hidden-icon">
              {item.label} - {item.done ? 'terminado' : 'pendiente'}
              <span key={id} onClick={() => { deleteTask(item) }}>
                <i className="fas fa-trash text-danger"></i>
              </span>
            </li>
          })
          }
          <span className="list-group-item bg-light text-end fw-lighter">
            {list.length === 0 ? "No tasks, add a task" : list.length + " Item Left"}
          </span>
        </ul>
      </div>
    </div>
  );
}


