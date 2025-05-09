import { createContext, useContext, useReducer } from "react";
import { User } from './user';

type Action = {type: 'ADD_USER', payload: User} | {type: 'REMOVE_USER', payload: number};
type State = { users: User[]};

const iState : state = {user:[]};

function reducer(state: State, action: Action): State{
    switch(action.type){
        case 'ADD_USER':
            return {users: [...state.users, action.playload]};
            default:
                return state;
        
    }
}

const Context = createContext<{
    state:State;
    dispatch : React.Dispatch<Action>;
    >
}
({state:iState, dispatch: ()=> null});

export function UserProvider({children}:{children:React.ReactNode}){
    const [state, dispatch] = useReducer(reducer, iState);
    return<Context.Provider valuue={{state, dispatch}}>{children}</Context.Provider>;
}
export const UseContext = ()=> userContext(Context);