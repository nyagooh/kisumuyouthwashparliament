// Fetch gallery data from the API
async function fetchGalleryData() {
  try {
    const response = await fetch('/api/gallery-data');
    if (!response.ok) {
      throw new Error(`Failed to fetch gallery data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return { galleryItems: [] };
  }
}

// Function to create gallery item HTML
function createGalleryItem(item) {
  return `
    <div class="group relative overflow-hidden rounded-2xl shadow-xl aspect-square cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
      <img src="${item.image}" alt="${item.alt}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-category="${item.category}">
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div class="absolute inset-0 flex flex-col justify-end p-5 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
        <div class="overflow-hidden mb-1">
          <h4 class="text-white text-xl font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">${item.title}</h4>
        </div>
        <div class="overflow-hidden">
          <div class="flex items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">
            <span class="inline-block bg-blue-500 h-0.5 w-6 mr-2"></span>
            <p class="text-white/90 text-sm">${item.date}</p>
          </div>
        </div>
      </div>
      <div class="absolute top-4 right-4 bg-white/90 text-primary rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform rotate-45 group-hover:rotate-0 transition-all duration-500">
        <i class="fas fa-plus"></i>
      </div>
    </div>
  `;
}

// Function to populate gallery grid
async function populateGallery() {
  try {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) {
      console.error('Gallery grid element not found');
      return;
    }

    const data = await fetchGalleryData();
    
    if (data.galleryItems && data.galleryItems.length > 0) {
      const galleryHTML = data.galleryItems.map(item => createGalleryItem(item)).join('');
      galleryGrid.innerHTML = galleryHTML;
      
      // Setup filter functionality after content is loaded
      setupFilterButtons();
    } else {
      console.error('No gallery items found in data');
      galleryGrid.innerHTML = '<p class="text-center col-span-full py-6">No gallery items available</p>';
    }
  } catch (error) {
    console.error('Error populating gallery:', error);
    document.getElementById('gallery-grid').innerHTML = 
      '<p class="text-center col-span-full py-6 text-red-500">Failed to load gallery data</p>';
  }
}

// Function to setup filter buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('#gallery-grid > div');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      });
      
      // Add active class to clicked button
      this.classList.remove('bg-gray-100', 'text-gray-700');
      this.classList.add('bg-primary', 'text-white');
      
      // Get the filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const category = img ? img.getAttribute('data-category') : null;
        
        if (filterValue === 'all' || category === filterValue) {
          // Show items that match the filter
          item.style.display = 'block';
          // Add animation classes
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          // Hide items that don't match
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Add loading indicator
function showLoading() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    galleryGrid.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    `;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  showLoading();
  populateGallery();
  
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('button.md\\:hidden'); 
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', function() {
      navLinks.classList.toggle('hidden');
    });
  }
}); 