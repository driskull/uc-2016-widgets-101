define([
  "./support/wikiHelper",

  "dijit/_TemplatedMixin",
  "dijit/_WidgetBase",
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
  wikiHelper,
  _TemplatedMixin, _WidgetBase, a11yclick,
  array, lang,
  domAttr, domClass, domConstruct, domStyle, on,
  i18n,
  templateString
) {

  var MIN_RESULTS = 1;
  var MAX_RESULTS = 10;

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
    header: "esri-wikipedia__header",
    footer: "esri-wikipedia__footer"
  };

  var WikiWidget = _WidgetBase.createSubclass([_TemplatedMixin], {

    baseClass: CSS.base,

    templateString: templateString,

    declaredClass: "esri.dijit.WikiWidget",

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor: function () {
      this._fetchAndUpdate = lang.hitch(this, this._fetchAndUpdate);
      this._updateList = lang.hitch(this, this._updateList);
      this._showLoadingStatus = lang.hitch(this, this._showLoadingStatus);
      this._hideLoadingStatus = lang.hitch(this, this._hideLoadingStatus);
      this._openPanel = lang.hitch(this, this._openPanel);
      this._toggle = lang.hitch(this, this._toggle);

      this._resultGraphics = [];
    },

    postCreate: function () {
      var self = this;

      this.inherited(arguments);

      domConstruct.place(this._panelNode, this.map.root);

      this.own(
        on(this.domNode, a11yclick, this._toggle),
        on(this._closeNode, a11yclick, this._toggle),
        on(this._resultListNode, on.selector("[data-id]", a11yclick), function () {
          var id = domAttr.get(this, "data-id");
  
          wikiHelper.highlightGraphic({
            id: id,
            map: self.map,
            results: self._resultGraphics
          });
        }),
        on(this._refreshNode, a11yclick, this._fetchAndUpdate)
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

    /**
     * @readonly
     */
    active: null,

    _getActiveAttr: function () {
      return this._active;
    },

    //----------------------------------
    //  map
    //----------------------------------

    map: null,

    //----------------------------------
    //  maxResults
    //----------------------------------

    maxResults: MAX_RESULTS,

    _setMaxResultsAttr: function (value) {
      value = value > MAX_RESULTS ? MAX_RESULTS :
              value < MIN_RESULTS ? MIN_RESULTS :
              value;

      this._set("maxResults", value);
    },

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    _toggle: function () {
      this._active = !this._active;

      if (this._active) {
        this._openPanel();
        this._fetchAndUpdate();
      }
      else {
        wikiHelper.clearResultGraphics({
          map: this.map,
          results: this._resultGraphics
        });
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

    _fetchAndUpdate: function () {
      var self = this,
          map  = this.map;
      
      wikiHelper.clearResultGraphics({
        map: map,
        results: this._resultGraphics
      });
      
      this._showLoadingStatus();

      return wikiHelper.findNearbyItems({
          map: map,
          maxResults: this.maxResults
        })
        .then(this._updateList)
        .then(function(results) {
          self._resultGraphics = wikiHelper.addResultGraphics({
            map: map,
            results: results
          });
        })
        .always(this._hideLoadingStatus);
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

        }, this);
      }

      domConstruct.place(fragment, this._resultListNode, "only");

      return items;
    }

  });

  return WikiWidget;

});
