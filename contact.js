document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('leaflet-map').setView([-0.1022, 34.7617], 13); // Kisumu coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);

    L.marker([-0.1022, 34.7617]).addTo(map)
        .bindPopup("<b>Kisumu, Kenya</b><br>A city by Lake Victoria.")
        .openPopup();
});