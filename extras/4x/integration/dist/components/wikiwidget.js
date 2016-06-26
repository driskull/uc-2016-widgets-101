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
    }

  });

  exports.default = WikiWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lraXdpZGdldC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxNQUFNLE1BQU07QUFDVixVQUFNLGdCQURJO0FBRVYsVUFBTSw2QkFGSTs7QUFJVixXQUFPLHVCQUpHO0FBS1YsZUFBVyw2QkFMRDtBQU1WLGFBQVMsZ0NBTkM7QUFPVixXQUFPLHVCQVBHO0FBUVYsYUFBUyx5QkFSQztBQVNWLGlCQUFhLG1CQVRIO0FBVVYsV0FBTyx1Q0FWRztBQVdWLGNBQVUsK0JBWEE7O0FBYVYsVUFBTSxzQkFiSTtBQWNWLGFBQVMseUJBZEM7QUFlVixVQUFNLHdCQWZJO0FBZ0JWLFdBQU8sOEJBaEJHO0FBaUJWLGFBQVMsb0NBakJDO0FBa0JWLGlCQUFhLDBDQWxCSDtBQW1CVixZQUFRLHdCQW5CRTtBQW9CVixZQUFRO0FBcEJFLEdBQVo7O0FBdUJBLE1BQU0sYUFBYSxnQkFBTSxXQUFOLENBQWtCO0FBQUE7QUFRbkMsbUJBUm1DLDZCQVFqQjtBQUNoQixhQUFPO0FBQ0wsWUFBSSxtQ0FEQztBQUVMLGlCQUFTLEVBRko7QUFHTCxrQkFBVTtBQUhMLE9BQVA7QUFLRCxLQWRrQztBQWdCbkMsbUJBaEJtQyw2QkFnQmpCO0FBQ2hCLGFBQU87QUFDTCxjQUFNO0FBREQsT0FBUDtBQUdELEtBcEJrQztBQXNCbkMscUJBdEJtQywrQkFzQmY7QUFBQTs7QUFDbEIsV0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFxQixnQkFBUTtBQUMzQixjQUFLLEtBQUwsQ0FBVyxFQUFYLENBQWMsSUFBZCxHQUFxQixJQUFyQjs7QUFFQSxjQUFLLFFBQUw7QUFDRCxPQUpEO0FBS0QsS0E1QmtDO0FBOEJuQyxVQTlCbUMsb0JBOEIxQjtBQUNQLFVBQUksZUFBZSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQ0EsSUFBSSxLQUFKLEdBQVksR0FBWixHQUFrQixJQUFJLE9BRHRCLEdBRUEsSUFBSSxLQUZ2Qjs7QUFJQSxh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aXdpZGdldC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFdpa2lXaWRnZXRWaWV3TW9kZWwgZnJvbSAnd2lraS9XaWtpV2lkZ2V0Vmlld01vZGVsJztcblxuY29uc3QgQ1NTID0ge1xuICBiYXNlOiBcImVzcmktd2lraXBlZGlhXCIsXG4gIGljb246IFwiZXNyaS1pY29uIHNvY2ljb24td2lraXBlZGlhXCIsXG5cbiAgcGFuZWw6IFwiZXNyaS13aWtpcGVkaWFfX3BhbmVsXCIsXG4gIHBhbmVsT3BlbjogXCJlc3JpLXdpa2lwZWRpYV9fcGFuZWwtLW9wZW5cIixcbiAgbG9hZGluZzogXCJlc3JpLXdpa2lwZWRpYV9fcGFuZWwtLWxvYWRpbmdcIixcbiAgdGl0bGU6IFwiZXNyaS13aWtpcGVkaWFfX3RpdGxlXCIsXG4gIHJlZnJlc2g6IFwiZXNyaS13aWtpcGVkaWFfX3JlZnJlc2hcIixcbiAgcmVmcmVzaEljb246IFwiZXNyaS1pY29uLXJlZnJlc2hcIixcbiAgY2xvc2U6IFwiZXNyaS13aWtpcGVkaWFfX2Nsb3NlIGVzcmktaWNvbi1jbG9zZVwiLFxuICBzY3JvbGxlcjogXCJlc3JpLXdpa2lwZWRpYV9fbGlzdC1zY3JvbGxlclwiLFxuXG4gIGxpc3Q6IFwiZXNyaS13aWtpcGVkaWFfX2xpc3RcIixcbiAgbWVzc2FnZTogXCJlc3JpLXdpa2lwZWRpYV9fbWVzc2FnZVwiLFxuICBpdGVtOiBcImVzcmktd2lraXBlZGlhX19yZXN1bHRcIixcbiAgaW1hZ2U6IFwiZXNyaS13aWtpcGVkaWFfX3Jlc3VsdC1pbWFnZVwiLFxuICBub0ltYWdlOiBcImVzcmktd2lraXBlZGlhX19yZXN1bHQtaW1hZ2UtLW5vbmVcIixcbiAgbm9JbWFnZUljb246IFwiZXNyaS13aWtpcGVkaWEtLWRlbnktaWNvbiBlc3JpLWljb24tZGVueVwiLFxuICBoZWFkZXI6IFwiZXNyaS13aWtpcGVkaWFfX2hlYWRlclwiLFxuICBmb290ZXI6IFwiZXNyaS13aWtpcGVkaWFfX2Zvb3RlclwiXG59O1xuXG5jb25zdCBXaWtpV2lkZ2V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvL1xuICAvLyAgTGlmZWN5Y2xlXG4gIC8vXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdm06IG5ldyBXaWtpV2lkZ2V0Vmlld01vZGVsKCksXG4gICAgICByZXN1bHRzOiBbXSxcbiAgICAgIHVwZGF0aW5nOiBmYWxzZVxuICAgIH07XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3OiB7fVxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy52aWV3LnRoZW4odmlldyA9PiB7XG4gICAgICB0aGlzLnN0YXRlLnZtLnZpZXcgPSB2aWV3O1xuXG4gICAgICB0aGlzLl9yZWZyZXNoKCk7XG4gICAgfSk7XG4gIH0sXG4gIFxuICByZW5kZXIoKSB7XG4gICAgbGV0IHBhbmVsQ2xhc3NlcyA9IHRoaXMuc3RhdGUudXBkYXRpbmcgP1xuICAgICAgICAgICAgICAgICAgICAgICBDU1MucGFuZWwgKyBcIiBcIiArIENTUy5sb2FkaW5nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgQ1NTLnBhbmVsO1xuICAgIFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cGFuZWxDbGFzc2VzfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e0NTUy5oZWFkZXJ9PlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9e0NTUy50aXRsZX0+e1wiV2lraXBlZGlhXCJ9PC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDU1Muc2Nyb2xsZXJ9PlxuICAgICAgICAgIDxvbCBjbGFzc05hbWU9e0NTUy5saXN0fT5cbiAgICAgICAgICAgICAge3RoaXMuX2dlbmVyYXRlTGlzdEl0ZW1zKCl9XG4gICAgICAgICAgPC9vbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDU1MuZm9vdGVyfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Q1NTLnJlZnJlc2h9IHRpdGxlPXtcIlJlZnJlc2hcIn0gdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9yZWZyZXNofT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Q1NTLnJlZnJlc2hJY29ufT48L3NwYW4+XG4gICAgICAgICAgICAgICB7XCJSZWZyZXNoXCJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy9cbiAgLy8gIFByaXZhdGUgTWV0aG9kc1xuICAvL1xuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIFxuICBfcmVmcmVzaCgpIHtcbiAgICB0aGlzLl9zaG93TG9hZGluZ1N0YXR1cygpO1xuXG4gICAgdGhpcy5zdGF0ZS52bS5nZXROZWFyYnlJdGVtcygpXG4gICAgICAudGhlbih0aGlzLl91cGRhdGVSZXN1bHRzKVxuICAgICAgLmFsd2F5cyh0aGlzLl9oaWRlTG9hZGluZ1N0YXR1cyk7XG4gIH0sXG5cbiAgX3Nob3dMb2FkaW5nU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVwZGF0aW5nOiB0cnVlXG4gICAgfSk7XG4gIH0sXG5cbiAgX3VwZGF0ZVJlc3VsdHM6IGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHJlc3VsdHM6IHJlc3VsdHNcbiAgICB9KTtcbiAgfSxcblxuICBfaGlkZUxvYWRpbmdTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXBkYXRpbmc6IGZhbHNlXG4gICAgfSk7XG4gIH0sXG5cbiAgX2dlbmVyYXRlTGlzdEl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaXNMb2FkaW5nID0gdGhpcy5zdGF0ZS51cGRhdGluZztcbiAgICBsZXQgbm9SZXN1bHRzID0gdGhpcy5zdGF0ZS5yZXN1bHRzLmxlbmd0aCA9PT0gMDtcbiAgICBsZXQgaXRlbXM7XG5cbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBpdGVtcyA9IChcbiAgICAgICAgPGxpIGNsYXNzTmFtZT17Q1NTLm1lc3NhZ2V9IGtleT17MH0+XG4gICAgICAgICAge1wiRmV0Y2hpbmcgcmVzdWx0cy4uLlwifVxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gdG9kbzogc3luYyBwcm9wZXJseVxuICAgIC8vZWxzZSBpZiAobm9SZXN1bHRzKSB7XG4gICAgLy8gIGl0ZW1zID0gKFxuICAgIC8vICAgIDxsaSBjbGFzc05hbWU9e0NTUy5tZXNzYWdlfT5cbiAgICAvLyAgICAgIHtcIk5vIHJlc3VsdHNcIn1cbiAgICAvLyAgICA8L2xpPlxuICAgIC8vICApO1xuICAgIC8vfVxuICAgIGVsc2Uge1xuICAgICAgaXRlbXMgPSB0aGlzLnN0YXRlLnJlc3VsdHMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGxldCBzdHlsZXMgPSB7fTtcbiAgICAgICAgbGV0IGltYWdlQ2xhc3MgPSBDU1MuaW1hZ2U7XG4gICAgICAgIGxldCBhdHRyaWJzID0gaXRlbS5hdHRyaWJ1dGVzO1xuXG4gICAgICAgIGlmIChhdHRyaWJzLmltYWdlKSB7XG4gICAgICAgICAgc3R5bGVzLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdcIiArIGF0dHJpYnMuaW1hZ2UgKyBcIicpXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaW1hZ2VDbGFzcyArPSBcIiBcIiArIENTUy5pY29uO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtDU1MuaXRlbX0gZGF0YS1pZD17YXR0cmlicy5pZH0gdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2hpZ2hsaWdodEl0ZW0uYmluZCh0aGlzLCBhdHRyaWJzLmlkKX0ga2V5PXtpbmRleH0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ltYWdlQ2xhc3N9IHRpdGxlPXthdHRyaWJzLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlc30+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+e2F0dHJpYnMudGl0bGV9PC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIClcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtcztcbiAgfSxcblxuICBfaGlnaGxpZ2h0SXRlbTogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICB0aGlzLnN0YXRlLnZtLmhpZ2hsaWdodChpbmRleCk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFdpa2lXaWRnZXQ7XG4iXX0=