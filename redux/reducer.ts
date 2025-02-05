import {
    ADD_TODO,
    DELETE_ALL_TODO,
    DELETE_TODO,
    UPDATE_COMPLETE,
    UPDATE_TODO,
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    SORT_PRIORITY_ASC,
    SORT_PRIORITY_DESC,
    SORT_NAME_ASC,
    SORT_NAME_DESC,
    SEARCH_TODO
  } from './action';
  
  const initialState = {
    todos: [],
    filtered:[]
  };
  
  const todoReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case ADD_TODO: {
        const {id,name,description, date} = action.payload;
        return {
          ...state,
          todos: [
            ...state.todos,
            {id, name, description, date },
          ],
        };
      }
      case DELETE_ALL_TODO: {
        return {
          ...state,
          todos: [],
        };
      }
      case DELETE_TODO: {
        const {id} = action.payload;
        const updatedTodos = state.todos.filter((todo: any) => todo.id !== id);
        return {
          ...state,
          todos: updatedTodos,
        };
      }

      case SEARCH_TODO: {
        const { name } = action.payload;
      
        const filteredTodos = state.todos.filter(todo =>
          todo.name.toLowerCase().includes(name.toLowerCase()) ||
          todo.description.toLowerCase().includes(name.toLowerCase())
        );
      
        return {...state,
          filtered: filteredTodos,
        };
      }
      
      
      case UPDATE_COMPLETE: {
        const {id} = action.payload;
  
        const updatedTodos = state.todos.map((todo: any) => {
          if (todo.id === id) {
            return {...todo, complete: !todo.complete};
          }
          return todo;
        });
        return {
          ...state,
          todos: updatedTodos,
        };
      }
      case UPDATE_TODO: {
        const {id, name, description, date} = action.payload;
  
        const updatedTodos = state.todos.map((todo: any) => {
          if (todo.id === id) {
            return {...todo, name, description, date};
          }
          return todo;
        });
        return {
          ...state,
          todos: updatedTodos,
        };
      }
  
      case ADD_COMMENT: {
        const {todoId, comment, id} = action.payload;
  
        const updatedTodos = state.todos.map((todo: any) => {
          if (todo.id === todoId) {
            return {...todo, comments: [...todo.comments, {comment, id}]};
          }
          return todo;
        });
        return {
          ...state,
          todos: updatedTodos,
        };
      }
      case DELETE_COMMENT: {
        const {todoId, commentId} = action.payload;
  
        const updatedTodos = state.todos.map((todo: any) => {
          if (todo.id === todoId) {
            const updatedComments = todo.comments.filter(
              (comment: any) => comment.id !== commentId,
            );
            return {...todo, comments: updatedComments};
          }
          return todo;
        });
  
        console.log(updatedTodos);
  
        return {
          ...state,
          todos: updatedTodos,
        };
      }
      case UPDATE_COMMENT: {
        const {todoId, commentId, updatedComment} = action.payload;
        const updatedTodos = state.todos.map((todo: any) => {
          if (todo.id === todoId) {
            const updatedComments = todo.comments.map((comment: any) => {
              if (comment.id === commentId) {
                return {...comment, comment: updatedComment};
              }
              return comment;
            });
            return {...todo, comments: updatedComments};
          }
          return todo;
        });
        return {
          ...state,
          todos: updatedTodos,
        };
      }
      case SORT_PRIORITY_ASC: {
        const sortedTodos = [...state.todos].sort(
          (a: any, b: any) => a.priority - b.priority,
        );
        return {
          ...state,
          todos: sortedTodos,
        };
      }
      case SORT_PRIORITY_DESC: {
        const sortedTodos = [...state.todos].sort(
          (a: any, b: any) => b.priority - a.priority,
        );
        return {
          ...state,
          todos: sortedTodos,
        };
      }
  
      case SORT_NAME_ASC: {
        const sortedTodos = [...state.todos].sort((a: any, b: any) =>
          a.task.localeCompare(b.task),
        );
        return {
          ...state,
          todos: sortedTodos,
        };
      }
  
      case SORT_NAME_DESC: {
        const sortedTodos = [...state.todos].sort((a: any, b: any) =>
          b.task.localeCompare(a.task),
        );
        return {
          ...state,
          todos: sortedTodos,
        };
      }
      default:
        return state;
    }
  };
  
  export default todoReducer;
  