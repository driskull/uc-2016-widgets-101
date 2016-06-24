define([
  "dojo/_base/lang",
  
  "esri/geometry/Point",
  "esri/geometry/support/mathUtils",
  "esri/geometry/support/webMercatorUtils",
  
  "esri/Graphic",
  "esri/PopupTemplate",
  "esri/request",
  
  "esri/symbols/PictureMarkerSymbol",
  
  "dojo/i18n!../nls/WikiWidget",
  
  "require"
],
function (
  lang,
  Point, mathUtils, webMercatorUtils,
  Graphic, PopupTemplate, esriRequest,
  PictureMarkerSymbol,
  i18n,
  require
) {
  
  var WIKI_QUERY_URL = "//en.wikipedia.org/w/api.php";
  var THUMBNAIL_SIZE = 125;
  
  var MIN_SEARCH_RADIUS_IN_METERS = 10;
  var MAX_SEARCH_RADIUS_IN_METERS = 10000;
  
  var WIKI_ICON_PATH = require.toUrl("../images/wikipedia_32.png");
  var ICON_SIZE = 24;
  var SYMBOL = new PictureMarkerSymbol({
    url: WIKI_ICON_PATH,
    width: ICON_SIZE,
    height: ICON_SIZE
  });
  
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  var wikiHelper = {
    
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    
    findNearbyItems: function(options) {
      if (options.view) {
        options.searchRadius = wikiHelper.getSearchRadius(options.view);
        options.center = options.view.extent.center;
      }
      
      return wikiHelper._findNearbyItems(options)
        .then(function(items) {
          return wikiHelper._getPageInfo({
            geoResponse: items,
            maxResults: options.maxResults
          });
        })
        .then(wikiHelper._toResultItems);
    },
    
    getSearchRadius: function (view) {
      var minSearchRadius = MIN_SEARCH_RADIUS_IN_METERS,
          maxSearchRadius = MAX_SEARCH_RADIUS_IN_METERS,
          extent = view.extent,
          spatialRef = view.spatialReference,
          point1 = new Point(extent.xmin, extent.ymin, spatialRef),
          point2 = new Point(extent.xmax, extent.ymin, spatialRef),
          distance = mathUtils.getLength(point1, point2);
      
      return Math.floor(
        clamp(Math.ceil(distance), minSearchRadius, maxSearchRadius)
      );
    },
    
    addResultGraphics: function (params) {
      var view           = params.view,
          results        = params.results,
          resultGraphics = [];
      
      wikiHelper.clearResultGraphics({
        view: view,
        results: results
      });
  
      console.log("adding");
      results.forEach(function(result) {
        var graphic = wikiHelper._createGraphic(result);
    
        view.graphics.add(graphic);
        resultGraphics.push(graphic);
        console.log("added");
      });
      
      return resultGraphics;
    },
    
    clearResultGraphics: function (params) {
      var view    = params.view,
          results = params.results;
  
      view.graphics.removeMany(results);
      view.popup.visible = false;
    },
    
    highlightGraphic: function (params) {
      var graphic = wikiHelper._findGraphicById({
            id: params.id,
            results: params.results
          }),
          view    = params.view;
  
      view.goTo(graphic.geometry).then(function () {
        view.popup.open({
          features: [graphic],
          updateLocationEnabled: true
        });
      });
    },
    
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    
    _findNearbyItems: function(options) {
      var maxResults   = options.maxResults,
          searchRadius = options.searchRadius,
          center       = webMercatorUtils.webMercatorToGeographic(options.center);
      
      return esriRequest(WIKI_QUERY_URL, {
        callbackParamName: "callback",
        query: {
          action: "query",
          list: "geosearch",
          gslimit: maxResults,
          gsradius: searchRadius,
          gscoord: center.y + "|" + center.x,
          format: "json"
        }
      });
    },
    
    _getPageInfo: function(options) {
      var geoSearch  = lang.getObject("data.query.geosearch", false, options.geoResponse),
          maxResults = options.maxResults,
      
          pageIds    = geoSearch.map(function(result) {
            return result.pageid;
          }).join("|");
  
      return esriRequest(WIKI_QUERY_URL, {
        callbackParamName: "callback",
        query: {
          action: "query",
          pageids: pageIds,
          prop: "pageimages|info",
          piprop: "thumbnail",
          pithumbsize: THUMBNAIL_SIZE,
          pilimit: maxResults,
          inprop: "url",
          format: "json"
        }
      })
        .then(function(pageResponse) {
          return {
            geo: options.geoResponse,
            page: pageResponse
          };
        });
    },
    
    _toResultItems: function(results) {
      var pages     = lang.getObject("page.data.query.pages", false, results),
          geoSearch = lang.getObject("geo.data.query.geosearch", false, results);
  
      return geoSearch.map(function(result) {
        var pageInfo  = pages[result.pageid] || {},
            imagePath = lang.getObject("thumbnail.source", false, pageInfo) || null,
            url       = pageInfo.canonicalurl;
        
        return {
          id: result.pageid,
          title: result.title,
          point: webMercatorUtils.geographicToWebMercator(new Point(result.lon, result.lat)),
          url: url,
          image: imagePath
        };
      });
    },
    
    _createGraphic: function (result) {
      
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
    
    _findGraphicById: function (params) {
      var id      = params.id,
          results = params.results,
          match;
  
      results.some(function(graphic) {
        var found = graphic.attributes.id == id;
        if (found) {
          match = graphic;
        }
        return found;
      });
      
      return match;
    }
    
  };
  
  return wikiHelper;
  
});
