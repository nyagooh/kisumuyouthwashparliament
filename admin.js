
document.addEventListener('DOMContentLoaded', function() {
    const typeSelect = document.getElementById('type');
    const eventTypeContainer = document.getElementById('eventTypeContainer');

    // Show or hide the event type selection based on the selected type
    typeSelect.addEventListener('change', function() {
        if (this.value === 'events') {
            eventTypeContainer.style.display = 'block';
        } else {
            eventTypeContainer.style.display = 'none';
        }
    });

    // Initialize form state
    if (typeSelect.value === 'events') {
        eventTypeContainer.style.display = 'block';
    } else {
        eventTypeContainer.style.display = 'none';
    }
});
