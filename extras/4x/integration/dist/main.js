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
    center: [-117.1618, 32.7066],
    zoom: 14,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxNQUFNLE1BQU0sa0JBQVEsRUFBRSxTQUFTLFdBQVgsRUFBUixDQUFaOzs7Ozs7OztBQUVBLE1BQU0sT0FBTyxzQkFBWTtBQUN2QixlQUFXLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQURZO0FBRXZCLFlBRnVCO0FBR3ZCLFlBQVEsQ0FBQyxDQUFDLFFBQUYsRUFBWSxPQUFaLENBSGU7QUFJdkIsVUFBTSxFQUppQjtBQUt2QixRQUFJO0FBQ0Ysa0JBQVksRTtBQURWO0FBTG1CLEdBQVosQ0FBYjs7QUFVQSxxQkFBUyxNQUFULENBQ0U7QUFBQTtBQUFBO0FBQ0UsMERBQVksTUFBTSxJQUFsQjtBQURGLEdBREYsRUFJRSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FKRiIsImZpbGUiOiJtYWluLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QvcmVhY3QtZG9tJztcbmltcG9ydCBNYXAgZnJvbSAnZXNyaS9NYXAnO1xuLy8gTk9URSAtIGFkZGluZyB0aGUgbWFwdmlkZXcgYXMgSlNYIHdhcyBvZGRcbi8vIEJlY2F1c2UgSSBuZWVkIHRvIHBhc3MgdGhlIHZpZXcgYXJvdW5kIHRvXG4vLyBjb21wb25lbnRzLlxuLy8gSSdsbCByZXZpc2l0IHRoaXMgbGF0ZXJcbi8vaW1wb3J0IE1hcFZpZXcgZnJvbSAnYXBwL2NvbXBvbmVudHMvbWFwdmlldyc7XG5pbXBvcnQgTWFwVmlldyBmcm9tICdlc3JpL3ZpZXdzL01hcFZpZXcnO1xuaW1wb3J0IFdpa2lXaWRnZXQgZnJvbSAnYXBwL2NvbXBvbmVudHMvd2lraXdpZGdldCc7XG5pbXBvcnQgJ2Rvam8vZG9tUmVhZHkhJztcblxuY29uc3QgbWFwID0gbmV3IE1hcCh7IGJhc2VtYXA6ICdkYXJrLWdyYXknfSk7XG5cbmNvbnN0IHZpZXcgPSBuZXcgTWFwVmlldyh7XG4gIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdEaXYnKSxcbiAgbWFwLFxuICBjZW50ZXI6IFstMTE3LjE2MTgsIDMyLjcwNjZdLFxuICB6b29tOiAxNCxcbiAgdWk6IHtcbiAgICBjb21wb25lbnRzOiBbXSAvLyBlbXB0eSB0aGUgVUlcbiAgfVxufSk7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPGRpdj5cbiAgICA8V2lraVdpZGdldCB2aWV3PXt2aWV3fS8+XG4gIDwvZGl2PixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcERpdicpXG4pO1xuIl19