import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { queryNLP, storeChromeCreds } from './../actions/actions';
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
      open: true
    };
    this.toggleOpen = this._toggleOpen.bind(this);
  }

  componentDidMount () {
    console.log('content for html: ',rootContent);
    chrome.runtime.sendMessage({
      type: "authenticate",
    }, {}, (res) => {
        console.log('res from content:', res.email);
        return fetch('https://7134cc58.ngrok.io/user', {
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
          fetch('https://7134cc58.ngrok.io/users', {
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
      <Motion
        defaultStyle={{ opacity: 0 }}
        style={{ opacity: spring((this.state.open) ? 1 : 0, { stiffness: 10, damping: 10 }), zIndex: (this.state.open) ? 10000 : -10000 }}>
        {
          (iStyle) =>
            <div style={Object.assign({}, styles, iStyle)}>
              <div style={{flex: 1}} onClick={this.toggleOpen}>
                <OpeningCircle onTrigger={() => this.props.queryNLP(this.props.email, rootContent)}/>
              </div>
              <SideBar {...Object.assign({}, this.state, this.props)}/>
            </div>
        }
      </Motion>
    );
  }
}

var rootContent = document.getElementsByTagName('html')[0];

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
