from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes



# Validate date in DDMMYYYY format
def validate_date(date_string):
    return re.match(r"\d{2}\d{2}\d{4}", date_string) is not None

# Find the highest lowercase alphabet
def highest_lowercase(alphabet_array):
    lowercase_letters = [char for char in alphabet_array if char.islower()]
    return max(lowercase_letters) if lowercase_letters else None

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Flask API"}), 200

@app.route('/bfhl', methods=['POST', 'GET'])
def bfhl():
    if request.method == 'POST':
        try:
            data = request.json
            full_name = data.get("full_name", "")
            dob = data.get("dob", "")

            # Validate full name and date of birth
            if not full_name or not dob or not validate_date(dob):
                raise ValueError("Invalid input. Please provide a valid full_name and dob in DDMMYYYY format.")

            # Create user ID
            user_id = f"{full_name.lower().replace(' ', '_')}_{dob}"

            # Parse input data
            input_array = data.get("data", [])

            numbers = [item for item in input_array if item.isdigit()]
            alphabets = [item for item in input_array if item.isalpha()]
            highest_lowercase_char = highest_lowercase(alphabets)

            # Response
            response = {
                "is_success": True,
                "user_id": user_id,
                "email": "john@xyz.com",
                "roll_number": "ABCD123",
                "numbers": numbers,
                "alphabets": alphabets,
                "highest_lowercase_alphabet": [highest_lowercase_char] if highest_lowercase_char else []
            }
            return jsonify(response)

        except Exception as e:
            return jsonify({"is_success": False, "error": str(e)})

    elif request.method == 'GET':
        # Hardcoded response for GET request
        return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
