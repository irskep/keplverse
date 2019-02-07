import React, { useState } from 'react';

export default function PanZoomer({className, children, style, initialZoom}) {
  const [worldOffset, setWorldOffset] = useState({x: 0, y: 0});
  const [scale, setScale] = useState(initialZoom || 1);
  const [worldOffsetAtMouseDown, setWorldOffsetAtMouseDown] = useState(null);
  const [mouseDownPoint, setMouseDownPoint] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  function onMouseDown(e) {
    setIsDragging(true);
    setMouseDownPoint({ x: e.screenX, y: e.screenY });
    setWorldOffsetAtMouseDown(worldOffset);
  }

  function onMouseMove(e) {
    if (!isDragging) return;

    const {x, y} = worldOffsetAtMouseDown;

    setWorldOffset({
      x: x + (e.screenX - mouseDownPoint.x) / scale,
      y: y + (e.screenY - mouseDownPoint.y) / scale,
    });
  }

  function onMouseUp(e) {
    setIsDragging(false);
    setWorldOffsetAtMouseDown(null);
    setMouseDownPoint(null);
  }

  function zoomBy(delta) {
    setScale(Math.max(0.1, scale + delta * scale / 20));
  }

  function onMouseWheel(e) {
    if (isDragging) return;
    e.preventDefault();
    let moveAmount = e.deltaY;
    if (moveAmount < -4) moveAmount = -4;
    if (moveAmount > 4) moveAmount = 4;
    zoomBy(-moveAmount);
  }

  return (
    <div
        style={style}
        className={className || 'PanZoomer'}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onMouseWheel} >
      <div
        className="PanZoomer__Centerer"
        style={{
          transform: `scale(${scale}) translate(${worldOffset.x}px, ${worldOffset.y}px)`,
        }}>
        {children}
      </div>
      <div className="PanZoomer__Help">
        Drag and scroll to pan and zoom
      </div>
      <div className="PanZoomer__ZoomControls">
        <div className="PanZoomer__ZoomControls__ZoomIn" onClick={zoomBy.bind(this, 12)}>
        ➕
        </div>
        <div className="PanZoomer__ZoomControls__ZoomOut" onClick={zoomBy.bind(this, -12)}>
        ➖
        </div>
      </div>
    </div>
  );
}