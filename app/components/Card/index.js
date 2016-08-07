import React from 'react';

import IframeCard from './IframeCard.js';
import RatingCard from './RatingCard.js';
import CardToolbar from './CardToolbar';
import ArticleCard from './ArticleCard.js';
import StarRatingComponent from 'react-star-rating-component';

function Card(props) {
  let inner = null;

  switch (props.type) {
    case 'google-maps':
    case 'youtube-video':
    case 'google-calendar':
      inner = (<IframeCard type={props.data.get('type')} title={props.data.get('term')} />);
      break;
    case 'twitter-tweet':
      inner = (<RatingCard {...props}/>);
      break;
    case 'wikipedia-information':
      inner = (<ArticleCard {...props}/>);
      break;
    //case 'yelp-information':
      //inner = (<RatingCard data={props.data}/>)
      //break;
    case 'uber-request':
      inner = <p></p>;
      break;
  }
  return (
    <div style={Object.assign({}, props.style, styles.card)}>
      {inner}
      {this.props.children}
    </div>
  );
}

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

export default Card;
