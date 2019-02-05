import React from 'react';

export default class PanZoomer extends React.Component {
  // props: { className, children, style }
  constructor(props) {
    super(props)
    this.elRef = React.createRef();
    this.state = {
      centerX: 0,
      centerY: 0,
      scale: props.initialZoom || 1,
      mouseDownPoint: null,
      mouseDownCenter: null,
      isDragging: false, 
    }
  }

  onMouseDown(e) {
    this.setState({
      isDragging: true,
      mouseDownPoint: { x: e.screenX, y: e.screenY },
      mouseDownCenter: {x: this.state.centerX, y: this.state.centerY},
    });
  }

  onMouseMove(e) {
    if (!this.state.isDragging) return;

    this.setState({
      centerX: this.state.mouseDownCenter.x + (e.screenX - this.state.mouseDownPoint.x),
      centerY: this.state.mouseDownCenter.y + (e.screenY - this.state.mouseDownPoint.y),
    });
  }

  onMouseUp(e) {
    this.setState({
      isDragging: false,
      mouseDownPoint: null,
      mouseDownCenter: null,
    });
  }

  onMouseWheel(e) {
    if (this.state.isDragging) return;
    e.preventDefault();
    let moveAmount = e.deltaY;
    if (moveAmount < -4) moveAmount = -4;
    if (moveAmount > 4) moveAmount = 4;
    this.setState({
      scale: Math.max(0.1, this.state.scale + -moveAmount * this.state.scale / 20),
    });
  }

  render() {
    const {centerX, centerY, scale} = this.state;
    return (
      <div
          style={Object.assign({borderColor: this.state.isDragging ? 'red' : 'white'}, this.props.style)}
          className={this.props.className || 'PanZoomer'}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseMove={this.onMouseMove.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onWheel={this.onMouseWheel.bind(this)}
          ref={this.elRef}>
        <div
          className="PanZoomer__Centerer"
          style={{
            transform: `translate(${centerX}px, ${centerY}px) scale(${scale})`,
          }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}