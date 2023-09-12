const TodoReducer = (state = [], action) => {

  switch (action.type) {
  case 'ADD_TODOS':
    return [...state, action.payload];
  case 'EDIT_TODOS':
    state.map((value)=>{
      if(action.payload.id === value.id)
      {
        action.payload.title = 'edited';
        return value.title = 'edited';    
      }
      else
        return value.title;
    })
    return state;
  case 'LIST_TODOS':
    return state;
  default:
    return state
  }
};
export default TodoReducer;