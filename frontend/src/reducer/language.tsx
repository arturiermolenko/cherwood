import { SET_LANGUAGE } from "../action/action"; 

interface Action {
  type: string;
  payload: boolean;
}

interface State {
  booleanValue: boolean;
}

const initialState: State = {
  booleanValue: false,
};

const languageReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        booleanValue: action.payload,
      };
      
    default:
      return state;
  }
};

export default languageReducer;