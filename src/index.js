"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Function to check the validity of a password based on given rules
function isValidPassword(rule, password) {
    // Split the rule into character and range
    var _a = rule.split(" "), char = _a[0], rangePart = _a[1];
    var _b = rangePart.split("-").map(Number), minCount = _b[0], maxCount = _b[1];
    // Count occurrences of the character in the password
    var count = Array.from(password).filter(function (c) { return c === char; }).length;
    // Check if the count falls within the specified range
    return count >= minCount && count <= maxCount; // Updated condition
}
// Function to count valid passwords from a file
function countValidPasswords(filePath) {
    var validCount = 0;
    // Read the file and process it line by line
    var fileContent = fs.readFileSync(filePath, "utf-8");
    var lines = fileContent.split("\n");
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.trim() === "")
            continue; // Skip empty lines
        var _a = line.split(": "), rulePart = _a[0], password = _a[1];
        // Increment validCount if the password is valid
        if (isValidPassword(rulePart, password)) {
            validCount += 1;
        }
    }
    return validCount;
}
// Define the file path and count valid passwords
var filePath = "./src/password.txt";
var validPasswordsCount = countValidPasswords(filePath);
console.log("Number of valid passwords: ".concat(validPasswordsCount));
