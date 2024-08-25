document.getElementById('apiForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const jsonInput = document.getElementById('jsonInput').value;
    const errorDiv = document.getElementById('error');
    const responseContainer = document.getElementById('responseContainer');
    const filterSelect = document.getElementById('filterSelect');
    
    errorDiv.textContent = '';
    responseContainer.textContent = '';

    try {
        const jsonData = JSON.parse(jsonInput);
        const res = await fetch('http://127.0.0.1:5000/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const data = await res.json();

        if (data.is_success) {
            // Handle the response data
            let filteredResponse = {};

            if (filterSelect.selectedOptions.length > 0) {
                const filters = Array.from(filterSelect.selectedOptions).map(option => option.value);
                if (filters.includes('Numbers') && data.numbers) {
                    filteredResponse.numbers = data.numbers.join(', ');
                }
                // Add more filter options here if needed
            }

            responseContainer.innerHTML = `<h3>Filtered Response</h3><pre>${JSON.stringify(filteredResponse, null, 2)}</pre>`;
        } else {
            errorDiv.textContent = data.error;
        }
    } catch (err) {
        console.error('Invalid JSON or server error:', err);
        errorDiv.textContent = 'Invalid JSON or server error';
    }
});

document.getElementById('filterSelect').addEventListener('change', function() {
    const selectElement = this;
    const selectedValues = Array.from(selectElement.selectedOptions).map(option => option.value);

    // Update the filtered response based on selected filters
    // You may want to add additional logic here to update the response
});
