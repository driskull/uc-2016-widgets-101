import React from 'react';
import ReactDOM from 'react/react-dom';
import Map from 'esri/Map';
// NOTE - adding the mapvidew as JSX was odd
// Because I need to pass the view around to
// components.
// I'll revisit this later
//import MapView from 'app/components/mapview';
import MapView from 'esri/views/MapView';
import WikiWidget from 'app/components/wikiwidget';
import 'dojo/domReady!';

const map = new Map({ basemap: 'dark-gray'});

const view = new MapView({
  container: document.getElementById('viewDiv'),
  map,
  center: [-117.1618, 32.7066],
  zoom: 14,
  ui: {
    components: [] // empty the UI
  }
});

ReactDOM.render(
  <div>
    <WikiWidget view={view}/>
  </div>,
  document.getElementById('appDiv')
);
