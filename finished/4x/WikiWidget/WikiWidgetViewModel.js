define([
  "./support/wikiHelper",

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
  wikiHelper,
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
  
    properties: {
      active: {},
      maxResults: {},
      results: {
        readOnly: true
      },
      state: {
        readOnly: true,
        dependsOn: ["view.ready"]
      },
      view: {}
    },

    declaredClass: "esri.widgets.WikiWidgetViewModel",

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor: function() {
      this._fetchAndUpdate = this._fetchAndUpdate.bind(this);
    },

    getDefaults: function() {
      return lang.mixin(this.inherited(arguments), {
        maxResults: MAX_RESULTS,
        results: []
      });
    },

    //--------------------------------------------------------------------------
    //
    //  Variables
    //
    //--------------------------------------------------------------------------
    
    _active: false,

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
      wikiHelper.clearResultGraphics({
        view: this.view,
        results: this.results
      });
      this._set("results", []);
    },

    highlight: function(id) {
      wikiHelper.highlightGraphic({
        id: id,
        view: this.view,
        results: this.results
      });
    },

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    _fetchAndUpdate: function() {
      wikiHelper.clearResultGraphics({
        view: this.view,
        results: this.results
      });

      return wikiHelper.findNearbyItems({
          view: this.view,
          maxResults: this.maxResults
        })
        .then(function(results) {
          // FIXME
          results = wikiHelper.addResultGraphics({
            view: this.view,
            results: results
          });
          this._set("results", results);
          return results;
        }.bind(this));
    }

  });

  return WikiWidgetViewModel;

});
