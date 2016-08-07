import React from 'react';
import CardToolbar from './CardToolbar';

export default (props) => (<div>
  <h2 style={styles.mapHeader}>props.</h2>
  <iframe src={props.data} width='100%' height='250px' frameBorder='0'></iframe>
  <CardToolbar cards={props.tools}/>
</div>)