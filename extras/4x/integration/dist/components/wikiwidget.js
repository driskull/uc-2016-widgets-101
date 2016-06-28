define(['exports', 'react', 'wiki/WikiWidgetViewModel'], function (exports, _react, _WikiWidgetViewModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _WikiWidgetViewModel2 = _interopRequireDefault(_WikiWidgetViewModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var CSS = {
    base: "esri-wikipedia",
    icon: "esri-icon socicon-wikipedia",

    panel: "esri-wikipedia__panel",
    panelOpen: "esri-wikipedia__panel--open",
    loading: "esri-wikipedia__panel--loading",
    title: "esri-wikipedia__title",
    refresh: "esri-wikipedia__refresh",
    refreshIcon: "esri-icon-refresh",
    close: "esri-wikipedia__close esri-icon-close",
    scroller: "esri-wikipedia__list-scroller",

    list: "esri-wikipedia__list",
    message: "esri-wikipedia__message",
    item: "esri-wikipedia__result",
    image: "esri-wikipedia__result-image",
    noImage: "esri-wikipedia__result-image--none",
    noImageIcon: "esri-wikipedia--deny-icon esri-icon-deny",
    header: "esri-wikipedia__header",
    footer: "esri-wikipedia__footer"
  };

  var WikiWidget = _react2.default.createClass({
    displayName: 'WikiWidget',
    getInitialState: function getInitialState() {
      return {
        vm: new _WikiWidgetViewModel2.default(),
        results: [],
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

        _this._refresh();
      });
    },
    render: function render() {
      var panelClasses = this.state.updating ? CSS.panel + " " + CSS.loading : CSS.panel;

      return _react2.default.createElement(
        'div',
        { className: panelClasses },
        _react2.default.createElement(
          'div',
          { className: CSS.header },
          _react2.default.createElement(
            'h1',
            { className: CSS.title },
            "Wikipedia"
          )
        ),
        _react2.default.createElement(
          'div',
          { className: CSS.scroller },
          _react2.default.createElement(
            'ol',
            { className: CSS.list },
            this._generateListItems()
          )
        ),
        _react2.default.createElement(
          'div',
          { className: CSS.footer },
          _react2.default.createElement(
            'div',
            { className: CSS.refresh, title: "Refresh", tabIndex: 0,
              onClick: this._refresh },
            _react2.default.createElement('span', { className: CSS.refreshIcon }),
            "Refresh"
          )
        )
      );
    },
    _refresh: function _refresh() {
      this._showLoadingStatus();

      this.state.vm.getNearbyItems().then(this._updateResults).always(this._hideLoadingStatus);
    },


    _showLoadingStatus: function _showLoadingStatus() {
      this.setState({
        updating: true
      });
    },

    _updateResults: function _updateResults(results) {
      this.setState({
        results: results
      });
    },

    _hideLoadingStatus: function _hideLoadingStatus() {
      this.setState({
        updating: false
      });
    },

    _generateListItems: function _generateListItems() {
      var isLoading = this.state.updating;
      var noResults = this.state.results.length === 0;
      var items = void 0;

      if (isLoading) {
        items = _react2.default.createElement(
          'li',
          { className: CSS.message, key: 0 },
          "Fetching results..."
        );
      } else {
        items = this.state.results.map(function (item, index) {
          var styles = {};
          var imageClass = CSS.image;

          if (item.image) {
            styles.backgroundImage = "url('" + item.image + "')";
          } else {
            imageClass += " " + CSS.icon;
          }

          return _react2.default.createElement(
            'li',
            { className: CSS.item, 'data-id': item.id, tabIndex: 0,
              onClick: this._highlightItem.bind(this, item.id), key: index },
            _react2.default.createElement('span', { className: imageClass, title: item.title,
              style: styles }),
            _react2.default.createElement(
              'span',
              null,
              item.title
            )
          );
        }, this);
      }

      return items;
    },

    _highlightItem: function _highlightItem(index) {
      this.state.vm.highlight(index);
    }

  });

  exports.default = WikiWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lraXdpZGdldC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxNQUFNLE1BQU07QUFDVixVQUFNLGdCQURJO0FBRVYsVUFBTSw2QkFGSTs7QUFJVixXQUFPLHVCQUpHO0FBS1YsZUFBVyw2QkFMRDtBQU1WLGFBQVMsZ0NBTkM7QUFPVixXQUFPLHVCQVBHO0FBUVYsYUFBUyx5QkFSQztBQVNWLGlCQUFhLG1CQVRIO0FBVVYsV0FBTyx1Q0FWRztBQVdWLGNBQVUsK0JBWEE7O0FBYVYsVUFBTSxzQkFiSTtBQWNWLGFBQVMseUJBZEM7QUFlVixVQUFNLHdCQWZJO0FBZ0JWLFdBQU8sOEJBaEJHO0FBaUJWLGFBQVMsb0NBakJDO0FBa0JWLGlCQUFhLDBDQWxCSDtBQW1CVixZQUFRLHdCQW5CRTtBQW9CVixZQUFRO0FBcEJFLEdBQVo7O0FBdUJBLE1BQU0sYUFBYSxnQkFBTSxXQUFOLENBQWtCO0FBQUE7QUFRbkMsbUJBUm1DLDZCQVFqQjtBQUNoQixhQUFPO0FBQ0wsWUFBSSxtQ0FEQztBQUVMLGlCQUFTLEVBRko7QUFHTCxrQkFBVTtBQUhMLE9BQVA7QUFLRCxLQWRrQztBQWdCbkMsbUJBaEJtQyw2QkFnQmpCO0FBQ2hCLGFBQU87QUFDTCxjQUFNO0FBREQsT0FBUDtBQUdELEtBcEJrQztBQXNCbkMscUJBdEJtQywrQkFzQmY7QUFBQTs7QUFDbEIsV0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixnQkFBUTtBQUMzQixjQUFLLEtBQUwsQ0FBVyxFQUFYLENBQWMsSUFBZCxHQUFxQixJQUFyQjs7QUFFQSxjQUFLLFFBQUw7QUFDRCxPQUpEO0FBS0QsS0E1QmtDO0FBOEJuQyxVQTlCbUMsb0JBOEIxQjtBQUNQLFVBQUksZUFBZSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQ0EsSUFBSSxLQUFKLEdBQVksR0FBWixHQUFrQixJQUFJLE9BRHRCLEdBRUEsSUFBSSxLQUZ2Qjs7QUFJQSxh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YWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBXaWtpV2lkZ2V0Vmlld01vZGVsIGZyb20gJ3dpa2kvV2lraVdpZGdldFZpZXdNb2RlbCc7XG5cbmNvbnN0IENTUyA9IHtcbiAgYmFzZTogXCJlc3JpLXdpa2lwZWRpYVwiLFxuICBpY29uOiBcImVzcmktaWNvbiBzb2NpY29uLXdpa2lwZWRpYVwiLFxuXG4gIHBhbmVsOiBcImVzcmktd2lraXBlZGlhX19wYW5lbFwiLFxuICBwYW5lbE9wZW46IFwiZXNyaS13aWtpcGVkaWFfX3BhbmVsLS1vcGVuXCIsXG4gIGxvYWRpbmc6IFwiZXNyaS13aWtpcGVkaWFfX3BhbmVsLS1sb2FkaW5nXCIsXG4gIHRpdGxlOiBcImVzcmktd2lraXBlZGlhX190aXRsZVwiLFxuICByZWZyZXNoOiBcImVzcmktd2lraXBlZGlhX19yZWZyZXNoXCIsXG4gIHJlZnJlc2hJY29uOiBcImVzcmktaWNvbi1yZWZyZXNoXCIsXG4gIGNsb3NlOiBcImVzcmktd2lraXBlZGlhX19jbG9zZSBlc3JpLWljb24tY2xvc2VcIixcbiAgc2Nyb2xsZXI6IFwiZXNyaS13aWtpcGVkaWFfX2xpc3Qtc2Nyb2xsZXJcIixcblxuICBsaXN0OiBcImVzcmktd2lraXBlZGlhX19saXN0XCIsXG4gIG1lc3NhZ2U6IFwiZXNyaS13aWtpcGVkaWFfX21lc3NhZ2VcIixcbiAgaXRlbTogXCJlc3JpLXdpa2lwZWRpYV9fcmVzdWx0XCIsXG4gIGltYWdlOiBcImVzcmktd2lraXBlZGlhX19yZXN1bHQtaW1hZ2VcIixcbiAgbm9JbWFnZTogXCJlc3JpLXdpa2lwZWRpYV9fcmVzdWx0LWltYWdlLS1ub25lXCIsXG4gIG5vSW1hZ2VJY29uOiBcImVzcmktd2lraXBlZGlhLS1kZW55LWljb24gZXNyaS1pY29uLWRlbnlcIixcbiAgaGVhZGVyOiBcImVzcmktd2lraXBlZGlhX19oZWFkZXJcIixcbiAgZm9vdGVyOiBcImVzcmktd2lraXBlZGlhX19mb290ZXJcIlxufTtcblxuY29uc3QgV2lraVdpZGdldCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy9cbiAgLy8gIExpZmVjeWNsZVxuICAvL1xuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIFxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZtOiBuZXcgV2lraVdpZGdldFZpZXdNb2RlbCgpLFxuICAgICAgcmVzdWx0czogW10sXG4gICAgICB1cGRhdGluZzogZmFsc2VcbiAgICB9O1xuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlldzoge31cbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMudmlldy50aGVuKHZpZXcgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS52bS52aWV3ID0gdmlldztcblxuICAgICAgdGhpcy5fcmVmcmVzaCgpO1xuICAgIH0pO1xuICB9LFxuICBcbiAgcmVuZGVyKCkge1xuICAgIGxldCBwYW5lbENsYXNzZXMgPSB0aGlzLnN0YXRlLnVwZGF0aW5nID9cbiAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnBhbmVsICsgXCIgXCIgKyBDU1MubG9hZGluZyA6XG4gICAgICAgICAgICAgICAgICAgICAgIENTUy5wYW5lbDtcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3BhbmVsQ2xhc3Nlc30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDU1MuaGVhZGVyfT5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPXtDU1MudGl0bGV9PntcIldpa2lwZWRpYVwifTwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Q1NTLnNjcm9sbGVyfT5cbiAgICAgICAgICA8b2wgY2xhc3NOYW1lPXtDU1MubGlzdH0+XG4gICAgICAgICAgICAgIHt0aGlzLl9nZW5lcmF0ZUxpc3RJdGVtcygpfVxuICAgICAgICAgIDwvb2w+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Q1NTLmZvb3Rlcn0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e0NTUy5yZWZyZXNofSB0aXRsZT17XCJSZWZyZXNoXCJ9IHRhYkluZGV4PXswfVxuICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5fcmVmcmVzaH0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e0NTUy5yZWZyZXNoSWNvbn0+PC9zcGFuPlxuICAgICAgICAgICAgICAge1wiUmVmcmVzaFwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIFxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vXG4gIC8vICBQcml2YXRlIE1ldGhvZHNcbiAgLy9cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBcbiAgX3JlZnJlc2goKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdTdGF0dXMoKTtcblxuICAgIHRoaXMuc3RhdGUudm0uZ2V0TmVhcmJ5SXRlbXMoKVxuICAgICAgLnRoZW4odGhpcy5fdXBkYXRlUmVzdWx0cylcbiAgICAgIC5hbHdheXModGhpcy5faGlkZUxvYWRpbmdTdGF0dXMpO1xuICB9LFxuXG4gIF9zaG93TG9hZGluZ1N0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1cGRhdGluZzogdHJ1ZVxuICAgIH0pO1xuICB9LFxuXG4gIF91cGRhdGVSZXN1bHRzOiBmdW5jdGlvbihyZXN1bHRzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICByZXN1bHRzOiByZXN1bHRzXG4gICAgfSk7XG4gIH0sXG5cbiAgX2hpZGVMb2FkaW5nU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVwZGF0aW5nOiBmYWxzZVxuICAgIH0pO1xuICB9LFxuXG4gIF9nZW5lcmF0ZUxpc3RJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlzTG9hZGluZyA9IHRoaXMuc3RhdGUudXBkYXRpbmc7XG4gICAgbGV0IG5vUmVzdWx0cyA9IHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGggPT09IDA7XG4gICAgbGV0IGl0ZW1zO1xuXG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgaXRlbXMgPSAoXG4gICAgICAgIDxsaSBjbGFzc05hbWU9e0NTUy5tZXNzYWdlfSBrZXk9ezB9PlxuICAgICAgICAgIHtcIkZldGNoaW5nIHJlc3VsdHMuLi5cIn1cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXRlbXMgPSB0aGlzLnN0YXRlLnJlc3VsdHMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGxldCBzdHlsZXMgPSB7fTtcbiAgICAgICAgbGV0IGltYWdlQ2xhc3MgPSBDU1MuaW1hZ2U7XG5cbiAgICAgICAgaWYgKGl0ZW0uaW1hZ2UpIHtcbiAgICAgICAgICBzdHlsZXMuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ1wiICsgaXRlbS5pbWFnZSArIFwiJylcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpbWFnZUNsYXNzICs9IFwiIFwiICsgQ1NTLmljb247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxsaSBjbGFzc05hbWU9e0NTUy5pdGVtfSBkYXRhLWlkPXtpdGVtLmlkfSB0YWJJbmRleD17MH1cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5faGlnaGxpZ2h0SXRlbS5iaW5kKHRoaXMsIGl0ZW0uaWQpfSBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aW1hZ2VDbGFzc30gdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzfT48L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj57aXRlbS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKVxuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9LFxuXG4gIF9oaWdobGlnaHRJdGVtOiBmdW5jdGlvbihpbmRleCkge1xuICAgIHRoaXMuc3RhdGUudm0uaGlnaGxpZ2h0KGluZGV4KTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgV2lraVdpZGdldDtcbiJdfQ==