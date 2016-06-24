define(['react', 'react/react-dom', 'esri/Map', 'esri/views/MapView', 'app/components/wikiwidget', 'dojo/domReady!'], function (_react, _reactDom, _Map, _MapView, _wikiwidget) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _Map2 = _interopRequireDefault(_Map);

  var _MapView2 = _interopRequireDefault(_MapView);

  var _wikiwidget2 = _interopRequireDefault(_wikiwidget);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var map = new _Map2.default({ basemap: 'dark-gray' });
  // NOTE - adding the mapvidew as JSX was odd
  // Because I need to pass the view around to
  // components.
  // I'll revisit this later
  //import MapView from 'app/components/mapview';


  var view = new _MapView2.default({
    container: document.getElementById('viewDiv'),
    map: map,
    center: [-116.51327133175782, 33.82029520464912],
    zoom: 10,
    ui: {
      components: [] // empty the UI
    }
  });

  _reactDom2.default.render(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_wikiwidget2.default, { view: view })
  ), document.getElementById('appDiv'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxNQUFNLE1BQU0sa0JBQVEsRUFBRSxTQUFTLFdBQVgsRUFBUixDQUFaOzs7Ozs7OztBQUVBLE1BQU0sT0FBTyxzQkFBWTtBQUN2QixlQUFXLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQURZO0FBRXZCLFlBRnVCO0FBR3ZCLFlBQVEsQ0FBQyxDQUFDLGtCQUFGLEVBQXNCLGlCQUF0QixDQUhlO0FBSXZCLFVBQU0sRUFKaUI7QUFLdkIsUUFBSTtBQUNGLGtCQUFZLEU7QUFEVjtBQUxtQixHQUFaLENBQWI7O0FBVUEscUJBQVMsTUFBVCxDQUNFO0FBQUE7QUFBQTtBQUNFLDBEQUFZLE1BQU0sSUFBbEI7QUFERixHQURGLEVBSUUsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBSkYiLCJmaWxlIjoibWFpbi5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0L3JlYWN0LWRvbSc7XG5pbXBvcnQgTWFwIGZyb20gJ2VzcmkvTWFwJztcbi8vIE5PVEUgLSBhZGRpbmcgdGhlIG1hcHZpZGV3IGFzIEpTWCB3YXMgb2RkXG4vLyBCZWNhdXNlIEkgbmVlZCB0byBwYXNzIHRoZSB2aWV3IGFyb3VuZCB0b1xuLy8gY29tcG9uZW50cy5cbi8vIEknbGwgcmV2aXNpdCB0aGlzIGxhdGVyXG4vL2ltcG9ydCBNYXBWaWV3IGZyb20gJ2FwcC9jb21wb25lbnRzL21hcHZpZXcnO1xuaW1wb3J0IE1hcFZpZXcgZnJvbSAnZXNyaS92aWV3cy9NYXBWaWV3JztcbmltcG9ydCBXaWtpV2lkZ2V0IGZyb20gJ2FwcC9jb21wb25lbnRzL3dpa2l3aWRnZXQnO1xuaW1wb3J0ICdkb2pvL2RvbVJlYWR5ISc7XG5cbmNvbnN0IG1hcCA9IG5ldyBNYXAoeyBiYXNlbWFwOiAnZGFyay1ncmF5J30pO1xuXG5jb25zdCB2aWV3ID0gbmV3IE1hcFZpZXcoe1xuICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3RGl2JyksXG4gIG1hcCxcbiAgY2VudGVyOiBbLTExNi41MTMyNzEzMzE3NTc4MiwgMzMuODIwMjk1MjA0NjQ5MTJdLFxuICB6b29tOiAxMCxcbiAgdWk6IHtcbiAgICBjb21wb25lbnRzOiBbXSAvLyBlbXB0eSB0aGUgVUlcbiAgfVxufSk7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPGRpdj5cbiAgICA8V2lraVdpZGdldCB2aWV3PXt2aWV3fS8+XG4gIDwvZGl2PixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcERpdicpXG4pO1xuIl19