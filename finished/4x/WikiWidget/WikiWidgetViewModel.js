define([
  "./support/wikiHelper",
  
  "dojo/_base/lang",
  
  "esri/core/Accessor"
],
function(
  wikiHelper,
  lang,
  Accessor
) {
  
  var MIN_RESULTS = 1;
  var MAX_RESULTS = 10;
  
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  var WikiWidgetViewModel = Accessor.createSubclass({
    
    properties: {
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
    //  Properties
    //
    //--------------------------------------------------------------------------
    
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
          var resultGraphics = wikiHelper.addResultGraphics({
            view: this.view,
            results: results
          });
          this._set("results", resultGraphics);
          return results;
        }.bind(this));
    }
    
  });
  
  return WikiWidgetViewModel;
  
});
