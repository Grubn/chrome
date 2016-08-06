import React from 'react';
import {Motion, spring} from 'react-motion';
import SideBar from './SideBar.js';

class Oracle extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: true
    }
    this.toggleOpen = this._toggleOpen.bind(this)
  }

  _toggleOpen () {
    return this.setState({open: !this.state.open});
  }

  render () {
    return (
      <div style={styles.sidebar}>
        <Motion
         defaultStyle={{
           transform: 100,
           opacity: 0
         }}

         style={{
           transform: spring((this.state.open) ? 0 : 100),
           opacity: spring((this.state.open) ? 1 : 0, { stiffness: 20, damping: 4 })
         }}>
         {
           (iStyle) => <SideBar style={{iStyle}}/>
         }
       </Motion>
     </div>
    );
  }
}

export default Oracle;

var styles = {
  sidebar: {
    zIndex: 10000,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    right: 0,
    display: 'flex',
    width: '36.2vw',
    height: '100vh',
    backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.45))'
  }
}
