import React from 'react';
import CardToolbar from './CardToolbar';

export default (props) => (
  <div>
    <h3>{props.title}</h3>
    <iframe src={props.data} width='100%' height='250px' frameBorder='0'></iframe>
    <CardToolbar tools={props.tools}/>
  </div>)