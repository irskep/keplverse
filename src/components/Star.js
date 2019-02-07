import React from 'react';

export default function Star({star, minSize, onClick, offset, style}) {
  const minStarSize = 0.08;
  const w = minSize / minStarSize * star.radius;
  const rPx = (w / 2);
  const wPx = w + 'px';
  const hPx = Math.max(w, 18) + "px";
  const offsetPx = offset * 20;
  style = style || {};

  return (
    <div
      className="star m-big-star"
      onClick={onClick}
      style={Object.assign({
          lineHeight: hPx,
          height: hPx,
          transform: `translate(-${rPx + offsetPx}px, -${rPx + offsetPx}px)`,
        }, style)}>
      <div className="star-circle"
          style={{
            backgroundColor: star.color,
            background: `
              radial-gradient(
                circle at center,
                rgba(255,255,255,0.8) 0%,
                rgba(255,255,255,0) 80%),
              radial-gradient(
                ellipse at center,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0) 62%,
                rgba(0,0,0,1) 100%),
              ${star.color}
            `,
            boxShadow: `0 0 20px 0 ${star.color}`,
            width: wPx,
            height: wPx,
            borderRadius: rPx + 'px',
          }}
          title={JSON.stringify(star, null, 2)}>
        {/* {star.starType} */}
      </div>
    </div>);
}