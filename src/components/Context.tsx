import React, { createContext, useContext, useReducer } from "react";
import { User } from './user';

type Action = 
  | { type: 'ADD_USER'; payload: User } 
  | { type: 'REMOVE_USER'; payload: number };

type State = { users: User[] };

const initialState: State = { users: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_USER':
      return { users: [...state.users, action.payload] };
    case 'REMOVE_USER':
      return { users: state.users.filter(user => user.id !== action.payload) };
    default:
      return state;
  }
}

const UserContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
