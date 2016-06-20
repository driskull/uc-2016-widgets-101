define([
  "./utils/wikiAPIHelper",

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

  "esri/geometry/Point",

  "esri/graphic",
  "esri/InfoTemplate",

  "esri/geometry/mathUtils",

  "esri/symbols/PictureMarkerSymbol",

  "dojo/i18n!./nls/WikiWidget",

  "dojo/text!./templates/WikiWidget.html",

  "require"
], function (
  wikiAPIHelper,
  _TemplatedMixin, _WidgetBase, a11yclick,
  array, lang,
  domAttr, domClass, domConstruct, domStyle, on,
  Point,
  Graphic, InfoTemplate,
  mathUtils,
  PictureMarkerSymbol,
  i18n,
  templateString,
  require
) {

  var WIKI_ICON_PATH = require.toUrl("./images/wikipedia_32.png");

  var MIN_RESULTS = 1;
  var MAX_RESULTS = 10;

  var MIN_SEARCH_RADIUS_IN_METERS = 10;
  var MAX_SEARCH_RADIUS_IN_METERS = 10000;

  var ICON_SIZE = 24;

  var SYMBOL = new PictureMarkerSymbol({
    url: WIKI_ICON_PATH,
    width: ICON_SIZE,
    height: ICON_SIZE
  });

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

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

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
      this._addResultGraphics = lang.hitch(this, this._addResultGraphics);
      this._showLoadingStatus = lang.hitch(this, this._showLoadingStatus);
      this._hideLoadingStatus = lang.hitch(this, this._hideLoadingStatus);
      this._openPanel = lang.hitch(this, this._openPanel);
      this._toggle = lang.hitch(this, this._toggle);

      this._resultGraphics = [];
    },

    postCreate: function () {
      var _self = this;

      this.inherited(arguments);

      domConstruct.place(this._panelNode, this.map.root);

      this.own(
        on(this.domNode, a11yclick, lang.hitch(this, this._toggle)),
        on(this._closeNode, a11yclick, lang.hitch(this, this._toggle)),
        on(this._resultListNode, on.selector("[data-id]", a11yclick), function () {
          var id = domAttr.get(this, "data-id");

          _self._highlightGraphic(_self._findGraphicById(id));
        }),
        on(this._refreshNode, a11yclick, lang.hitch(this, this._fetchAndUpdate))
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
      value = clamp(value, MIN_RESULTS, MAX_RESULTS);

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
        this._clearResultGraphics();
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

    _highlightGraphic: function (graphic) {
      var map        = this.map,
          infoWindow = map.infoWindow;

      map.centerAt(graphic.geometry).then(function () {
        infoWindow.setFeatures([graphic]);
        infoWindow.show(graphic.geometry);
      });
    },

    _fetchAndUpdate: function () {
      this._clearResultGraphics();
      this._showLoadingStatus();

      return wikiAPIHelper.findNearbyItems({
          center: this.map.extent.getCenter(),
          maxResults: this.maxResults,
          searchRadius: this._getRadius()
        })
        .then(this._updateList)
        .then(this._addResultGraphics)
        .always(this._hideLoadingStatus);
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
        array.forEach(items, function (item) {

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
    },

    _addResultGraphics: function (results) {
      this._clearResultGraphics();

      array.forEach(results, function (result) {
        var graphic = this._createGraphic(result);

        this.map.graphics.add(graphic);
        this._resultGraphics.push(graphic);
      }, this);
    },

    _createGraphic: function (result) {
      var content = "<a target=\"_blank\" href=\"${url}\">" + i18n.moreInfo + "</a>",
        infoTemplate = new InfoTemplate("${title}", content);

      return new Graphic(result.point, SYMBOL, result, infoTemplate);
    },

    _clearResultGraphics: function () {
      array.forEach(this._resultGraphics, function (graphic) {
        this.map.graphics.remove(graphic);
      }, this);

      this._resultGraphics.length = 0;
      if (this.map.infoWindow) {
        this.map.infoWindow.hide();
      }
    },

    _getRadius: function() {
      var minSearchRadius = MIN_SEARCH_RADIUS_IN_METERS,
          maxSearchRadius = MAX_SEARCH_RADIUS_IN_METERS,
          map             = this.map,
          extent          = map.extent,
          spatialRef      = map.spatialReference,
          point1          = new Point(extent.xmin, extent.ymin, spatialRef),
          point2          = new Point(extent.xmax, extent.ymin, spatialRef),
          distance        = mathUtils.getLength(point1, point2);

      return Math.floor(
        clamp(Math.ceil(distance), minSearchRadius, maxSearchRadius)
      );
    },

    _findGraphicById: function (id) {
      var match;

      array.some(this._resultGraphics, function (graphic) {
        var found = graphic.attributes.id == id;
        if (found) {
          match = graphic;
        }
        return found;
      });

      return match;
    }

  });

  return WikiWidget;

});
