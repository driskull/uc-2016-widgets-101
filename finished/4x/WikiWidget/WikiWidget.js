define([
  "./WikiWidgetViewModel",
  
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/a11yclick",

  "dojo/_base/array",
  "dojo/_base/lang",

  "dojo/dom-attr",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/on",

  "dojo/i18n!./nls/WikiWidget",

  "dojo/text!./templates/WikiWidget.html"
], function (
  WikiWidgetViewModel,
  _WidgetBase,
  _TemplatedMixin, a11yclick,
  array, lang,
  domAttr, domClass, domConstruct, domStyle, on,
  i18n,
  templateString
) {

  var CSS = {
    base: "esri-wikipedia",
    active: "esri-wikipedia--active",
    
    // button
    button: "esri-wikipedia-button socicon-wikipedia",

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
    header: "esri-wikipedia__header",
    footer: "esri-wikipedia__footer"
  };

  return _WidgetBase.createSubclass([_TemplatedMixin], {

    baseClass: CSS.base,

    templateString: templateString,

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor: function(params) {
      this.viewModel = new WikiWidgetViewModel(params);
    },
    
    postCreate: function () {
      var self = this;
  
      this.inherited(arguments);

      domConstruct.place(this._panelNode, this.viewModel.view.container);

      this.own(
        on(this._buttonNode, a11yclick, lang.hitch(this, this._toggle)),
        on(this._closeNode, a11yclick, lang.hitch(this, this._toggle)),
        on(this._resultListNode, on.selector("[data-id]", a11yclick), function () {
          var id = domAttr.get(this, "data-id");
  
          self.viewModel.highlight(id);
        }),
        on(this._refreshNode, a11yclick, lang.hitch(this, this._refresh))
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

    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    
    //----------------------------------
    //  viewModel
    //----------------------------------

    viewModel: null,

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    _toggle: function () {
      this._active = !this._active;

      if (this._active) {
        this._openPanel();
        this._refresh();
      }
      else {
        this.viewModel.clear();
        this._closePanel();
      }

      domClass.toggle(this.domNode, CSS.active, this._active);
    },

    _openPanel: function () {
      domClass.add(this._panelNode, CSS.panelOpen);
    },

    _closePanel: function () {
      domClass.remove(this._panelNode, CSS.panelOpen);
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
    
    _refresh: function() {
      this._showLoadingStatus();
  
      this.viewModel.getNearbyItems()
        .then(lang.hitch(this, this._updateList))
        .always(lang.hitch(this, this._hideLoadingStatus));
    },

    _updateList: function (items) {
      var fragment = document.createDocumentFragment(),
          entry, image, title;

      if (items.length === 0) {
        domConstruct.create("li", {
          className: CSS.message,
          textContent: i18n.noResults
        }, fragment);
      }
      else {
        array.forEach(items, function (item) {
          entry = domConstruct.create("li", {
            tabindex: 0,
            role: "menuitem",
            "data-id": item.id,
            className: CSS.item
          }, fragment);
  
          image = domConstruct.create("span", {
            title: item.title,
            className: CSS.image
          }, entry);
  
          title = domConstruct.create("span", {
            textContent: item.title
          }, entry);

          if (item.image) {
            domStyle.set(image, "background-image", "url(" + item.image + ")");
          }
          else {
            domClass.add(image, CSS.icon);
          }

        });
      }

      domConstruct.place(fragment, this._resultListNode, "only");

      return items;
    }

  });

});
