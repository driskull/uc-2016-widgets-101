define(['exports', 'react', 'esri/core/watchUtils', 'esri/widgets/Zoom/ZoomViewModel'], function (exports, _react, _watchUtils, _ZoomViewModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _watchUtils2 = _interopRequireDefault(_watchUtils);

  var _ZoomViewModel2 = _interopRequireDefault(_ZoomViewModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Zoom = _react2.default.createClass({
    displayName: 'Zoom',
    getInitialState: function getInitialState() {
      return {
        vm: new _ZoomViewModel2.default(),
        updating: false,
        maxZoomed: false,
        minZoomed: false
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        view: {}
      };
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      this.props.view.then(function (view) {
        _this.state.vm.view = view;
        _watchUtils2.default.init(view, 'zoom', function (val) {
          _this.setState({
            maxZoomed: val === view.constraints.maxZoom,
            minZoomed: val === view.constraints.minZoom
          });
        });
        _watchUtils2.default.init(view, 'stationary', function (updating) {
          _this.setState({ updating: updating });
        });
      });
    },
    zoomIn: function zoomIn() {
      if (!this.state.maxZoomed) {
        this.state.vm.zoomIn();
      }
    },
    zoomOut: function zoomOut() {
      if (!this.state.minZoomed) {
        this.state.vm.zoomOut();
      }
    },
    render: function render() {

      var btnstyle = this.state.updating ? 'zoom-btns' : 'zoom-btns view-busy';
      var maxstate = this.state.maxZoomed ? 'button raised grey narrow disable' : 'button raised grey narrow';
      var minstate = this.state.minZoomed ? 'button raised grey narrow disable' : 'button raised grey narrow';

      return _react2.default.createElement(
        'div',
        { className: btnstyle },
        _react2.default.createElement(
          'div',
          { className: maxstate, onClick: this.zoomIn },
          _react2.default.createElement(
            'div',
            { className: 'center' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'add'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: minstate, onClick: this.zoomOut },
          _react2.default.createElement(
            'div',
            { className: 'center' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'remove'
            )
          )
        )
      );
    }
  });

  exports.default = Zoom;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvem9vbS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLE1BQU0sT0FBTyxnQkFBTSxXQUFOLENBQWtCOztBQUU3QixnREFBa0I7QUFDaEIsYUFBTztBQUNMLFlBQUksNkJBQUo7QUFDQSxrQkFBVSxLQUFWO0FBQ0EsbUJBQVcsS0FBWDtBQUNBLG1CQUFXLEtBQVg7T0FKRixDQURnQjtLQUZXO0FBVzdCLGdEQUFrQjtBQUNoQixhQUFPO0FBQ0wsY0FBTSxFQUFOO09BREYsQ0FEZ0I7S0FYVztBQWlCN0Isb0RBQW9COzs7QUFDbEIsV0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixnQkFBUTtBQUMzQixjQUFLLEtBQUwsQ0FBVyxFQUFYLENBQWMsSUFBZCxHQUFxQixJQUFyQixDQUQyQjtBQUUzQiw2QkFBVyxJQUFYLENBQWdCLElBQWhCLEVBQXNCLE1BQXRCLEVBQThCLFVBQUMsR0FBRCxFQUFTO0FBQ3JDLGdCQUFLLFFBQUwsQ0FBYztBQUNaLHVCQUFXLFFBQVEsS0FBSyxXQUFMLENBQWlCLE9BQWpCO0FBQ25CLHVCQUFXLFFBQVEsS0FBSyxXQUFMLENBQWlCLE9BQWpCO1dBRnJCLEVBRHFDO1NBQVQsQ0FBOUIsQ0FGMkI7QUFRM0IsNkJBQVcsSUFBWCxDQUFnQixJQUFoQixFQUFzQixZQUF0QixFQUFvQyxVQUFDLFFBQUQsRUFBYztBQUNoRCxnQkFBSyxRQUFMLENBQWMsRUFBRSxrQkFBRixFQUFkLEVBRGdEO1NBQWQsQ0FBcEMsQ0FSMkI7T0FBUixDQUFyQixDQURrQjtLQWpCUztBQWdDN0IsOEJBQVM7QUFDUCxVQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsU0FBWCxFQUFzQjtBQUN6QixhQUFLLEtBQUwsQ0FBVyxFQUFYLENBQWMsTUFBZCxHQUR5QjtPQUEzQjtLQWpDMkI7QUFzQzdCLGdDQUFVO0FBQ1IsVUFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFBc0I7QUFDekIsYUFBSyxLQUFMLENBQVcsRUFBWCxDQUFjLE9BQWQsR0FEeUI7T0FBM0I7S0F2QzJCO0FBNEM3Qiw4QkFBUzs7QUFFUCxVQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixXQUF0QixHQUFvQyxxQkFBcEMsQ0FGUjtBQUdQLFVBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLG1DQUF2QixHQUE2RCwyQkFBN0QsQ0FIUjtBQUlQLFVBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLG1DQUF2QixHQUE2RCwyQkFBN0QsQ0FKUjs7QUFNUCxhQUNFOztVQUFLLFdBQVcsUUFBWCxFQUFMO1FBQ0U7O1lBQUssV0FBVyxRQUFYLEVBQXFCLFNBQVMsS0FBSyxNQUFMLEVBQW5DO1VBQ0U7O2NBQUssV0FBVSxRQUFWLEVBQUw7WUFBd0I7O2dCQUFHLFdBQVUsZ0JBQVYsRUFBSDs7YUFBeEI7V0FERjtTQURGO1FBSUU7O1lBQUssV0FBVyxRQUFYLEVBQXFCLFNBQVMsS0FBSyxPQUFMLEVBQW5DO1VBQ0U7O2NBQUssV0FBVSxRQUFWLEVBQUw7WUFBd0I7O2dCQUFHLFdBQVUsZ0JBQVYsRUFBSDs7YUFBeEI7V0FERjtTQUpGO09BREYsQ0FOTztLQTVDb0I7R0FBbEIsQ0FBUDs7b0JBZ0VTIiwiZmlsZSI6ImNvbXBvbmVudHMvem9vbS5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHdhdGNoVXRpbHMgZnJvbSAnZXNyaS9jb3JlL3dhdGNoVXRpbHMnO1xuaW1wb3J0IFpvb21WaWV3TW9kZWwgZnJvbSAnZXNyaS93aWRnZXRzL1pvb20vWm9vbVZpZXdNb2RlbCc7XG5cbmNvbnN0IFpvb20gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2bTogbmV3IFpvb21WaWV3TW9kZWwoKSxcbiAgICAgIHVwZGF0aW5nOiBmYWxzZSxcbiAgICAgIG1heFpvb21lZDogZmFsc2UsXG4gICAgICBtaW5ab29tZWQ6IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXc6IHt9XG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMudmlldy50aGVuKHZpZXcgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS52bS52aWV3ID0gdmlldztcbiAgICAgIHdhdGNoVXRpbHMuaW5pdCh2aWV3LCAnem9vbScsICh2YWwpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWF4Wm9vbWVkOiB2YWwgPT09IHZpZXcuY29uc3RyYWludHMubWF4Wm9vbSxcbiAgICAgICAgICBtaW5ab29tZWQ6IHZhbCA9PT0gdmlldy5jb25zdHJhaW50cy5taW5ab29tXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB3YXRjaFV0aWxzLmluaXQodmlldywgJ3N0YXRpb25hcnknLCAodXBkYXRpbmcpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0aW5nIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgem9vbUluKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5tYXhab29tZWQpIHtcbiAgICAgIHRoaXMuc3RhdGUudm0uem9vbUluKCk7XG4gICAgfVxuICB9LFxuXG4gIHpvb21PdXQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLm1pblpvb21lZCkge1xuICAgICAgdGhpcy5zdGF0ZS52bS56b29tT3V0KCk7XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlcigpIHtcblxuICAgIGxldCBidG5zdHlsZSA9IHRoaXMuc3RhdGUudXBkYXRpbmcgPyAnem9vbS1idG5zJyA6ICd6b29tLWJ0bnMgdmlldy1idXN5JztcbiAgICBsZXQgbWF4c3RhdGUgPSB0aGlzLnN0YXRlLm1heFpvb21lZCA/ICdidXR0b24gcmFpc2VkIGdyZXkgbmFycm93IGRpc2FibGUnIDogJ2J1dHRvbiByYWlzZWQgZ3JleSBuYXJyb3cnO1xuICAgIGxldCBtaW5zdGF0ZSA9IHRoaXMuc3RhdGUubWluWm9vbWVkID8gJ2J1dHRvbiByYWlzZWQgZ3JleSBuYXJyb3cgZGlzYWJsZScgOiAnYnV0dG9uIHJhaXNlZCBncmV5IG5hcnJvdyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2J0bnN0eWxlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e21heHN0YXRlfSBvbkNsaWNrPXt0aGlzLnpvb21Jbn0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJcIj48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPmFkZDwvaT48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXttaW5zdGF0ZX0gb25DbGljaz17dGhpcy56b29tT3V0fT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlclwiPjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cmVtb3ZlPC9pPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFpvb207XG4iXX0=