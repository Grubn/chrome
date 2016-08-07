import React from 'react';
import CardToolbar from './CardToolbar';

export default (props) => (
  <div>
    <h3>{props.term}</h3>
    <iframe src={props.data} width='100%' height='250px' frameBorder='0'></iframe>
    <CardToolbar term={props.term}/>
  </div>)
