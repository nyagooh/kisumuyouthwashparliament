document.addEventListener('DOMContentLoaded', function() {
    const typeSelect = document.getElementById('type');
    const eventTypeContainer = document.getElementById('eventTypeContainer');
    const locationContainer = document.getElementById('locationContainer');
    const dataForm = document.getElementById('dataForm');
    const impactFieldsContainer = document.getElementById('impactFieldsContainer');

    // Show or hide the event type selection based on the selected type
    typeSelect.addEventListener('change', function() {
        const selectedType = this.value.toLowerCase();

        // Reset all containers
        eventTypeContainer.style.display = 'none';
        locationContainer.style.display = 'none';
        impactFieldsContainer.style.display = 'none';

        // Show relevant fields based on type
        if (selectedType === 'events') {
            eventTypeContainer.style.display = 'block';
            locationContainer.style.display = 'block';
        } else if (selectedType === 'impact') {
            impactFieldsContainer.style.display = 'block';
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

        const formData = new FormData(this);
        console.log("formData: ", formData);
        
        // Check if the form is valid
        if (!this.checkValidity()) {
            alert('Please fill in all required fields.');
            return;
        }
        // Check if the images are selected
        if (formData.get('images[]').length === 0) {
            alert('Please select at least one image.');
            return;
        }
        const images = document.getElementById('images').files;

        const data = {};
        data.images = []; // Ensure images is initialized as an array

        // Convert FormData to object
        formData.forEach((value, key) => {
            if (key === 'images[]') {
                data.images.push(value.name); // Push image names into the array
            } else {
                data[key] = value;
            }
        });
        // console.log("images: ", data.images.len());

        // Check if images are selected 
        if (data.images.length === 0) { // Use .length instead of .len()
            alert('Please select at least one image.');
            return;
        }

        // Prefix image paths with "kiwasko/"
        data.images = data.images.map(image => `kiwasko/${image}`); // Fix mapping logic

        try {
            const response = await fetch('/api/save-data', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                alert('Item added successfully!');
                dataForm.reset();
            } else {
                alert('Failed to add item. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
