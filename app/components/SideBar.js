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
  render() {
    return (
      <Motion
        defaultStyle={{ transform: 100 }}
        style={{ transform: spring((this.props.open) ? 0 : 100, { stiffness: 100, damping: 25 }) }}>
        {
          (iStyle) =>
            <div style={Object.assign({}, styles.root, { transform: `translateX(${iStyle.transform}vw)` })}>
              <StaggeredMotion
                defaultStyles={this.props.cards.map((c) => ({ x: 1 }))}
                styles={(pStyles) =>
                  pStyles.map((_, i) =>
                    (i === 0) ? { x: spring(0) } :
                      { x: spring(pStyles[i - 1]['x']) })}>
                {
                  (sStyles) =>
                    (<div style={styles.cardContainer}>
                      {
                        sStyles.map((sStyle, j) =>
                          <Card style={{ opacity: (1 - sStyle.x), transform: `translateY(${sStyle.x * 64}px)` }} key={j} {...this.props.cards[j]}/>
                        )
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
SideBar.defaultProps = {
  cards: [
    {
      type: 'google-maps',
      data: 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12159.142495365222!2d-74.165099!3d40.36927755!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1470541281416',
      tools: [{name: 'google', url: ''}],
      title: 'My Location'
  }, {
      type: 'yelp-information',
      data: '',
      tools: []
    }, {

    }, {

    }]
}
export default SideBar;
