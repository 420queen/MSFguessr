function mminitialize() {
    mymap = L.map("miniMap").setView([0, 0], 2);

    L.tileLayer('https://tilea.pmaps.fr/raster/v2/light/{z}/{x}/{y}.png', {
        attribution: '© Protomaps, © OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(mymap);

    // Initialize marker with opacity 0 (invisible)
    guess2 = L.marker([0, 0], { opacity: 0 }).addTo(mymap);
    window.guessLatLng = undefined;

    // Click handler to update marker and global guess
    mymap.on("click", function(e) {
        console.log("Map clicked at", e.latlng);
        const coords = {
            lat: parseFloat(e.latlng.lat),
            lng: parseFloat(e.latlng.lng)
        };

        guess2.setLatLng([coords.lat, coords.lng]);
        guess2.setOpacity(1); // Show the marker after the first click
        window.guessLatLng = coords;
    });
}
