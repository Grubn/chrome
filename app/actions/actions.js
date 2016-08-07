import I from 'immutable'
export const STORE_CHROME_CREDS = 'STORE_CHROME_CREDS';
export const STORE_NLP = 'STORE_NLP';
import { ngrok } from './../misc/ngrok.js';

export function storeNLP (results) {
  return {
    type: STORE_NLP,
    results
  };
}

export function storeChromeCreds (email, id) {
  return {
    type: STORE_CHROME_CREDS,
    email,
    id
  };
}

export function queryNLP(email, content) {
  return dispatch => {
    return fetch(`${ngrok}/nlp`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        content: content
      })
    })
    .then(res => res.json())
    .then(response => dispatch(storeNLP(response)));
  }
}
