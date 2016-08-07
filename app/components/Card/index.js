import React from 'react';

import IframeCard from './IframeCard.js';
import RatingCard from './RatingCard.js';
import TweetCard from './TweetCard.js';
import ArticleCard from './ArticleCard.js';


function Card(props) {
  let inner = null;
  console.log('data prop', props.data);

  switch (props.data.metadata.type) {
    case 'google-maps':
      inner = (<IframeCard data={props.data.data}
                           type={props.data.metadata.type}
                           term={props.data.metadata.term}
                           category={this.data.metadata.category}/>);
      break;

    case 'youtube-video':
      inner = (<IframeCard link={props.data.data.link}
                           name={props.data.data.name}
                           type={props.data.metadata.type}
                           term={props.data.metadata.term}
                           category={this.data.metadata.category}/>);
    case 'twitter-tweet':
      inner = (<TweetCard author={props.data.data.author}
                           authorImage={props.data.data.authorImage}
                           tweet={props.data.data.tweet}
                           type={props.data.metadata.type}
                           term={props.data.metadata.term}
                           category={props.data.metadata.category}/>);
      break;
    case 'wikipedia-information':
      inner = (<ArticleCard data={props.data.data}
                            type={props.data.metadata.type}
                            term={props.data.metadata.term}
                            category={props.data.metadata.category}
                            />);
      break;
    case 'yelp-information':
      inner = (<RatingCard name={props.data.data.name}
                           authorImage={props.data.data.authorImage}
                           description={props.data.data.description}
                           type={props.data.metadata.type}
                           term={props.data.metadata.term}
                           category={props.data.metadata.category}
                />)
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
