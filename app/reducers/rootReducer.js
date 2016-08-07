import I from 'immutable';
import {
  STORE_CHROME_CREDS,
  STORE_NLP
} from './../actions/actions';

export function reducer (state = I.Map({}), action) {
  switch (action.type) {
    case STORE_CHROME_CREDS:
      console.log(state);
      return state.set('email', action.email)
                  .set('id', action.id);

    case STORE_NLP:
      return state.set('nlp', action.result);

    default:
      return state;
  }
}
