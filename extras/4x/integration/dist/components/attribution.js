define(['exports', 'react', 'esri/core/watchUtils', 'esri/widgets/Attribution/AttributionViewModel'], function (exports, _react, _watchUtils, _AttributionViewModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _watchUtils2 = _interopRequireDefault(_watchUtils);

  var _AttributionViewModel2 = _interopRequireDefault(_AttributionViewModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Attribution = _react2.default.createClass({
    displayName: 'Attribution',
    getInitialState: function getInitialState() {
      return {
        vm: new _AttributionViewModel2.default(),
        attribution: '',
        updating: false
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
        _watchUtils2.default.watch(_this.state.vm, 'attributionText', function (attribution) {
          _this.setState({ attribution: attribution });
        });
        _watchUtils2.default.init(view, 'stationary', function (updating) {
          _this.setState({ updating: updating });
        });
      });
    },
    render: function render() {

      var style = this.state.updating ? 'attribution' : 'attribution view-busy';

      return _react2.default.createElement(
        'span',
        { className: style, ref: 'mainNode' },
        this.state.attribution
      );
    }
  });

  exports.default = Attribution;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXR0cmlidXRpb24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxNQUFNLGNBQWMsZ0JBQU0sV0FBTixDQUFrQjs7QUFFcEMsZ0RBQWtCO0FBQ2hCLGFBQU87QUFDTCxZQUFJLG9DQUFKO0FBQ0EscUJBQWEsRUFBYjtBQUNBLGtCQUFVLEtBQVY7T0FIRixDQURnQjtLQUZrQjtBQVVwQyxnREFBa0I7QUFDaEIsYUFBTztBQUNMLGNBQU0sRUFBTjtPQURGLENBRGdCO0tBVmtCO0FBZ0JwQyxvREFBb0I7OztBQUNsQixXQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQXFCLGdCQUFRO0FBQzNCLGNBQUssS0FBTCxDQUFXLEVBQVgsQ0FBYyxJQUFkLEdBQXFCLElBQXJCLENBRDJCO0FBRTNCLDZCQUFXLEtBQVgsQ0FBaUIsTUFBSyxLQUFMLENBQVcsRUFBWCxFQUFlLGlCQUFoQyxFQUFtRCxVQUFDLFdBQUQsRUFBaUI7QUFDbEUsZ0JBQUssUUFBTCxDQUFjLEVBQUUsd0JBQUYsRUFBZCxFQURrRTtTQUFqQixDQUFuRCxDQUYyQjtBQUszQiw2QkFBVyxJQUFYLENBQWdCLElBQWhCLEVBQXNCLFlBQXRCLEVBQW9DLFVBQUMsUUFBRCxFQUFjO0FBQ2hELGdCQUFLLFFBQUwsQ0FBYyxFQUFFLGtCQUFGLEVBQWQsRUFEZ0Q7U0FBZCxDQUFwQyxDQUwyQjtPQUFSLENBQXJCLENBRGtCO0tBaEJnQjtBQTRCcEMsOEJBQVM7O0FBRVAsVUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLFFBQVgsR0FBc0IsYUFBdEIsR0FBc0MsdUJBQXRDLENBRkw7O0FBSVAsYUFFRTs7VUFBTSxXQUFXLEtBQVgsRUFBa0IsS0FBSSxVQUFKLEVBQXhCO1FBQXdDLEtBQUssS0FBTCxDQUFXLFdBQVg7T0FGMUMsQ0FKTztLQTVCMkI7R0FBbEIsQ0FBZDs7b0JBMENTIiwiZmlsZSI6ImNvbXBvbmVudHMvYXR0cmlidXRpb24uanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3YXRjaFV0aWxzIGZyb20gJ2VzcmkvY29yZS93YXRjaFV0aWxzJztcbmltcG9ydCBBdHRyaWJ1dGlvblZpZXdNb2RlbCBmcm9tICdlc3JpL3dpZGdldHMvQXR0cmlidXRpb24vQXR0cmlidXRpb25WaWV3TW9kZWwnO1xuXG5jb25zdCBBdHRyaWJ1dGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZtOiBuZXcgQXR0cmlidXRpb25WaWV3TW9kZWwoKSxcbiAgICAgIGF0dHJpYnV0aW9uOiAnJyxcbiAgICAgIHVwZGF0aW5nOiBmYWxzZVxuICAgIH07XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3OiB7fVxuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnZpZXcudGhlbih2aWV3ID0+IHtcbiAgICAgIHRoaXMuc3RhdGUudm0udmlldyA9IHZpZXc7XG4gICAgICB3YXRjaFV0aWxzLndhdGNoKHRoaXMuc3RhdGUudm0sICdhdHRyaWJ1dGlvblRleHQnLCAoYXR0cmlidXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGF0dHJpYnV0aW9uIH0pO1xuICAgICAgfSk7XG4gICAgICB3YXRjaFV0aWxzLmluaXQodmlldywgJ3N0YXRpb25hcnknLCAodXBkYXRpbmcpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0aW5nIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuXG4gICAgbGV0IHN0eWxlID0gdGhpcy5zdGF0ZS51cGRhdGluZyA/ICdhdHRyaWJ1dGlvbicgOiAnYXR0cmlidXRpb24gdmlldy1idXN5JztcblxuICAgIHJldHVybiAoXG5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGV9IHJlZj0nbWFpbk5vZGUnPnt0aGlzLnN0YXRlLmF0dHJpYnV0aW9ufTwvc3Bhbj5cblxuICAgICk7XG5cbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXR0cmlidXRpb247Il19