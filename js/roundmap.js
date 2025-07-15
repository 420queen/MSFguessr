function rminitialize() {
    const roundmap = L.map("roundMap").setView([30, 8], 1);

    // ✅ Protomaps vector tiles with light theme
    protomapsL.leafletLayer({
        url: 'https://tile.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt',
        theme: "light",
        attribution: "© OpenStreetMap, © Protomaps"
    }).addTo(roundmap);

    const guessIcon = L.icon({
        iconUrl: "img/guess.png",
        iconAnchor: [35, 70]
    });

    const actualIcon = L.icon({
        iconUrl: "img/actual.png",
        iconAnchor: [35, 70]
    });

    // Markers, initially hidden
    const guess = L.marker([0, 0], { icon: guessIcon, opacity: 0 }).addTo(roundmap);
    const actual = L.marker([0, 0], { icon: actualIcon, opacity: 0 }).addTo(roundmap);

    // Show if coords are defined
    if (window.guessLatLng && window.actualLatLng) {
        guess.setLatLng([window.guessLatLng.lat, window.guessLatLng.lng]).setOpacity(1);
        actual.setLatLng([window.actualLatLng.lat, window.actualLatLng.lng]).setOpacity(1);

        // Optional: fit both markers into view
        const bounds = L.latLngBounds([
            [window.guessLatLng.lat, window.guessLatLng.lng],
            [window.actualLatLng.lat, window.actualLatLng.lng]
        ]);
        roundmap.fitBounds(bounds, { padding: [40, 40] });
    }
}
