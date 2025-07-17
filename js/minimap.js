function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(mymap);

    const myCustomIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconRetinaUrl: 'img/marker-icon-2x.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41], // taille par défaut
    iconAnchor: [12, 41], // centre-bas de l’icône (point de clic)
    popupAnchor: [0, -41], // optionnel : popup au-dessus de la pointe
    shadowSize: [41, 41] // taille par défaut de l’ombre
});

    guess2 = L.marker([0, 0], { icon: myCustomIcon, opacity: 0 }).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});
   
    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        guess2.setOpacity(1);  // Make marker visible
        window.guessLatLng = e.latlng;  // Store clicked position globally (optional)


    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        guess2.setOpacity(1);  // Make marker visible
        window.guessLatLng = e.latlng;
    })
};
