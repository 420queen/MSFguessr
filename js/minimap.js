var myCustomIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconRetinaUrl: 'img/marker-icon-2x.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41], // taille par défaut
    iconAnchor: [12, 41], // centre-bas de l’icône (point de clic)
    popupAnchor: [0, -41], // optionnel : popup au-dessus de la pointe
    shadowSize: [41, 41] // taille par défaut de l’ombre
});

function mminitialize() {
    mymap = L.map("miniMap");
    mymap.setView([30, 10], 1);

    // PMTiles integration
    const p = new PMTiles('https://tilea.pmaps.fr/raster/v2/light.pmtiles');
    leafletRasterLayer(p).addTo(mymap);

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

