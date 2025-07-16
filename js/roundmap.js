function rminitialize() {
    roundmap = L.map("roundMap").setView([30, 10], 1);

    const protomapsLayer = protomapsL.leafletLayer({
        url: 'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=d8045d15a0243832',
        flavor: 'light',
        lang: 'fr'
    });
    protomapsLayer.addTo(roundmap);

    const guessIcon = L.icon({
        iconUrl: "img/guess.png",
        iconAnchor: [45, 90]
    });

    const actualIcon = L.icon({
        iconUrl: "img/actual.png",
        iconAnchor: [45, 90]
    });

    guess = L.marker([0, 0], { icon: guessIcon, opacity: 0 }).addTo(roundmap);
    actual = L.marker([0, 0], { icon: actualIcon, opacity: 0 }).addTo(roundmap);

    if (
        window.guessLatLng &&
        typeof window.guessLatLng.lat === "number" &&
        typeof window.guessLatLng.lng === "number" &&
        window.actualLatLng &&
        typeof window.actualLatLng.lat === "number" &&
        typeof window.actualLatLng.lng === "number"
    ) {
        guess.setLatLng(window.guessLatLng).setOpacity(1);
        actual.setLatLng(window.actualLatLng).setOpacity(1);

        roundmap.fitBounds(
            L.latLngBounds([window.guessLatLng, window.actualLatLng]),
            { padding: [50, 50] }
        );
    } else {
        console.warn("Invalid guess or actual location:", window.guessLatLng, window.actualLatLng);
    }
}
