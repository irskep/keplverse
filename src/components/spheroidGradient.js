import pct from '../pct';

function normalizedToRange(min, max, val) {
  return min + (max - min) * val;
}

function mix(n, a, b) {
  return a * n + b * (1 - n);
}

export default function spheroidGradient(alea, hueRange, saturationRange, brightnessRange, variation) {
    const colorAHue = normalizedToRange(hueRange[0], hueRange[1], alea());
    const colorASaturation = normalizedToRange(saturationRange[0], saturationRange[1], alea());
    const colorABrightness = normalizedToRange(brightnessRange[0], brightnessRange[1], alea());

    const colorBHue = mix(variation, normalizedToRange(hueRange[0], hueRange[1], alea()), colorAHue);
    const colorBSaturation = mix(variation, normalizedToRange(saturationRange[0], saturationRange[1], alea()), colorASaturation);
    const colorBBrightness = mix(variation, normalizedToRange(brightnessRange[0], brightnessRange[1], alea()), colorABrightness);

    return `
      radial-gradient(circle at top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%),
      radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 62%, rgba(0,0,0,1) 100%),
      linear-gradient(to top,
        hsl(${colorAHue}, ${pct(colorASaturation)}, ${pct(colorABrightness)}) 0%,
        hsl(${colorBHue}, ${pct(colorBSaturation)}, ${pct(colorBBrightness)}) 100%)
      `.replace(/\n/g, '').replace(/\s+/g, ' ');
}