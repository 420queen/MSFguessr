function mminitialize() {
    mymap = L.map("miniMap");
    mymap.setView([30, 10], 1);

    // PMTiles integration
    const p = new PMTiles('https://tilea.pmaps.fr/raster/v2/light.pmtiles');
    leafletRasterLayer(p).addTo(mymap);

    // Marker invisible at first
    window.guess2 = L.marker([0, 0], { opacity: 0 }).addTo(mymap);
    window.guessLatLng = undefined;

    // Click handler
    mymap.on("click", function(e) {
        console.log("Map clicked at", e.latlng);
        const coords = {
            lat: parseFloat(e.latlng.lat),
            lng: parseFloat(e.latlng.lng)
        };

        window.guess2.setLatLng([coords.lat, coords.lng]);
        window.guess2.setOpacity(1);
        window.guessLatLng = coords;
    });
}
