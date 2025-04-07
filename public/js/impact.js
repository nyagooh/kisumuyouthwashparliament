// document.addEventListener('DOMContentLoaded', async function() {
//     try {
//         // Fetch impact stories from the API
//         const response = await fetch('/api/impact-stories');
//         const data = await response.json();
        
//         // Get the impact stories container
//         const impactStoriesContainer = document.getElementById('impact-stories-container');
        
//         if (!impactStoriesContainer) {
//             console.error('Impact stories container not found');
//             return;
//         }
        
//         // Clear existing content
//         impactStoriesContainer.innerHTML = '';
        
//         // Check if there are any impact stories
//         if (data.impact_stories && data.impact_stories.length > 0) {
//             // Create a section for each impact story
//             data.impact_stories.forEach((story, index) => {
//                 const storySection = document.createElement('section');
//                 storySection.id = `impact-story-${index + 1}`;
//                 storySection.className = 'py-24 bg-light';
                
//                 // Create the story content
//                 storySection.innerHTML = `
//                     <div class="container mx-auto px-6 md:px-12 lg:px-24">
//                         <div class="mb-16 text-center">
//                             <h2 class="text-5xl font-extrabold text-primary mb-8">${story.title}</h2>
//                             <p class="text-gray-600 text-lg max-w-3xl mx-auto">
//                                 ${story.subtitle}
//                             </p>
//                         </div>
//                         <div class="bg-white rounded-lg shadow-lg overflow-hidden">
//                             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 ${story.images.map(image => `
//                                     <img src="../images/${image}" alt="${story.title} Image" class="w-full h-64 object-cover">
//                                 `).join('')}
//                             </div>
//                             <div class="p-8">
//                                 <h3 class="text-2xl font-bold text-secondary mb-4">${story.title}</h3>
//                                 <p class="text-gray-600 mb-6">${story.description}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
                
//                 // Add the story section to the container
//                 impactStoriesContainer.appendChild(storySection);
//             });
//         } else {
//             // Display a message if no impact stories are available
//             impactStoriesContainer.innerHTML = `
//                 <div class="container mx-auto px-6 md:px-12 lg:px-24 py-24 text-center">
//                     <h2 class="text-3xl font-bold text-primary mb-4">No Impact Stories Available</h2>
//                     <p class="text-gray-600">Check back later for updates on our impact stories.</p>
//                 </div>
//             `;
//         }
//     } catch (error) {
//         console.error('Error fetching impact stories:', error);
//     }
// }); 