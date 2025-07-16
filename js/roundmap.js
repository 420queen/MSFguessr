function rminitialize() {
    window.roundmap = L.map("roundMap").setView([30, 8], 1);

    const p = new PMTiles('https://tilea.pmaps.fr/raster/v2/light.pmtiles');
    leafletRasterLayer(p).addTo(window.roundmap);

    const guessIcon = L.icon({
        iconUrl: "img/guess.png",
        iconAnchor: [35, 70]
    });

    const actualIcon = L.icon({
        iconUrl: "img/actual.png",
        iconAnchor: [35, 70]
    });

    // Markers, initially hidden
    window.guess = L.marker([0, 0], { icon: guessIcon, opacity: 0 }).addTo(window.roundmap);
    window.actual = L.marker([0, 0], { icon: actualIcon, opacity: 0 }).addTo(window.roundmap);

    // Show if coords are defined
    if (window.guessLatLng && window.actualLatLng) {
        window.guess.setLatLng([window.guessLatLng.lat, window.guessLatLng.lng]).setOpacity(1);
        window.actual.setLatLng([window.actualLatLng.lat, window.actualLatLng.lng]).setOpacity(1);

        // Optional: fit both markers into view
        const bounds = L.latLngBounds([
            [window.guessLatLng.lat, window.guessLatLng.lng],
            [window.actualLatLng.lat, window.actualLatLng.lng]
        ]);
        window.roundmap.fitBounds(bounds, { padding: [40, 40] });
    }
}
