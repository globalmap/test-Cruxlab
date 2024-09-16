import * as fs from "fs";

// Function to check the validity of a password based on given rules
function isValidPassword(rule: string, password: string): boolean {
  // Split the rule into character and range
  const [char, rangePart] = rule.split(" ");
  const [minCount, maxCount] = rangePart.split("-").map(Number);

  // Count occurrences of the character in the password
  const count = Array.from(password).filter((c) => c === char).length;

  // Check if the count falls within the specified range
  return count >= minCount && count <= maxCount;
}

// Function to count valid passwords from a file
function countValidPasswords(filePath: string): number {
  let validCount = 0;

  // Read the file and process it line by line
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  for (const line of lines) {
    if (line.trim() === "") continue; // Skip empty lines

    const [rulePart, password] = line.split(": ");
    // Increment validCount if the password is valid
    if (isValidPassword(rulePart, password)) {
      validCount += 1;
    }
  }

  return validCount;
}

// Define the file path and count valid passwords
const filePath = "./src/password.txt";
const validPasswordsCount = countValidPasswords(filePath);
console.log(`Number of valid passwords: ${validPasswordsCount}`);
