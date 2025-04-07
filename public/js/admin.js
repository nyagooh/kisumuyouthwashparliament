document.addEventListener('DOMContentLoaded', function() {
    const typeSelect = document.getElementById('type');
    const eventTypeContainer = document.getElementById('eventTypeContainer');
    const locationContainer = document.getElementById('locationContainer');
    const dataForm = document.getElementById('dataForm');

    // Show or hide the event type selection based on the selected type
    typeSelect.addEventListener('change', function() {
        if (this.value === 'events') {
            eventTypeContainer.style.display = 'block';
            locationContainer.style.display = 'block';
        } else {
            eventTypeContainer.style.display = 'none';
            locationContainer.style.display = 'none';
        }
    });

    // Initialize form state
    if (typeSelect.value === 'events') {
        eventTypeContainer.style.display = 'block';
        locationContainer.style.display = 'block';
    } else {
        eventTypeContainer.style.display = 'none';
        locationContainer.style.display = 'none';
    }

    // Handle form submission
    dataForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            type: typeSelect.value,
            eventType: document.getElementById('eventType')?.value || 'upcoming',
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            imageUrl: document.getElementById('image').value,
            link: document.getElementById('link').value,
            location: document.getElementById('location')?.value || 'Kisumu',
            dateAdded: new Date().toISOString()
        };

        try {
            // Send data to server endpoint
            const response = await fetch('/api/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Data saved successfully!');
                dataForm.reset();
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to save data. Please try again.');
        }
    });
});
