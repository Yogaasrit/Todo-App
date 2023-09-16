import React, { useState, useReducer, useRef } from 'react';
import TodoReducer from '../../reducer/TodoReducer/TodoReducer';

const Todo = () => {
  const todoInput = useRef('');
  const editInput = useRef('');

  // Reducer
  const [todoList, todoDispatcher] = useReducer(TodoReducer);

  // Setting visiblity of text box when edit button is clicked.
  const [isVisible, setVisible] = useState(false);

  // State to store the random generated id.
  const [id, setId] = useState();

  // Handler to add todos.
  const handleAddTodo = () => {
    todoDispatcher({
      type: 'ADD_TODOS',
      payload: {
        id: Math.floor(Math.random() * 1000),
        title: todoInput.current.value
      }
    });
  };

  // Handler to edit todos.
  const handleEditTodo = (title, id) => {
    // Changing the visiblity to true so that the text box appears.
    setVisible(!isVisible);

    // Setting the id of todo for which the edit button is clicked.
    setId(id);

    todoDispatcher({
      type: 'EDIT_TODOS',
      payload: {
        id,
        title: editInput.current?.value
      }
    });
  };

  // Handler to delete todos.
  const handleDeleteTodo = (id) => {
    todoDispatcher({
      type: 'DELETE_TODO',
      payload: {
        id
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="col-md-auto">
          <div className="col text-center">
            <h1>TODO APPLICATION</h1>
            <hr></hr>
          </div>
          {/* To add Todos */}
          <div style={{ backgroundColor: '#b0aac0', padding: '10px' }}>
            <div className="row ">
              <div className="col ">
                <h3>Add Todos...</h3>

                <div className="w-50 p-13">
                  <input type="text" className="form-control" ref={todoInput} />
                </div>

                <button
                  className="btn btn-success btn-lg d-flex justify-content-end"
                  onClick={handleAddTodo}
                >
                  ADD TODO
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Displaying the list of todos. */}
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card">
              <div style={{ backgroundColor: '#b0aac0', padding: '10px' }}>
                <ul className="list-group list-group-flush">
                  {todoList?.map((todo) => {
                    return (
                      <li className="list-group-item" key={todo.id}>
                        <div style={{ text: '#b0aac0' }}>
                          {todo.title}
                          {/* when the visiblity is true, the text box appears. */}
                          {todo.id === id
                            ? isVisible && (
                              <input type="text" ref={editInput}></input>
                            )
                            : ''}
                          <div className="d-flex justify-content-end">
                            <button
                              value="button"
                              className="btn btn-primary"
                              onClick={handleEditTodo.bind(
                                this,
                                todo.title,
                                todo.id
                              )}
                            >
                              {isVisible && todo.id === id
                                ? 'Submit'
                                : 'Edit Todo'}
                            </button>
                            {/* Delete Todos */}
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={handleDeleteTodo.bind(this, todo.id)}
                            >
                              Delete Todo
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
