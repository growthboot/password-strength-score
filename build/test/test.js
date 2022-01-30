"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_helpers_js_1 = require("./test-helpers.js");
var password = process.argv.slice(2).join(' ');
if (password == "")
    console.log("Add a parameter like: test.js somepw123");
else
    (0, test_helpers_js_1.showScore)(password);
