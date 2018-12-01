export default function renderStar(star) {
  const minStarSize = 0.08;
  const minPixelSize = 20;
  const w = minPixelSize / minStarSize * star.radius;
  const rPx = (w / 2) + 'px';
  const wPx = w + 'px';
  const hPx = Math.max(w, 18) + "px";
  return `
    <div class="star m-big-star" style="line-height: ${hPx}; height: ${hPx};">
      <div class="star-circle"
        style="background-color: ${star.color}; width: ${wPx}; height: ${wPx}; border-radius: ${rPx};"
        title='${JSON.stringify(star, null, 2)}'>
        ${star.starType}
      </div>
    </div>
  `.replace(/\n/g, " ").replace(/\s\s+/g, " ").trim();
}