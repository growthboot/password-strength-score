"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showScore = void 0;
var index_1 = require("../lib/index");
function showScore(input) {
    var strength = (0, index_1.PasswordStrengthScore)(input);
    console.log("\n\t\tPassword: ".concat(input, "\n\t\tScore: ").concat(strength.score, "\n\t\tQuality: ").concat(strength.quality, "\n\t"));
}
exports.showScore = showScore;
