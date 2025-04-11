document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/impact-stories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const impactStoriesContainer = document.querySelector('.impact-stories');
        if (!impactStoriesContainer) {
            console.error('Impact stories container not found');
            return;
        }

        // Clear existing content
        impactStoriesContainer.innerHTML = '';

        if (!data.impact_stories || data.impact_stories.length === 0) {
            const noStoriesMessage = document.createElement('div');
            noStoriesMessage.className = 'text-center py-24';
            noStoriesMessage.innerHTML = `
                <h2 class="text-3xl font-bold text-primary mb-4">No Impact Stories Available</h2>
                <p class="text-gray-600">Check back later for updates on our impact stories.</p>
            `;
            impactStoriesContainer.appendChild(noStoriesMessage);
            return;
        }

        // Create story sections
        data.impact_stories.forEach((story, index) => {
            const storySection = document.createElement('div');
            storySection.className = `mb-24 ${index === 1 ? 'bg-light py-16 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24' : ''}`;
            
            // Create the story content based on layout
            const isLeftLayout = story.layout === 'left';
            const flexDirection = isLeftLayout ? 'md:flex-row' : 'md:flex-row-reverse';
            
            storySection.innerHTML = `
                <div class="flex flex-col ${flexDirection} gap-8 items-center">
                    <!-- Image Side -->
                    <div class="md:w-1/2">
                        <div class="relative">
                            <img src="/images/${story.images[0]}" alt="${story.title}" class="w-full h-96 object-cover rounded-lg shadow-lg">
                            <div class="absolute top-4 ${isLeftLayout ? 'left-4' : 'right-4'} bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                                ${story.tag}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content Side -->
                    <div class="md:w-1/2">
                        <h3 class="text-3xl font-bold text-primary mb-4">${story.title}</h3>
                        <p class="text-gray-600 mb-6">${story.description}</p>
                        
                        <!-- Image Gallery -->
                        <div class="grid grid-cols-3 gap-4 mb-6">
                            ${story.images.slice(1).map(image => `
                                <div class="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                                    <img src="/images/${image}" alt="${story.title}" class="w-full h-40 object-cover hover:scale-105 transition-transform duration-300">
                                </div>
                            `).join('')}
                        </div>
                        
                        <a href="#" class="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                            Read Full Story
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            `;

            impactStoriesContainer.appendChild(storySection);
        });

        // Initialize AOS after content is loaded
        if (typeof AOS !== 'undefined') {
            AOS.init();
        }
    } catch (error) {
        console.error('Error fetching impact stories:', error);
        const impactStoriesContainer = document.querySelector('.impact-stories');
        if (impactStoriesContainer) {
            impactStoriesContainer.innerHTML = `
                <div class="text-center py-24">
                    <h2 class="text-3xl font-bold text-primary mb-4">Error Loading Impact Stories</h2>
                    <p class="text-gray-600">Please try again later or contact support if the problem persists.</p>
                </div>
            `;
        }
    }
}); 