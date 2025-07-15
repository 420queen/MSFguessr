function rminitialize() {
    roundmap = L.map("roundMap").setView([30, 8], 1);

    // Use the online Protomaps tile service
    protomapsL.leafletLayer({
        url: 'https://tiles.protomaps.com/tiles/v3/{z}/{x}/{y}.pbf',
        flavor: "light",
        lang: "fr",
        attribution: "© OpenStreetMap, © Protomaps"
    }).addTo(roundmap);

    var guessIcon = L.icon({
        iconUrl: "img/guess.png",
        iconAnchor: [35, 70]
    });

    var actualIcon = L.icon({
        iconUrl: "img/actual.png",
        iconAnchor: [35, 70]
    });

    // Set markers to invisible positions initially
    guess = L.marker([0, 0], { icon: guessIcon, opacity: 0 }).addTo(roundmap);
    actual = L.marker([0, 0], { icon: actualIcon, opacity: 0 }).addTo(roundmap);

    // Only place markers if both coordinates are defined.
    // We'll fit the bounds once the result screen becomes visible
    if (window.guessLatLng && window.actualLatLng) {
        guess.setLatLng([window.guessLatLng.lat, window.guessLatLng.lng]).setOpacity(1);
        actual.setLatLng([window.actualLatLng.lat, window.actualLatLng.lng]).setOpacity(1);
    }
}