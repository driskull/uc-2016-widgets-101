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

        _this.refresh();
      });
    },
    refresh: function refresh() {
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
      }
      // todo: sync properly
      //else if (noResults) {
      //  items = (
      //    <li className={CSS.message}>
      //      {"No results"}
      //    </li>
      //  );
      //}
      else {
          items = this.state.results.map(function (item, index) {
            var styles = {};
            var imageClass = CSS.image;
            var attribs = item.attributes;

            if (attribs.image) {
              styles.backgroundImage = "url('" + attribs.image + "')";
            } else {
              imageClass += " " + CSS.icon;
            }

            return _react2.default.createElement(
              'li',
              { className: CSS.item, 'data-id': attribs.id, tabIndex: 0,
                onClick: this._highlightItem.bind(this, attribs.id), key: index },
              _react2.default.createElement('span', { className: imageClass, title: attribs.title,
                style: styles }),
              _react2.default.createElement(
                'span',
                null,
                attribs.title
              )
            );
          }, this);
        }

      return items;
    },

    _highlightItem: function _highlightItem(index) {
      this.state.vm.highlight(index);
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
              onClick: this.refresh },
            _react2.default.createElement('span', { className: CSS.refreshIcon }),
            "Refresh"
          )
        )
      );
    }
  });

  exports.default = WikiWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lraXdpZGdldC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxNQUFNLE1BQU07QUFDVixVQUFNLGdCQURJO0FBRVYsVUFBTSw2QkFGSTs7QUFJVixXQUFPLHVCQUpHO0FBS1YsZUFBVyw2QkFMRDtBQU1WLGFBQVMsZ0NBTkM7QUFPVixXQUFPLHVCQVBHO0FBUVYsYUFBUyx5QkFSQztBQVNWLGlCQUFhLG1CQVRIO0FBVVYsV0FBTyx1Q0FWRztBQVdWLGNBQVUsK0JBWEE7O0FBYVYsVUFBTSxzQkFiSTtBQWNWLGFBQVMseUJBZEM7QUFlVixVQUFNLHdCQWZJO0FBZ0JWLFdBQU8sOEJBaEJHO0FBaUJWLGFBQVMsb0NBakJDO0FBa0JWLGlCQUFhLDBDQWxCSDtBQW1CVixZQUFRLHdCQW5CRTtBQW9CVixZQUFRO0FBcEJFLEdBQVo7O0FBdUJBLE1BQU0sYUFBYSxnQkFBTSxXQUFOLENBQWtCO0FBQUE7QUFFbkMsbUJBRm1DLDZCQUVqQjtBQUNoQixhQUFPO0FBQ0wsWUFBSSxtQ0FEQztBQUVMLGlCQUFTLEVBRko7QUFHTCxrQkFBVTtBQUhMLE9BQVA7QUFLRCxLQVJrQztBQVVuQyxtQkFWbUMsNkJBVWpCO0FBQ2hCLGFBQU87QUFDTCxjQUFNO0FBREQsT0FBUDtBQUdELEtBZGtDO0FBZ0JuQyxxQkFoQm1DLCtCQWdCZjtBQUFBOztBQUNsQixXQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQXFCLGdCQUFRO0FBQzNCLGNBQUssS0FBTCxDQUFXLEVBQVgsQ0FBYyxJQUFkLEdBQXFCLElBQXJCOztBQUVBLGNBQUssT0FBTDtBQUNELE9BSkQ7QUFLRCxLQXRCa0M7QUF3Qm5DLFdBeEJtQyxxQkF3QnpCO0FBQ1IsV0FBSyxrQkFBTDs7QUFFQSxXQUFLLEtBQUwsQ0FBVyxFQUFYLENBQWMsY0FBZCxHQUNHLElBREgsQ0FDUSxLQUFLLGNBRGIsRUFFRyxNQUZILENBRVUsS0FBSyxrQkFGZjtB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Z2V0LmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgV2lraVdpZGdldFZpZXdNb2RlbCBmcm9tICd3aWtpL1dpa2lXaWRnZXRWaWV3TW9kZWwnO1xuXG5jb25zdCBDU1MgPSB7XG4gIGJhc2U6IFwiZXNyaS13aWtpcGVkaWFcIixcbiAgaWNvbjogXCJlc3JpLWljb24gc29jaWNvbi13aWtpcGVkaWFcIixcblxuICBwYW5lbDogXCJlc3JpLXdpa2lwZWRpYV9fcGFuZWxcIixcbiAgcGFuZWxPcGVuOiBcImVzcmktd2lraXBlZGlhX19wYW5lbC0tb3BlblwiLFxuICBsb2FkaW5nOiBcImVzcmktd2lraXBlZGlhX19wYW5lbC0tbG9hZGluZ1wiLFxuICB0aXRsZTogXCJlc3JpLXdpa2lwZWRpYV9fdGl0bGVcIixcbiAgcmVmcmVzaDogXCJlc3JpLXdpa2lwZWRpYV9fcmVmcmVzaFwiLFxuICByZWZyZXNoSWNvbjogXCJlc3JpLWljb24tcmVmcmVzaFwiLFxuICBjbG9zZTogXCJlc3JpLXdpa2lwZWRpYV9fY2xvc2UgZXNyaS1pY29uLWNsb3NlXCIsXG4gIHNjcm9sbGVyOiBcImVzcmktd2lraXBlZGlhX19saXN0LXNjcm9sbGVyXCIsXG5cbiAgbGlzdDogXCJlc3JpLXdpa2lwZWRpYV9fbGlzdFwiLFxuICBtZXNzYWdlOiBcImVzcmktd2lraXBlZGlhX19tZXNzYWdlXCIsXG4gIGl0ZW06IFwiZXNyaS13aWtpcGVkaWFfX3Jlc3VsdFwiLFxuICBpbWFnZTogXCJlc3JpLXdpa2lwZWRpYV9fcmVzdWx0LWltYWdlXCIsXG4gIG5vSW1hZ2U6IFwiZXNyaS13aWtpcGVkaWFfX3Jlc3VsdC1pbWFnZS0tbm9uZVwiLFxuICBub0ltYWdlSWNvbjogXCJlc3JpLXdpa2lwZWRpYS0tZGVueS1pY29uIGVzcmktaWNvbi1kZW55XCIsXG4gIGhlYWRlcjogXCJlc3JpLXdpa2lwZWRpYV9faGVhZGVyXCIsXG4gIGZvb3RlcjogXCJlc3JpLXdpa2lwZWRpYV9fZm9vdGVyXCJcbn07XG5cbmNvbnN0IFdpa2lXaWRnZXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2bTogbmV3IFdpa2lXaWRnZXRWaWV3TW9kZWwoKSxcbiAgICAgIHJlc3VsdHM6IFtdLFxuICAgICAgdXBkYXRpbmc6IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXc6IHt9XG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnZpZXcudGhlbih2aWV3ID0+IHtcbiAgICAgIHRoaXMuc3RhdGUudm0udmlldyA9IHZpZXc7XG5cbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlZnJlc2goKSB7XG4gICAgdGhpcy5fc2hvd0xvYWRpbmdTdGF0dXMoKTtcblxuICAgIHRoaXMuc3RhdGUudm0uZ2V0TmVhcmJ5SXRlbXMoKVxuICAgICAgLnRoZW4odGhpcy5fdXBkYXRlUmVzdWx0cylcbiAgICAgIC5hbHdheXModGhpcy5faGlkZUxvYWRpbmdTdGF0dXMpO1xuICB9LFxuXG4gIF9zaG93TG9hZGluZ1N0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1cGRhdGluZzogdHJ1ZVxuICAgIH0pO1xuICB9LFxuXG4gIF91cGRhdGVSZXN1bHRzOiBmdW5jdGlvbihyZXN1bHRzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICByZXN1bHRzOiByZXN1bHRzXG4gICAgfSk7XG4gIH0sXG5cbiAgX2hpZGVMb2FkaW5nU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVwZGF0aW5nOiBmYWxzZVxuICAgIH0pO1xuICB9LFxuXG4gIF9nZW5lcmF0ZUxpc3RJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlzTG9hZGluZyA9IHRoaXMuc3RhdGUudXBkYXRpbmc7XG4gICAgbGV0IG5vUmVzdWx0cyA9IHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGggPT09IDA7XG4gICAgbGV0IGl0ZW1zO1xuXG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgaXRlbXMgPSAoXG4gICAgICAgIDxsaSBjbGFzc05hbWU9e0NTUy5tZXNzYWdlfSBrZXk9ezB9PlxuICAgICAgICAgIHtcIkZldGNoaW5nIHJlc3VsdHMuLi5cIn1cbiAgICAgICAgPC9saT5cbiAgICAgICk7XG4gICAgfVxuICAgIC8vIHRvZG86IHN5bmMgcHJvcGVybHlcbiAgICAvL2Vsc2UgaWYgKG5vUmVzdWx0cykge1xuICAgIC8vICBpdGVtcyA9IChcbiAgICAvLyAgICA8bGkgY2xhc3NOYW1lPXtDU1MubWVzc2FnZX0+XG4gICAgLy8gICAgICB7XCJObyByZXN1bHRzXCJ9XG4gICAgLy8gICAgPC9saT5cbiAgICAvLyAgKTtcbiAgICAvL31cbiAgICBlbHNlIHtcbiAgICAgIGl0ZW1zID0gdGhpcy5zdGF0ZS5yZXN1bHRzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICBsZXQgc3R5bGVzID0ge307XG4gICAgICAgIGxldCBpbWFnZUNsYXNzID0gQ1NTLmltYWdlO1xuICAgICAgICBsZXQgYXR0cmlicyA9IGl0ZW0uYXR0cmlidXRlcztcblxuICAgICAgICBpZiAoYXR0cmlicy5pbWFnZSkge1xuICAgICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBhdHRyaWJzLmltYWdlICsgXCInKVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGltYWdlQ2xhc3MgKz0gXCIgXCIgKyBDU1MuaWNvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGxpIGNsYXNzTmFtZT17Q1NTLml0ZW19IGRhdGEtaWQ9e2F0dHJpYnMuaWR9IHRhYkluZGV4PXswfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oaWdobGlnaHRJdGVtLmJpbmQodGhpcywgYXR0cmlicy5pZCl9IGtleT17aW5kZXh9PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpbWFnZUNsYXNzfSB0aXRsZT17YXR0cmlicy50aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXN9Pjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPnthdHRyaWJzLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApXG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH0sXG5cbiAgX2hpZ2hsaWdodEl0ZW06IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgdGhpcy5zdGF0ZS52bS5oaWdobGlnaHQoaW5kZXgpO1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcGFuZWxDbGFzc2VzID0gdGhpcy5zdGF0ZS51cGRhdGluZyA/XG4gICAgICAgICAgICAgICAgICAgICAgIENTUy5wYW5lbCArIFwiIFwiICsgQ1NTLmxvYWRpbmcgOlxuICAgICAgICAgICAgICAgICAgICAgICBDU1MucGFuZWw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3BhbmVsQ2xhc3Nlc30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDU1MuaGVhZGVyfT5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPXtDU1MudGl0bGV9PntcIldpa2lwZWRpYVwifTwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Q1NTLnNjcm9sbGVyfT5cbiAgICAgICAgICA8b2wgY2xhc3NOYW1lPXtDU1MubGlzdH0+XG4gICAgICAgICAgICB7dGhpcy5fZ2VuZXJhdGVMaXN0SXRlbXMoKX1cbiAgICAgICAgICA8L29sPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e0NTUy5mb290ZXJ9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDU1MucmVmcmVzaH0gdGl0bGU9e1wiUmVmcmVzaFwifSB0YWJJbmRleD17MH1cbiAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucmVmcmVzaH0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e0NTUy5yZWZyZXNoSWNvbn0+PC9zcGFuPlxuICAgICAgICAgICAge1wiUmVmcmVzaFwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFdpa2lXaWRnZXQ7XG4iXX0=