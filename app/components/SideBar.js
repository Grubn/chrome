import React from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import Card from './Card.js';

const styles = {
  root: {
    width: (innerWidth > 640) ? '40vw' : '100vw',
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
                          <Card style={{ opacity: (1 - sStyle.x), transform: `translateY(${sStyle.x * 64}px)` }} key={j} />
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
  cards: [{}, {}, {}, {}, {}, {}, {}, {}]
}
export default SideBar;
