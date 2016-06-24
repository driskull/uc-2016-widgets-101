define(['exports', 'react', 'esri/core/watchUtils', 'esri/widgets/BasemapToggle/BasemapToggleViewModel'], function (exports, _react, _watchUtils, _BasemapToggleViewModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _watchUtils2 = _interopRequireDefault(_watchUtils);

  var _BasemapToggleViewModel2 = _interopRequireDefault(_BasemapToggleViewModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function bgImage(url) {
    return {
      backgroundImage: 'url(' + url + ')'
    };
  }

  var BasemapToggle = _react2.default.createClass({
    displayName: 'BasemapToggle',
    getInitialState: function getInitialState() {
      return {
        vm: new _BasemapToggleViewModel2.default(),
        secondaryThumbnailUrl: ''
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        view: {},
        secondaryThumbnailUrl: '',
        currentThumbnailUrl: '',
        updating: false
      };
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      this.props.view.then(function (view) {

        _this.state.vm.view = view;
        _this.state.vm.secondaryBasemap = _this.props.secondaryBasemap;

        var _state$vm = _this.state.vm;
        var secondaryBasemap = _state$vm.secondaryBasemap;
        var currentBasemap = _state$vm.currentBasemap;


        var info = _this.state.vm.getBasemapInfo(_this.props.secondaryBasemap || 'topo');

        _this.setState({
          secondaryThumbnailUrl: info.thumbnailUrl,
          currentThumbnailUrl: _this.state.vm.currentBasemap.thumbnailUrl
        });

        _watchUtils2.default.watch(_this.state.vm, 'secondaryBasemap', _this.updateThumbnails);
        _watchUtils2.default.init(view, 'stationary', function (updating) {
          _this.setState({ updating: updating });
        });
      });
    },
    updateThumbnails: function updateThumbnails(secondary, current) {
      var secInfo = this.state.vm.getBasemapInfo(secondary);
      var curInfo = this.state.vm.getBasemapInfo(current);
      this.setState({
        secondaryThumbnailUrl: secInfo.thumbnailUrl,
        currentThumbnailUrl: curInfo.thumbnailUrl
      });
    },
    toggle: function toggle() {
      this.state.vm.toggle();
    },
    render: function render() {

      var currentThumbnailStyle = bgImage(this.state.currentThumbnailUrl);

      var secondaryThumbnailStyle = bgImage(this.state.secondaryThumbnailUrl);

      var style = this.state.updating ? 'basemap-container' : 'basemap-container view-busy';

      return _react2.default.createElement(
        'div',
        { className: style },
        _react2.default.createElement('div', { className: 'basemap-item basemap-item-secondary', onClick: this.toggle, style: secondaryThumbnailStyle }),
        _react2.default.createElement('div', { className: 'basemap-item basemap-item-current', style: currentThumbnailStyle })
      );
    }
  });

  exports.default = BasemapToggle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFzZW1hcHRvZ2dsZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLFdBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUNwQixXQUFPO0FBQ0wsdUJBQWlCLFNBQVMsR0FBVCxHQUFlLEdBQWY7S0FEbkIsQ0FEb0I7R0FBdEI7O0FBTUEsTUFBTSxnQkFBZ0IsZ0JBQU0sV0FBTixDQUFrQjs7QUFFdEMsZ0RBQWtCO0FBQ2hCLGFBQU87QUFDTCxZQUFJLHNDQUFKO0FBQ0EsK0JBQXVCLEVBQXZCO09BRkYsQ0FEZ0I7S0FGb0I7QUFTdEMsZ0RBQWtCO0FBQ2hCLGFBQU87QUFDTCxjQUFNLEVBQU47QUFDQSwrQkFBdUIsRUFBdkI7QUFDQSw2QkFBcUIsRUFBckI7QUFDQSxrQkFBVSxLQUFWO09BSkYsQ0FEZ0I7S0FUb0I7QUFrQnRDLG9EQUFvQjs7O0FBQ2xCLFdBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBcUIsZ0JBQVE7O0FBRTNCLGNBQUssS0FBTCxDQUFXLEVBQVgsQ0FBYyxJQUFkLEdBQXFCLElBQXJCLENBRjJCO0FBRzNCLGNBQUssS0FBTCxDQUFXLEVBQVgsQ0FBYyxnQkFBZCxHQUFpQyxNQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUhOOzt3QkFLZ0IsTUFBSyxLQUFMLENBQVcsRUFBWCxDQUxoQjtZQUtyQiw4Q0FMcUI7WUFLSCwwQ0FMRzs7O0FBTzNCLFlBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxFQUFYLENBQWMsY0FBZCxDQUE2QixNQUFLLEtBQUwsQ0FBVyxnQkFBWCxJQUErQixNQUEvQixDQUFwQyxDQVB1Qjs7QUFTM0IsY0FBSyxRQUFMLENBQWM7QUFDWixpQ0FBdUIsS0FBSyxZQUFMO0FBQ3ZCLCtCQUFxQixNQUFLLEtBQUwsQ0FBVyxFQUFYLENBQWMsY0FBZCxDQUE2QixZQUE3QjtTQUZ2QixFQVQyQjs7QUFjM0IsNkJBQVcsS0FBWCxDQUFpQixNQUFLLEtBQUwsQ0FBVyxFQUFYLEVBQWUsa0JBQWhDLEVBQW9ELE1BQUssZ0JBQUwsQ0FBcEQsQ0FkMkI7QUFlM0IsNkJBQVcsSUFBWCxDQUFnQixJQUFoQixFQUFzQixZQUF0QixFQUFvQyxVQUFDLFFBQUQsRUFBYztBQUNoRCxnQkFBSyxRQUFMLENBQWMsRUFBRSxrQkFBRixFQUFkLEVBRGdEO1NBQWQsQ0FBcEMsQ0FmMkI7T0FBUixDQUFyQixDQURrQjtLQWxCa0I7QUF5Q3RDLGdEQUFpQixXQUFXLFNBQVM7QUFDbkMsVUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLEVBQVgsQ0FBYyxjQUFkLENBQTZCLFNBQTdCLENBQVYsQ0FEK0I7QUFFbkMsVUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLEVBQVgsQ0FBYyxjQUFkLENBQTZCLE9BQTdCLENBQVYsQ0FGK0I7QUFHbkMsV0FBSyxRQUFMLENBQWM7QUFDWiwrQkFBdUIsUUFBUSxZQUFSO0FBQ3ZCLDZCQUFxQixRQUFRLFlBQVI7T0FGdkIsRUFIbUM7S0F6Q0M7QUFrRHRDLDhCQUFTO0FBQ1AsV0FBSyxLQUFMLENBQVcsRUFBWCxDQUFjLE1BQWQsR0FETztLQWxENkI7QUFzRHRDLDhCQUFTOztBQUVQLFVBQUksd0JBQXdCLFFBQVEsS0FBSyxLQUFMLENBQVcsbUJBQVgsQ0FBaEMsQ0FGRzs7QUFJUCxVQUFJLDBCQUEwQixRQUFRLEtBQUssS0FBTCxDQUFXLHFCQUFYLENBQWxDLENBSkc7O0FBTVAsVUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLFFBQVgsR0FBc0IsbUJBQXRCLEdBQTRDLDZCQUE1QyxDQU5MOztBQVFQLGFBRUU7O1VBQUssV0FBVyxLQUFYLEVBQUw7UUFDRSx1Q0FBSyxXQUFVLHFDQUFWLEVBQWdELFNBQVMsS0FBSyxNQUFMLEVBQWEsT0FBTyx1QkFBUCxFQUEzRSxDQURGO1FBRUUsdUNBQUssV0FBVSxtQ0FBVixFQUE4QyxPQUFPLHFCQUFQLEVBQW5ELENBRkY7T0FGRixDQVJPO0tBdEQ2QjtHQUFsQixDQUFoQjs7b0JBMkVTIiwiZmlsZSI6ImNvbXBvbmVudHMvYmFzZW1hcHRvZ2dsZS5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHdhdGNoVXRpbHMgZnJvbSAnZXNyaS9jb3JlL3dhdGNoVXRpbHMnO1xuaW1wb3J0IEJhc2VtYXBUb2dnbGVWaWV3TW9kZWwgZnJvbSAnZXNyaS93aWRnZXRzL0Jhc2VtYXBUb2dnbGUvQmFzZW1hcFRvZ2dsZVZpZXdNb2RlbCc7XG5cbmZ1bmN0aW9uIGJnSW1hZ2UodXJsKSB7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB1cmwgKyAnKSdcbiAgfTtcbn1cblxuY29uc3QgQmFzZW1hcFRvZ2dsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZtOiBuZXcgQmFzZW1hcFRvZ2dsZVZpZXdNb2RlbCgpLFxuICAgICAgc2Vjb25kYXJ5VGh1bWJuYWlsVXJsOiAnJ1xuICAgIH07XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3OiB7fSxcbiAgICAgIHNlY29uZGFyeVRodW1ibmFpbFVybDogJycsXG4gICAgICBjdXJyZW50VGh1bWJuYWlsVXJsOiAnJyxcbiAgICAgIHVwZGF0aW5nOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnZpZXcudGhlbih2aWV3ID0+IHtcblxuICAgICAgdGhpcy5zdGF0ZS52bS52aWV3ID0gdmlldztcbiAgICAgIHRoaXMuc3RhdGUudm0uc2Vjb25kYXJ5QmFzZW1hcCA9IHRoaXMucHJvcHMuc2Vjb25kYXJ5QmFzZW1hcDtcblxuICAgICAgbGV0IHsgc2Vjb25kYXJ5QmFzZW1hcCwgY3VycmVudEJhc2VtYXAgfSA9IHRoaXMuc3RhdGUudm07XG5cbiAgICAgIGxldCBpbmZvID0gdGhpcy5zdGF0ZS52bS5nZXRCYXNlbWFwSW5mbyh0aGlzLnByb3BzLnNlY29uZGFyeUJhc2VtYXAgfHwgJ3RvcG8nKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlY29uZGFyeVRodW1ibmFpbFVybDogaW5mby50aHVtYm5haWxVcmwsXG4gICAgICAgIGN1cnJlbnRUaHVtYm5haWxVcmw6IHRoaXMuc3RhdGUudm0uY3VycmVudEJhc2VtYXAudGh1bWJuYWlsVXJsXG4gICAgICB9KTtcblxuICAgICAgd2F0Y2hVdGlscy53YXRjaCh0aGlzLnN0YXRlLnZtLCAnc2Vjb25kYXJ5QmFzZW1hcCcsIHRoaXMudXBkYXRlVGh1bWJuYWlscyk7XG4gICAgICB3YXRjaFV0aWxzLmluaXQodmlldywgJ3N0YXRpb25hcnknLCAodXBkYXRpbmcpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0aW5nIH0pO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVUaHVtYm5haWxzKHNlY29uZGFyeSwgY3VycmVudCkge1xuICAgIGxldCBzZWNJbmZvID0gdGhpcy5zdGF0ZS52bS5nZXRCYXNlbWFwSW5mbyhzZWNvbmRhcnkpO1xuICAgIGxldCBjdXJJbmZvID0gdGhpcy5zdGF0ZS52bS5nZXRCYXNlbWFwSW5mbyhjdXJyZW50KTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlY29uZGFyeVRodW1ibmFpbFVybDogc2VjSW5mby50aHVtYm5haWxVcmwsXG4gICAgICBjdXJyZW50VGh1bWJuYWlsVXJsOiBjdXJJbmZvLnRodW1ibmFpbFVybFxuICAgIH0pO1xuICB9LFxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnN0YXRlLnZtLnRvZ2dsZSgpO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcblxuICAgIGxldCBjdXJyZW50VGh1bWJuYWlsU3R5bGUgPSBiZ0ltYWdlKHRoaXMuc3RhdGUuY3VycmVudFRodW1ibmFpbFVybCk7XG5cbiAgICBsZXQgc2Vjb25kYXJ5VGh1bWJuYWlsU3R5bGUgPSBiZ0ltYWdlKHRoaXMuc3RhdGUuc2Vjb25kYXJ5VGh1bWJuYWlsVXJsKTtcblxuICAgIGxldCBzdHlsZSA9IHRoaXMuc3RhdGUudXBkYXRpbmcgPyAnYmFzZW1hcC1jb250YWluZXInIDogJ2Jhc2VtYXAtY29udGFpbmVyIHZpZXctYnVzeSc7XG5cbiAgICByZXR1cm4gKFxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmFzZW1hcC1pdGVtIGJhc2VtYXAtaXRlbS1zZWNvbmRhcnknIG9uQ2xpY2s9e3RoaXMudG9nZ2xlfSBzdHlsZT17c2Vjb25kYXJ5VGh1bWJuYWlsU3R5bGV9PjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmFzZW1hcC1pdGVtIGJhc2VtYXAtaXRlbS1jdXJyZW50JyBzdHlsZT17Y3VycmVudFRodW1ibmFpbFN0eWxlfT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgKTtcblxuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlbWFwVG9nZ2xlOyJdfQ==