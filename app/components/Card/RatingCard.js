import React from 'react';

export default (props) =>
  <div>
    <div style={styles.yelp}>
      <div>
        <h2>props.title</h2>
        <h4>prop.subtitle</h4>
        <StarRatingComponent
          style={styles.yelp.rating}
          name={'agdafhfs'}
          editing={false}
          starCount={props.stars}
          value={5}
          /> <p style={styles.yelp.ratingScore}>{props.reviews} Reviews</p>
      </div>
      <div style={{ backgroundSize: 'contain', backgroundPosition: 'center', backgroundImage: `url(${})`}}/>
    </div>
    <CardToolbar tools={props.tools} />
  </div>


const styles = {
  card: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.28)',
    width: '380px',
    backgroundColor: 'rgb(248, 248, 248)',
    margin: 10,
    flex: 1,
    padding: 0
  },
  yelp: {
    padding: '12px 20px',
    rating: {
      fontSize: '2em',
      display: 'inline-block',
    },
    ratingScore: {
      fontSize: 12,
      display: 'inline-block',
      color: '#747474',
    },
    title: {
      color: '#333',
      margin: '3px',
      fontWeight: '700'
    },
    subTitle: {
      color: '#747474',
      fontWeight: '500',
      margin: '4px',
      fontSize: 17
    }
  }
};