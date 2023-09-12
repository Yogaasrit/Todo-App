import React, { useState, useReducer, useRef } from "react";
import TodoReducer from "../../reducer/TodoReducer/TodoReducer";

const Todo = () => {
  const todoInput = useRef("");
  const editInput = useRef("");
  const [todoList, todoDispatcher] = useReducer(TodoReducer);
  const [isVisible, setVisible] = useState(false);
  const [id, setId] = useState();
  const [progessStatus,setProgressStatus] = useState(true);

  const handleAddTodo = () => {
    todoDispatcher({
      type: "ADD_TODOS",
      payload: {
        id: Math.floor(Math.random() * 1000),
        title: todoInput.current.value,
      },
    });
  };

  const handleEditTodo = (title, id) => {
    setVisible(!isVisible);
    setId(id);
    todoDispatcher({
      type: "EDIT_TODOS",
      payload: {
        id,
        title: editInput.current?.value,
      },
    });
  };

  const handleDeleteTodo = (id) => {
    todoDispatcher({
      type: "DELETE_TODO",
      payload: {
        id,
      },
    });
  };

  return (
    <>
    <div className="container">
    <div className="col-md-auto">
     <div className = 'col text-center'>
      <h1>TODO APPLICATION</h1>
      <hr></hr>
     </div>
      <div style={{ backgroundColor: "#b0aac0", padding: "10px" }}>
        <div className="row ">
          <div className="col ">
            <h3>Add Todos...</h3>
            <div className="w-50 p-13">
            <input type="text" className="form-control" ref={todoInput} />
            </div>
            <button className="btn btn-success btn-lg d-flex justify-content-end" onClick={handleAddTodo}>
              ADD TODO
            </button>
            
            {/* Uncontrolled Component -- where form data is handled by the DOM itself. */}
          </div>
            
          </div>
        </div>
        </div>
        <div className="row mt-3">
          
          <div className="col-md-4">
            <div className="card">
            <div style={{ backgroundColor: "#b0aac0", padding: "10px" }}>
              <ul className="list-group list-group-flush">
                {todoList?.map((todo) => {
                  return (
                    <li className="list-group-item" key={todo.id}>
                      <div style={{ text: "#b0aac0"}}>
                      {todo.title}
                      {todo.id === id
                        ? isVisible && (
                            <input type="text" ref={editInput}></input>
                          )
                        : ""}
                      <div className="d-flex justify-content-end">
                      <button
                        value="button"
                        className="btn btn-primary"
                        onClick={handleEditTodo.bind(this, todo.title, todo.id)}
                      >
                        {isVisible && todo.id === id ? "Submit" : "Edit Todo"}
                      </button>
                     
                      <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDeleteTodo.bind(this, todo.id)}
                    >
                      Delete Todo
                    </button>
                    <button className = 'btn btn-warning' onClick = {()=>{
                      setProgressStatus(!progessStatus);
                    }}>
                      {progessStatus && todo.id === id ?'InProgress':'Completed'}
                    </button>
                    </div>
                    </div>
                    </li>
                  );
                })}
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Todo;
