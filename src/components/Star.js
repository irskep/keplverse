import React from 'react';

export default class Star extends React.Component {
  render() {
    const { star } = this.props;
    const minStarSize = 0.08;
    const minPixelSize = 20;
    const w = minPixelSize / minStarSize * star.radius;
    const rPx = (w / 2) + 'px';
    const wPx = w + 'px';
    const hPx = Math.max(w, 18) + "px";
    return (
      <div className="star m-big-star" style={{lineHeight: hPx, height: hPx}}>
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
              borderRadius: rPx
            }}
            title={JSON.stringify(star, null, 2)}>
          {star.starType}
        </div>
      </div>);
  }
}