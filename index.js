document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const events = [
        {
            title: "WASH Education Workshop",
            description: "Interactive session on water sanitation and hygiene practices for local schools.",
            date: "2025-03-15",
            category: "Workshop",
            image: "https://source.unsplash.com/800x600/?water-workshop"
        },
        {
            title: "Community Sanitation Workshop",
            description: "Hands-on workshop focusing on sustainable sanitation practices.",
            date: "2025-04-05",
            category: "Workshop",
            image: "https://source.unsplash.com/800x600/?sanitation-workshop"
        },
        {
            title: "Water Quality Testing Training",
            description: "Professional training on water quality assessment and monitoring.",
            date: "2025-05-20",
            category: "Training",
            image: "https://source.unsplash.com/800x600/?water-training"
        },
        {
            title: "Hygiene Ambassador Training",
            description: "Training program for community hygiene ambassadors and advocates.",
            date: "2025-06-10",
            category: "Training",
            image: "https://source.unsplash.com/800x600/?hygiene-training"
        },
        {
            title: "Clean Water Initiative Launch",
            description: "Community gathering to launch new clean water access points.",
            date: "2025-07-01",
            category: "Community",
            image: "https://source.unsplash.com/800x600/?community-water"
        },
        {
            title: "Community Cleanup Day",
            description: "Joint community effort to clean and maintain water sources.",
            date: "2025-07-15",
            category: "Community",
            image: "https://source.unsplash.com/800x600/?community-sanitation"
        }
    ];

    const upcomingContainer = document.getElementById("upcoming-events");
    const pastContainer = document.getElementById("past-events");

    events.forEach(event => {
        const eventDate = new Date(event.date);
        const eventCard = `
            <div class="event-item bg-white rounded-lg overflow-hidden shadow-lg group hover:-translate-y-1 transition-all duration-300">
                <div class="relative h-48 overflow-hidden">
                    <span class="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">${event.category}</span>
                    <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2">${event.title}</h3>
                    <p class="text-gray mb-4">${event.description}</p>
                    <div class="flex items-center text-sm text-gray">
                        <i class="fas fa-calendar-alt mr-2"></i>
                        <span>${new Date(event.date).toDateString()}</span>
                    </div>
                </div>
            </div>
        `;

        if (eventDate >= today) {
            upcomingContainer.innerHTML += eventCard;
        } else {
            pastContainer.innerHTML += eventCard;
        }
    });
});