
// Event listener for DOMContentLoaded event to ensure the page is fully loaded before running JavaScript code.
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    let upcomingButton, pastButton;

    buttons.forEach(button => {
        if (button.textContent.includes('Upcoming Events')) {
            upcomingButton = button;
        } else if (button.textContent.includes('Past Events')) {
            pastButton = button;
        }
    });

    const upcomingEvents = document.querySelectorAll('.upcoming-event');
    const pastEvents = document.querySelectorAll('.past-event');

    upcomingButton.addEventListener('click', function() {
        upcomingEvents.forEach(event => event.style.display = 'block');
        pastEvents.forEach(event => event.style.display = 'none');
    });

    pastButton.addEventListener('click', function() {
        upcomingEvents.forEach(event => event.style.display = 'none');
        pastEvents.forEach(event => event.style.display = 'block');
    });

    // Initialize with upcoming events visible
    upcomingButton.click();
});
