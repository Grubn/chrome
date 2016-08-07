import React from 'react';

/**
 * A Complicated Series of Animations
 */
class OpeningCircle extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;

    this.state = {
      loop: 0,
      onHover: false,
      hide: false
    };

    // Functions
    this.animate = (timestamp) => {
      this.setState({ loop: ((this.state.loop + 4) > 50) ? -50 : (this.state.loop + 4) });
      if (this.state.hovering)
        this.timer = requestAnimationFrame(this.animate);
    }

    this.cancelAnimation = () => {
      cancelAnimationFrame(this.timer);
      this.setState({ loop: 0, hovering: false });
      setTimeout(() => this.setState({ hide: true }), 1000)
    }

    this.triggerHover = () => {
      if (!this.state.hovering) {
        this.setState({ hovering: true });

        this.timer = requestAnimationFrame(this.animate);

        setTimeout(() => {
          if (this.state.hovering === true)
            this.props.onTrigger();
          else
            this.cancelAnimation();
        }, 1000);
      }
    }

    this.triggerLeave = () => {
      this.setState({ hovering: false });
    }
  }

  componentDidMount() {
    var offsetWidth, offsetHeight, offsetLeft, offsetTop;
    offsetWidth = this.myRef.offsetWidth
    offsetHeight = this.myRef.offsetHeight;
    offsetLeft = this.myRef.offsetLeft;
    offsetTop = this.myRef.offsetTop;

    window.addEventListener('mousemove', (e) => {
      let sqrLen = (a, b, x, y) => (x - a) * (x - a) + (y - b) * (y - b);
      if (sqrLen(e.clientX, e.clientY, (offsetLeft + offsetWidth / 2), (offsetTop + offsetHeight / 2)) < 6400) {

        this.setState({ hide: false });
      }
      else {
        let t = 0;
         setTimeout(() => {
          if (t++ > 1) return;
          this.setState({ hide: true });
        })
      }
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.timer);
  }

  render() {
    let oneToZero = 1 - ((this.state.loop + 50) / 100);
    return (
      <div style={Object.assign({}, styles.root, {opacity: this.state.hide ? 0 : 1}, this.props.styles)} onMouseEnter={this.triggerHover} onMouseLeave={this.triggerLeave} ref={r => this.myRef = r}>
        <svg viewBox="0 0 64 64" style={styles.svg}>
          <circle cx="32" cy="32" r="26" style={styles.path}/>
          <circle cx="32" cy="32" r={32 * (1 - oneToZero)} style={Object.assign({}, styles.path, { opacity: oneToZero })}/>
        </svg>
      </div>)
  }
}

const styles = {
  root: {
    display: 'block',
    width: 64,
    height: 64,
    opacity: 1,
    transition: 'opacity 1s'
  },
  svg: {
    width: 64,
    height: 64
  },
  path: {
    fill: '#888',
    fillOpacity: 0,
    stroke: '#888',
    strokeWidth: 4,
    opacity: 1
  }
};

export default OpeningCircle;