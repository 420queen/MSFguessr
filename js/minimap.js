function mminitialize() {
    mymap = L.map("miniMap").setView([30, 10], 1);

    const protomapsLayer = protomapsL.leafletLayer({
        url: 'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=d8045d15a0243832',
        flavor: 'light',
    });

    var myCustomIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconRetinaUrl: 'img/marker-icon-2x.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41], // taille par défaut
    iconAnchor: [12, 41], // centre-bas de l’icône (point de clic)
    popupAnchor: [0, -41], // optionnel : popup au-dessus de la pointe
    shadowSize: [41, 41] // taille par défaut de l’ombre
});

    protomapsLayer.addTo(mymap);

    // Place off-screen or hidden
    guess2 = L.marker([0, 0], { icon: myCustomIcon, opacity: 0 }).addTo(mymap);
    window.guessLatLng = null;

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng).setOpacity(1);
        window.guessLatLng = e.latlng;

    });
}
