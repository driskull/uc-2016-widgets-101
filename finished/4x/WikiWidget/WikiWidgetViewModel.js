define([
  "demo/common/wikiAPIHelper",

  "dojo/_base/lang",

  "esri/core/Accessor",

  "esri/geometry/Point",
  "esri/geometry/support/mathUtils",

  "esri/Graphic",

  "esri/PopupTemplate",

  "esri/symbols/PictureMarkerSymbol",

  "dojo/i18n!./nls/WikiWidget",

  "require"
],
function(
  wikiAPIHelper,
  lang,
  Accessor,
  Point, mathUtils, Graphic,
  PopupTemplate,
  PictureMarkerSymbol,
  i18n,
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

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  var STATES = {
    disabled: "disabled",
    ready: "ready"
  }

  var WikiWidgetViewModel = Accessor.createSubclass({

    classMetadata: {
      properties: {
        results: {
          readOnly: true
        },
        state: {
          readOnly: true
        }
      }
    },

    declaredClass: "esri.widgets.WikiWidgetViewModel",

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor: function() {
      this._fetchAndUpdate = this._fetchAndUpdate.bind(this);

      this._resultGraphics = [];
    },

    getDefaults: function() {
      return lang.mixin(this.inherited(arguments), {
        maxResults: MAX_RESULTS
      });
    },

    //--------------------------------------------------------------------------
    //
    //  Variables
    //
    //--------------------------------------------------------------------------

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

    //----------------------------------
    //  maxResults
    //----------------------------------

    maxResults: null,

    _maxResultsSetter: function(value) {
      value = clamp(value, MIN_RESULTS, MAX_RESULTS);

      this._set("maxResults", value);
    },

    //----------------------------------
    //  results
    //----------------------------------

    results: null,

    //----------------------------------
    //  state
    //----------------------------------

    state: STATES.disabled,

    _stateGetter: function() {
      return this.get("view.ready") ? STATES.ready : STATES.disabled;
    },

    //----------------------------------
    //  view
    //----------------------------------

    view: null,

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    getNearbyItems: function() {
      return this._fetchAndUpdate();
    },

    clear: function() {
      this._set("results", []);
      return this._clearResultGraphics();
    },

    highlight: function(id) {
      this._highlightGraphic(this._findGraphicById(id));
    },

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    _highlightGraphic: function(graphic) {
      var view = this.view;

      view.goTo(graphic.geometry).then(function () {
        view.popup.open({
          features: [graphic],
          updateLocationEnabled: true
        });
      });
    },

    _fetchAndUpdate: function() {
      this._clearResultGraphics();

      return wikiAPIHelper.findNearbyItems({
          center: this.view.extent.center,
          maxResults: this.maxResults,
          searchRadius: this._getRadius()
        })
        .then(function(results) {
          this._addResultGraphics(results);
          this._set("results", results);
          return results;
        }.bind(this));
    },

    _addResultGraphics: function(results) {
      this._clearResultGraphics();

      results.forEach(function(result) {
        var graphic = this._createGraphic(result);

        this.view.graphics.add(graphic);
        this._resultGraphics.push(graphic);
      }, this);
    },

    _createGraphic: function(result) {

      // remove Point from attributes – PopupRenderer bug (cloning Accessor instance breaks)
      var pointLessAttributes = lang.mixin({}, result);
      delete pointLessAttributes.point;

      return new Graphic({
        geometry: result.point,
        symbol: SYMBOL,
        attributes: pointLessAttributes,
        popupTemplate: new PopupTemplate({
          title: "{title}",
          content: "<a target=\"_blank\" href=\"{url}\">" + i18n.moreInfo + "</a>"
        })
      });
    },

    _clearResultGraphics: function() {
      this.view.graphics.removeMany(this._resultGraphics);

      this._resultGraphics.length = 0;
      this.view.popup.visible = false;
    },

    _getRadius: function() {
      var minSearchRadius = MIN_SEARCH_RADIUS_IN_METERS,
          maxSearchRadius = MAX_SEARCH_RADIUS_IN_METERS,
          view             = this.view,
          extent          = view.extent,
          spatialRef      = view.spatialReference,
          point1          = new Point(extent.xmin, extent.ymin, spatialRef),
          point2          = new Point(extent.xmax, extent.ymin, spatialRef),
          distance        = mathUtils.getLength(point1, point2);

      return Math.floor(
        clamp(Math.ceil(distance), minSearchRadius, maxSearchRadius)
      );
    },

    _findGraphicById: function(id) {
      var match;

      this._resultGraphics.some(function(graphic) {
        var found = graphic.attributes.id == id;
        if (found) {
          match = graphic;
        }
        return found;
      });

      return match;
    }

  });

  return WikiWidgetViewModel;

});
