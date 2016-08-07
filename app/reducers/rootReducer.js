import {
  STORE_CHROME_CREDS,
  STORE_NLP
} from './../actions/actions';

const init = {
  nlp: [],
  email: '',
  id: ''
};

export function reducer (state = init, action) {
  switch (action.type) {
    case STORE_CHROME_CREDS:
      console.log(state);
      return Object.assign({}, state, {email: action.email, id: action.id});

    case STORE_NLP:
      return Object.assign({}, state, {nlp: action.results});

    default:
      return state;
  }
}
