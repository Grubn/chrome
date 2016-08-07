import React from 'react';
import CardToolbar from './CardToolbar';
import StarRatingComponent from 'react-star-rating-component';

function Card(props) {
  let inner = 'hi';

  switch (props.type) {
    case 'google-maps':
    case 'youtube-video':
    inner = (
      <div>
        <h2 style={styles.mapHeader}>2211 Portofino Drive, Homestead, FL</h2>
        <iframe src={props.data} width='100%' height='250px' frameBorder='0'></iframe>
        <CardToolbar />
      </div>
    );
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
    inner = (
      <div>
        <div style={styles.yelp}>
          <div>
            <h2 style={styles.yelp.title}>Crif Dogs</h2>
            <p style={styles.yelp.subTitle}>Hot Dogs, American</p>
              <StarRatingComponent
                          style={styles.yelp.rating}
                          name="yelpRating"
                          editing={false}
                          starCount={5}
                          value={5}
              /> <p style={styles.yelp.ratingScore}>1879 Reviews</p>
          </div>
          <img src="http://newyork.seriouseats.com/images/20081216-crifdogs-goodmorning.jpg" width="50px" height="50px"/>
        </div>
        <CardToolbar />
      </div>
    );
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
    flex: 1,
    padding: 0
  },
  mapHeader: {
    margin: 0,
    padding: '18px 20px',
    color: '#333'
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

export default Card;
