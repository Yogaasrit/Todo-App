const TodoReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TODOS':
    // Adding new todo in the state.
    return [...state, action.payload];

  case 'EDIT_TODOS':
    // Iterating the state and updating the todo title.
    state?.map((value) => {
      if (action.payload.id === value.id) { return (value.title = action.payload.title); }
      return value;
    });
    return state;

  case 'DELETE_TODO':
    console.log(action.payload.id);
    const deletedArray = state.filter((stateItem) => stateItem.id !== action.payload.id)
      ?.map((stateItem) => {
        return stateItem;
      });
    return deletedArray;
  default:
    return state;
  }
};
export default TodoReducer;
