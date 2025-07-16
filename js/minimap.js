function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

  const protomapsLayer = protomapsL.leafletLayer({
  url: 'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=d8045d15a0243832',
  flavor: 'light', // 
  lang: 'fr' // 
});
protomapsLayer.addTo(mymap);

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
