export default function weightedRandom(weights, normalizedValue) {
    var sumOfWeights = 0;
    for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
        var item = weights_1[_i];
        sumOfWeights += item[1];
    }
    var randomValue = normalizedValue * sumOfWeights;
    var sumSoFar = 0;
    for (var _a = 0, weights_2 = weights; _a < weights_2.length; _a++) {
        var _b = weights_2[_a], value = _b[0], weight = _b[1];
        sumSoFar += weight;
        if (randomValue <= sumSoFar) {
            return value;
        }
    }
    throw new Error("Choice error: " + randomValue);
}
//# sourceMappingURL=weightedChoice.js.map