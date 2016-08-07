import React from 'react';

function Card (props) {
  return (
    <div style={Object.assign({}, props.style, styles.card)}>
      <p>Card</p>
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