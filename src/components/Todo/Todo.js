import React, { useEffect, useReducer, useRef } from "react";
import TodoReducer from "../../reducer/TodoReducer/TodoReducer";

const Todo = () => {
  const todoInput = useRef("");
  const [todoList, todoDispatcher] = useReducer(TodoReducer);

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
    todoDispatcher({
      type: "EDIT_TODOS",
      payload : {
        id,
        title
      }
    });
  };
    useEffect(()=>{
      // debugger;
      todoDispatcher({
        type: "LIST_TODOS",
      });
    },[todoList])
    // console.log(todoList);
  return (
    <>
      <h3>Todos App</h3>
      <div style={{ backgroundColor: "#b0aac0", padding: "20px" }}>
        <div className="row">
          <div className="col-auto">
            <input type="text" className="form-control" ref={todoInput} />
            {/* Uncontrolled Component -- where form data is handled by the DOM itself. */}
          </div>
          <div className="col-auto">
            <button className="btn btn-success" onClick={handleAddTodo}>
              ADD TODO
            </button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card">
              <ul className="list-group list-group-flush">
                {todoList?.map((todo) => {
                  return (
                    <li className="list-group-item" key={todo.id}>
                      {todo.title}
                      <button
                        value="button"
                        className="btn-btn primary"
                        onClick={handleEditTodo.bind(this, todo.title, todo.id)}
                      >
                        Edit
                      </button>
                      <button>
                        Click
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
