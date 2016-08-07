import React from 'react';

import IframeCard from './IframeCard.js';
import RatingCard from './RatingCard.js';
import CardToolbar from './CardToolbar';
import ArticleCard from './ArticleCard.js';
import StarRatingComponent from 'react-star-rating-component';

function Card(props) {
  let inner = null;

  switch (props.data.get('type')) {
    case 'google-maps':
    case 'youtube-video':
    case 'google-calendar':
      inner = (<IframeCard data={props.data.get('data')}
                           type={props.data.getIn(['metadata', 'type'])}
                           term={props.data.get(['metadata', 'term'])}
                           category={this.data.get(['metadata', 'category'])}/>);
      break;
    case 'twitter-tweet':
      inner = (<RatingCard author={props.data.getIn(['data', 'author'])}
                           authorImage={props.data.getIn(['data', 'authorImage'])}
                           tweet={props.data.getIn(['data', 'tweet'])}
                           type={props.data.getIn(['metadata', 'type'])}
                           term={props.data.getIn(['metadata', 'term'])}
                           category={props.data.getIn(['metadata', 'category'])}/>);
      break;
    case 'wikipedia-information':
      inner = (<ArticleCard data={props.data.get('data')}
                            type={props.data.getIn(['metadata', 'type'])}
                            term={props.data.getIn(['metadata', 'term'])}
                            category={props.data.getIn(['metadata', 'category'])}
                            />);
      break;
    case 'yelp-information':
      inner = (<RatingCard name={props.data.getIn(['data', 'name'])}
                           authorImage={props.data.getIn(['data', 'authorImage'])}
                           description={props.data.getIn(['data', 'description'])}
                           type={props.data.getIn(['metadata', 'type'])}
                           term={props.data.getIn(['metadata', 'term'])}
                           category={props.data.getIn(['metadata', 'category'])}
                />)
      break;
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
