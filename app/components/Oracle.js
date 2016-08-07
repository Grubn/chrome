import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { Motion, spring } from 'react-motion';
import SideBar from './SideBar.js';
import Loading from './hidden/Loading.js';
import OpeningCircle from './hidden/OpeningCircle.js';

const styles = {
  zIndex: 10000,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  color: '#444',
  fontFamily: "'Roboto', sans-serif",
  fontSize: 16,
  fontWeight: 300
}

class Oracle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      animation: 0
    };
    this.toggleOpen = this._toggleOpen.bind(this);
  }

  componentDidMount() {
    // chrome.runtime.sendMessage({
    //   type: "authenticate",
    // }, (res) => {
    //     return fetch('/user', {
    //     method: 'POST',
    //     body: {
    //       email: res.email,
    //       id: res.id
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(payload => {
    //
    //   })
    //   .catch(e => {
    //     chrome.runtime.sendMessage({
    //       type: 'history'
    //     }, (history) => {
    //       fetch('/users', {
    //         method: 'POST',
    //         body: {
    //           email: res.email,
    //           id: res.id,
    //           history: history
    //         }
    //       })
    //       .then(historyRes => historyRes.json())
    //       .catch(e => console.log(e));
    //     })
    //   })
    // });
  }

  _toggleOpen() {
    return this.setState({ open: !this.state.open });
  }

  // If it's closed, we should display a circle that pulses, and fades away unless you're close to it.
  // Otherwise, grow the bottom and right side border with white, 
  // and then after a 1 sec delay the cards slide out from the right to the left.
  render() {
    return (
      <div>
        <OpeningCircle style={{
          position: 'fixed',
          bottom: 8,
          right: 8,
          zIndex: 100000
        }} onTrigger={() => {
          this.setState({ animation: 1 });
          setTimeout(() => {
            this.setState({ animation: 2 });
            setTimeout(() => {
              this.setState({ open: true });
            })
          })
        } }/>
        <div style={Object.assign({}, styles, {zIndex: this.state.open ? 10000 : -10000})}>
        <div style={{ flex: 1 }} onClick={this.toggleOpen}/>
        <SideBar {...Object.assign({}, this.state, this.props) }/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

function mapDispatchToProps(props) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Oracle);
