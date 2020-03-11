import { createStore } from 'redux'
function todos(state = [], action) {
  switch (action.type) {
      case 'ADD_CLIENT':
          return state.concat([action.clientdata])
      default:
          return state
  }
}

const Clients = createStore(todos, []);

export default Clients;