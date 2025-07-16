function mminitialize() {
    mymap = L.map("miniMap").setView([30, 10], 1);

    const protomapsLayer = protomapsL.leafletLayer({
        url: 'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=d8045d15a0243832',
        flavor: 'light',
        lang: 'fr'
    });
    protomapsLayer.addTo(mymap);

    // Place off-screen or hidden
    guess2 = L.marker([0, 0], { opacity: 0 }).addTo(mymap);
    window.guessLatLng = null;

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng).setOpacity(1);
        window.guessLatLng = e.latlng;

    });
}
