function mminitialize() {
    mymap = L.map("miniMap").setView([0, 0], 2);

    // Use the online Protomaps tile service
    protomapsL.leafletLayer({
        url: 'https://tiles.protomaps.com/tiles/v3/{z}/{x}/{y}.pbf',
        flavor: "light",
        lang: "fr",
        attribution: "© OpenStreetMap, © Protomaps"
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
