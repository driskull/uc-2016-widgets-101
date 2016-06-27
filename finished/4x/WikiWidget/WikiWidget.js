define([
  "./WikiWidgetViewModel",

  "dijit/_TemplatedMixin",
  "dijit/a11yclick",

  "dojo/dom-attr",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/on",

  "esri/widgets/Widget",
  "esri/widgets/support/viewModelWiring",

  "dojo/i18n!./nls/WikiWidget",

  "dojo/text!./templates/WikiWidget.html"
], function (
  WikiWidgetViewModel,
  _TemplatedMixin, a11yclick,
  domAttr, domClass, domConstruct, domStyle, on,
  Widget, viewModelWiring,
  i18n,
  templateString
) {

  var CSS = {
    // button
    base: "esri-wikipedia",
    active: "esri-wikipedia--active",
    icon: "esri-icon socicon-wikipedia",

    // panel
    panel: "esri-wikipedia__panel",
    panelOpen: "esri-wikipedia__panel--open",
    loading: "esri-wikipedia__panel--loading",
    title: "esri-wikipedia__title",
    refresh: "esri-wikipedia__refresh",
    refreshIcon: "esri-icon-refresh",
    close: "esri-wikipedia__close esri-icon-close",
    scroller: "esri-wikipedia__list-scroller",

    // list
    list: "esri-wikipedia__list",
    message: "esri-wikipedia__message",
    item: "esri-wikipedia__result",
    image: "esri-wikipedia__result-image",
    noImage: "esri-wikipedia__result-image--none",
    noImageIcon: "esri-wikipedia--deny-icon esri-icon-deny",
    header: "esri-wikipedia__header",
    footer: "esri-wikipedia__footer"
  };

  var WikiWidget = Widget.createSubclass([_TemplatedMixin], {
  
    properties: {
      viewModel: {
        type: WikiWidgetViewModel
      }
    },

    baseClass: CSS.base,

    templateString: templateString,

    declaredClass: "esri.widgets.WikiWidget",

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor: function () {
      this._updateList = this._updateList.bind(this);
      this._showLoadingStatus = this._showLoadingStatus.bind(this);
      this._hideLoadingStatus = this._hideLoadingStatus.bind(this);
      this._openPanel = this._openPanel.bind(this);
      this._toggle = this._toggle.bind(this);
      this._refresh = this._refresh.bind(this);
    },

    postCreate: function () {
      var _self = this;

      this.inherited(arguments);
  
      domConstruct.place(this._panelNode, this.viewModel.view.container);
  
      this.own(
        on(this.domNode, a11yclick, this._toggle),
        on(this._closeNode, a11yclick, this._toggle),
        on(this._resultListNode, on.selector("[data-id]", a11yclick), function () {
          _self.viewModel.highlight(domAttr.get(this, "data-id"));
        }),
        on(this._refreshNode, a11yclick, this._refresh)
      );
    },

    //--------------------------------------------------------------------------
    //
    //  Variables
    //
    //--------------------------------------------------------------------------

    _css: CSS,

    _i18n: i18n,

    _active: false,

    _resultGraphics: null,

    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  active
    //----------------------------------

    //----------------------------------
    //  maxResults
    //----------------------------------

    //----------------------------------
    //  view
    //----------------------------------

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    _toggle: function () {
      // TODO: revisit state usage
      if (this.get("viewModel.state") === "disabled") {
        return;
      }

      this._active = !this._active;

      var active = this._active;
      if (active) {
        this._openPanel();
        this._refresh();
      }
      else {
        this.viewModel.clear();
        this._closePanel();
      }

      domClass.toggle(this.domNode, CSS.active, active);
    },

    _refresh: function() {
      this._showLoadingStatus();

      this.viewModel.getNearbyItems()
        .then(this._updateList)
        .then(this._addResultGraphics)
        .always(this._hideLoadingStatus);
    },

    _showLoadingStatus: function () {
      domClass.add(this._panelNode, CSS.loading);

      domConstruct.create("li", {
        className: CSS.message,
        innerHTML: i18n.fetchingResults
      }, this._resultListNode, "only");
    },

    _hideLoadingStatus: function () {
      domClass.remove(this._panelNode, CSS.loading);
    },

    _openPanel: function () {
      domClass.add(this._panelNode, CSS.panelOpen);
    },

    _closePanel: function () {
      domClass.remove(this._panelNode, CSS.panelOpen);
    },

    _updateList: function (items) {
      var fragment = document.createDocumentFragment();

      if (items.length === 0) {
        domConstruct.create("li", {
          className: CSS.message,
          textContent: i18n.noResults
        }, fragment);
      }
      else {
        items.forEach(function (item) {
          // FIXME item should be data and not Graphic instance
          item = item.attributes;
          
          
          var entry = domConstruct.create("li", {
            tabindex: 0,
            "data-id": item.id,
            className: CSS.item
          }, fragment);

          var image = domConstruct.create("span", {
            title: item.title,
            className: CSS.image
          }, entry);

          var title = domConstruct.create("span", {
            textContent: item.title
          }, entry);

          if (item.image) {
            domStyle.set(image, "background-image", "url(" + item.image + ")");
          }
          else {
            domClass.add(image, CSS.icon);
          }

        }, this);
      }

      domConstruct.place(fragment, this._resultListNode, "only");

      return items;
    }

  });

  return WikiWidget;

});
