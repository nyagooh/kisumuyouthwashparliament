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
    dataForm.addEventListener('submit', async function (e) {
        e.preventDefault();
    
        const formData = new FormData(this);
        const selectedType = formData.get('type');
    
        if (!this.checkValidity()) {
            alert('Please fill in all required fields.');
            return;
        }
    
        // Handle only 'impact' data submission for now
        if (selectedType === 'impact') {
            const title = formData.get('title');
            const subtitle = formData.get('subtitle');
            const description = formData.get('description');
            const tag = formData.get('tag');
            const layout = formData.get('layout');
            const imagesInput = document.getElementById('images');
            const images = Array.from(imagesInput.files);
            const type = selectedType.toLowerCase();
    
            if (images.length === 0) {
                alert('Please select at least one image.');
                return;
            }
    
            const imagePaths = images.map(file => `kiwasko/${file.name}`);
    
            const impactData = {
                title,
                subtitle,
                description,
                tag,
                layout,
                images: imagePaths,
                type
            };
    
            try {
                const response = await fetch('/api/save-data', {
                    method: 'POST',
                    body: JSON.stringify(impactData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                const result = await response.json();
    
                if (result.success) {
                    alert('Impact item added successfully!');
                    dataForm.reset();
                } else {
                    alert('Failed to add impact item. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while submitting impact data.');
            }
        } else {
            alert('Only "impact" submissions are currently supported.');
        }
    });    
});
