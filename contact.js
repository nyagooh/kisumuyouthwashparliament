
    // Initialize the map and set its view
    var map = L.map('map').setView([-0.1022, 34.7617], 13); // Kisumu coordinates

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker for Kisumu
    L.marker([-0.1022, 34.7617]).addTo(map)
        .bindPopup("<b>Kisumu, Kenya</b><br>A city by Lake Victoria.")
        .openPopup();
