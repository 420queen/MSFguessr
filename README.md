This project previously bundled Leaflet, the Protomaps integration and jQuery
in the `offline_assets` directory. The game now loads these libraries directly
from public CDNs (jsDelivr for Leaflet and the Protomaps plugin, and code.jquery.com for jQuery) so it runs without any local server setup as long as an
internet connection is available. Simply host the repository on GitHub Pages or
any static web server and open `index.html` in a browser.
Place your location photos inside the `img` folder and update `locations.json` accordingly.

### Map Libraries

The game uses Leaflet **1.9.4**, the Protomaps Leaflet integration
**1.15.0**, and jQuery **3.7.1** loaded from CDNs. Map tiles are retrieved from
the public Protomaps service at `https://tiles.protomaps.com/tiles/v3/{z}/{x}/{y}.pbf`.

### Assets

Fonts are loaded from the local `fonts` directory. Make sure the entire project directory is served so that images and fonts resolve correctly.
