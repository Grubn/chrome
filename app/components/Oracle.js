import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { queryNLP, storeChromeCreds } from './../actions/actions';
import { Motion, spring } from 'react-motion';
import SideBar from './SideBar.js';
import Loading from './hidden/Loading.js';
import OpeningCircle from './hidden/OpeningCircle.js';
import { ngrok } from './../misc/ngrok.js';

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

  componentDidMount () {
    // chrome.runtime.sendMessage({
    //   type: "authenticate",
    // }, {}, (res) => {
    //     console.log('res from content:', res.email);
    //     return fetch(`${ngrok}/user`, {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       email: res.email,
    //       googleId: res.id
    //     })
    //   })
    //   .then(response => response.json())
    //   .then(payload => {
    //
    //   })
    //   .catch(e => {
    //     chrome.runtime.sendMessage({
    //       type: 'history'
    //     }, {}, (history) => {
    //       console.log('res history: ', res);
    //       fetch(`/${ngrok}/users`, {
    //         method: 'POST',
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //           email: res.email,
    //           googleId: res.id,
    //           history: history
    //         })
    //       })
    //       .then(historyRes => historyRes.json())
    //       .catch(e => console.log(e));
    //     })
    //   })
    // });
    chrome.runtime.sendMessage({
      type: "authenticate",
    }, {}, (res) => {
        return fetch(`${ngrok}/user`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: res.email,
          googleId: res.id
        })
      })
      .then(response => response.json())
      .then(payload => {
        this.props.storeChromeCreds(payload.email, payload.id);
      })
      .catch(e => {
        this.props.storeChromeCreds(res.email, res.id);
        chrome.runtime.sendMessage({
          type: 'history'
        }, {}, (history) => {
          var trimmed = [history[0], history[1], history[2], history[3], history[4], history[5], history[6], history[7] ,history[8], history[9]];
          console.log('res history: ', res);
          fetch(`${ngrok}/users`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: res.email,
              googleId: res.id,
              history: trimmed
            })
          })
          .then(historyRes => historyRes.json())
          .catch(e => console.log(e));
        })
      })
    });
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
          this.props.queryNLP(this.props.email, this.props.rootContent);
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

function mapStateToProps (state) {
  return {
    // loading: state.loading,
    email: state.get('email'),
    id: state.get('id'),
    nlp: state.get('nlp')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    queryNLP: bindActionCreators(queryNLP, dispatch),
    storeChromeCreds: bindActionCreators(storeChromeCreds, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Oracle);
