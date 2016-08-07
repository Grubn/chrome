import React from 'react';
import { Motion, spring } from 'react-motion';
import SideBar from './SideBar.js';

const styles = {
    zIndex: 10000,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end'
}


/**
 * The Root Component for our Application
 * 
 */
class Oracle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    this.toggleOpen = this._toggleOpen.bind(this);
  }

  _toggleOpen() {
    return this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <Motion
        defaultStyle={{ opacity: 0 }}
        style={{ opacity: spring((this.state.open) ? 1 : 0, { stiffness: 100, damping: 100 }) }}
        onClick={this._toggleOpen}>
        {
          (iStyle) =>
            <div style={Object.assign({}, styles, iStyle)}>
              <SideBar {...this.state}/>
            </div>
        }
      </Motion>
    );
  }
}

export default Oracle;