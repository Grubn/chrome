import React from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import Card from './Card';

const styles = {
  root: {
    fontSize: 14,
    width: 460,
    height: '100vh',
    zIndex: 100000,
    backgroundImage: 'linear-gradient(90deg, rgba(8,8,8,0),rgba(8,8,8,0.1) 24px, rgba(8,8,8,0.18) 96px)',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8
  },
  cardContainer: {
    width: (innerWidth > 640) ? '90%' : '100%'
  }
}

class SideBar extends React.Component {

componentDidMount () {
  console.log('sideBar CDM: ', this.props.cards);
}

  render() {
    console.log('cards', this.props.cards);
    var styleArr = this.props.cards.map((card) => ({ x: 1 }));
    console.log('styleArr', styleArr);
    return (
      <Motion
        defaultStyle={{ transform: 100, opacity: 0 }}
        style={{ transform: spring((this.props.open) ? 0 : 460), opacity: spring((this.props.open) ? 1 : 0) }}>
        {
          (iStyle) =>
            <div style={Object.assign({}, styles.root, { opacity: iStyle.opacity, transform: `translateX(${iStyle.transform}px)` })}>
                  <StaggeredMotion
                    defaultStyles={styleArr}
                    styles={(pStyles) =>
                      pStyles.map((_, i) =>
                        (i === 0) ? { x: spring((this.props.open) ? 0 : 1) } :
                          { x: spring(pStyles[i - 1]['x']) })}>
                    {
                      (sStyles) =>
                        (<div style={styles.cardContainer}>
                          {
                            sStyles.map((sStyle, j) => {
                              console.log(`in sStyles:  ${$this.props.cards}`)
                              return <Card style={{ opacity: (1 - sStyle.x), transform: `translateX(${sStyle.x * 64}px)` }} key={j} data={this.props.cards[j]}/>
                            })
                          }
                        </div>)
                    }
                  </StaggeredMotion>
            </div>
        }
      </Motion>
    );
  }
}

var dev = [{"metadata":{"type":"google-maps","term":"Miami","catergory":"location"},"data":"https://www.google.com/maps?q=maimi"},{"metadata":{"type":"youtube-video","term":"Miami","catergory":"location"},"data":"https://www.youtube.com/watch?v=XzGLSrgrT2M"},{"metadata":{"type":"youtube-video","term":"Miami","catergory":"location"},"data":"https://www.youtube.com/watch?v=XzGLSrgrT2M"},{"metadata":{"type":"twitter-tweet","term":"GraphQL","catergory":"location"},"data":{"author":"stubailo","tweet":"Slowly expanding my repository of different ways to generate #GraphQL schemas in JavaScript! https://github.com/apollostack/graphql-syntax … add your own!","authorImage":"https://pbs.twimg.com/profile_images/711276909544361984/eL3C4-Ui_bigger.jpg"}},{"metadata":{"type":"wikipedia-information","term":"Composition over Inheritance","catergory":"location"},"data":"https://en.wikipedia.org/wiki/Composition_over_inheritance"},{"metadata":{"type":"yelp-information","term":"Barcade","catergory":"location"},"data":{"name":"Barcade","description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat alias commodi maiores assumenda ad. Rerum eligendi unde obcaecati, eius expedita, tempora itaque accusamus non molestias nihil, amet dolores velit cupiditate.","authorImage":"https://pbs.twimg.com/profile_images/711276909544361984/eL3C4-Ui_bigger.jpg"}}]

SideBar.defaultProps = {
  cards: dev
}
export default SideBar;
