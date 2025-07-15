This version bundles all required libraries so the game can run without internet access.
Simply host the project on any static web server and open `index.html` in a browser.
Place your location photos inside the `img` folder and update `locations.json` accordingly.

### Map Libraries

The game uses local copies of Leaflet **1.9.4**, the Protomaps Leaflet integration **1.15.0**, and jQuery **3.7.1** found in the `offline_assets` folder.

### Assets

Fonts are loaded from the local `fonts` directory. Make sure the entire project directory is served so that images and fonts resolve correctly.
