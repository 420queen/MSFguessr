This version loads map tiles directly from the Protomaps online service.
Simply host the project on any static web server and open `index.html` in a browser.
Place your location photos inside the `img` folder and update `locations.json` accordingly.

### Map Libraries

The game now references Leaflet **1.9.4** and the Protomaps Leaflet integration **1.15.0** from jsDelivr. jQuery **1.9.1** is included for compatibility with the existing scripts.

### Assets

Fonts are loaded from the local `fonts` directory. Make sure the entire project directory is served so that images and fonts resolve correctly.
