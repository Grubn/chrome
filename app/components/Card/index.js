import React from 'react';

function Card(props) {
  let inner = null;

  switch (props.type) {
    case 'google-maps':
    case 'youtube-video':
    inner = <iframe src={props.data}  width='100%' height='100%' frameBorder='0'></iframe>; 
    break;
    case 'google-calendar':
    inner = <p></p>; 
    break;
    case 'twitter-tweet':
    inner = <p></p>; 
    break;
    case 'wikipedia-information':
    inner = <p></p>; 
    break;
    case 'yelp-information':
    inner = <p></p>; 
    break;
    case 'uber-request':
    inner = <p></p>; 
    break; 
  }
  return (
    <div style={Object.assign({}, props.style, styles.card)}>
      {inner}
    </div>
  );
}
const styles = {
  card: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.28)',
    width: (innerWidth > 640) ? '95%' : '80%',
    backgroundColor: 'rgb(248, 248, 248)',
    margin: 10,
    flex: 1
  }
};

export default Card;