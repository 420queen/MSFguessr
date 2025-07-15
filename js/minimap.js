function mminitialize() {
    const mymap = L.map("miniMap").setView([0, 0], 2);

L.tileLayer('https://tilea.pmaps.fr/raster/v2/light/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap, © Protomaps',
    maxZoom: 17
}).addTo(map);

    // Marker invisible at first
    const guess2 = L.marker([0, 0], { opacity: 0 }).addTo(mymap);
    window.guessLatLng = undefined;

    // Click handler
    mymap.on("click", function(e) {
        console.log("Map clicked at", e.latlng);
        const coords = {
            lat: parseFloat(e.latlng.lat),
            lng: parseFloat(e.latlng.lng)
        };

        guess2.setLatLng([coords.lat, coords.lng]);
        guess2.setOpacity(1);
        window.guessLatLng = coords;
    });
}
