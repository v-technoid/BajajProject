const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5002;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Validate date in DDMMYYYY format
function validateDate(dateString) {
    return /^\d{2}\d{2}\d{4}$/.test(dateString);
}

// Find the highest lowercase alphabet
function highestLowercase(alphabetArray) {
    const lowercaseLetters = alphabetArray.filter(char => char >= 'a' && char <= 'z');
    return lowercaseLetters.length > 0 ? Math.max(...lowercaseLetters) : null;
}

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Express API" });
});

app.post('/bfhl', (req, res) => {
    try {
        const { full_name = '', dob = '', data = [] } = req.body;

        // Validate full name and date of birth
        if (!full_name || !dob || !validateDate(dob)) {
            throw new Error("Invalid input. Please provide a valid full_name and dob in DDMMYYYY format.");
        }

        // Create user ID
        const userId = `${full_name.toLowerCase().replace(/ /g, '_')}_${dob}`;

        // Parse input data
        const numbers = data.filter(item => /^\d+$/.test(item));
        const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
        const highestLowercaseChar = highestLowercase(alphabets);

        // Response
        const response = {
            is_success: true,
            user_id: userId,
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseChar ? [highestLowercaseChar] : []
        };
        res.json(response);

    } catch (error) {
        res.json({ is_success: false, error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
