import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;

    this.state = {
      loop: 1
    };

    this.animate = (deltaTime) => {
      this.setState({ loop: ((this.state.loop + 8) > 200.16) ? -200.16 : (this.state.loop + 8) });
      this.timer = requestAnimationFrame(this.animate);
    }
  }



  componentDidMount() {
    this.timer = requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.timer);
  }

  render() {
    return (
      <svg viewBox="0 0 64 64" style={styles.svg}>
        <circle  cx="32" cy="32" r="26" style={Object.assign({}, styles.path, { strokeDashoffset: this.state.loop })}/>
      </svg>)
  }
}

const styles = {
  svg: {
    width: 64,
    height: 64
  },
  path: {
    fill: 'none',
    stroke: '#888',
    strokeWidth: 4,
    strokeMiterlimit: 32,
    strokeDasharray: 200.16
  }
};

export default Loading;