import { Nullable } from 'utils/types';

export interface User {
  id: number;
  sessionToken: string;
}

export interface UserState {
  user: Nullable<User>;
}

export interface Credentials {
  email: string;
  password: string;
}

export const INITIAL_STATE = {
  user: null
};

enum ActionTypes {
  SET_USER = 'SET_USER',
  RESET_USER = 'RESET_USER',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

interface SetUser {
  type: ActionTypes.SET_USER;
  payload: User;
}

interface ResetUser {
  type: ActionTypes.RESET_USER;
}

interface Login {
  type: ActionTypes.LOGIN;
  payload: User;
}

interface Logout {
  type: ActionTypes.LOGOUT;
}

export type Action = SetUser | ResetUser | Login | Logout;

export const actionCreators = {
  setUser: (user: User): SetUser => ({ type: ActionTypes.SET_USER, payload: user }),
  resetUser: (): ResetUser => ({ type: ActionTypes.RESET_USER }),
  login: (user: User): Login => ({ type: ActionTypes.LOGIN, payload: user }),
  logout: (): Logout => ({ type: ActionTypes.LOGOUT })
};

export const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, user: action.payload };
    }
    case 'RESET_USER': {
      return { ...state, user: null };
    }
    case 'LOGIN': {
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      return { ...state, user: null };
    }
    default: {
      return state;
    }
  }
};
