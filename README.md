This version loads map tiles directly from the Protomaps online service.
Simply host the project on any static web server and open `index.html` in a browser.
If you want to change the pictures, update the files in `img` and adjust `locations.json` accordingly.

### Map Libraries

The game now references Leaflet **1.9.4** and the Protomaps Leaflet integration **1.15.0** directly from the CDN. jQuery **1.9.1** is included for compatibility with the existing scripts.

### Assets

Fonts are loaded from the local `fonts` directory. Make sure the entire project directory is served so that images and fonts resolve correctly.
