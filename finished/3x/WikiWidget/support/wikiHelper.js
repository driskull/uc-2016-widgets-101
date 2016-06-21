define([
  "dojo/_base/array",
  "dojo/_base/lang",

  "esri/geometry/mathUtils",
  "esri/geometry/Point",
  "esri/geometry/webMercatorUtils",

  "esri/graphic",
  "esri/InfoTemplate",
  "esri/request",

  "esri/symbols/PictureMarkerSymbol",

  "dojo/i18n!../nls/WikiWidget",

  "require"
],
function (
  array, lang,
  mathUtils, Point, webMercatorUtils,
  Graphic, InfoTemplate, esriRequest,
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
      if (options.map) {
        options.searchRadius = wikiHelper.getSearchRadius(options.map);
        options.center = options.map.extent.getCenter();
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
    
    getSearchRadius: function (map) {
      var minSearchRadius = MIN_SEARCH_RADIUS_IN_METERS,
          maxSearchRadius = MAX_SEARCH_RADIUS_IN_METERS,
          extent = map.extent,
          spatialRef = map.spatialReference,
          point1 = new Point(extent.xmin, extent.ymin, spatialRef),
          point2 = new Point(extent.xmax, extent.ymin, spatialRef),
          distance = mathUtils.getLength(point1, point2);
      
      return Math.floor(
        clamp(Math.ceil(distance), minSearchRadius, maxSearchRadius)
      );
    },
  
    addResultGraphics: function (params) {
      var map     = params.map,
          results = params.results,
          resultGraphics = [];
    
      wikiHelper.clearResultGraphics({
        map: map,
        results: results
      });
    
      array.forEach(results, function (result) {
        var graphic = wikiHelper._createGraphic(result);
        
        map.graphics.add(graphic);
        resultGraphics.push(graphic);
      });
  
      return resultGraphics;
    },
  
    clearResultGraphics: function (params) {
      var map     = params.map,
          results = params.results;
    
      array.forEach(results, function (graphic) {
        map.graphics.remove(graphic);
      });
    
      if (map.infoWindow) {
        map.infoWindow.hide();
      }
    },
  
    highlightGraphic: function (params) {
      var graphic    = wikiHelper._findGraphicById({
            id: params.id,
            results: params.results
          }),
          map        = params.map,
          infoWindow = map.infoWindow;
    
      map.centerAt(graphic.geometry).then(function () {
        infoWindow.setFeatures([graphic]);
        infoWindow.show(graphic.geometry);
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
      
      return esriRequest({
        url: WIKI_QUERY_URL,
        callbackParamName: "callback",
        content: {
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
      var geoSearch  = lang.getObject("query.geosearch", false, options.geoResponse),
          maxResults = options.maxResults,
  
          pageIds    = array.map(geoSearch, function(result) {
            return result.pageid;
          }).join("|");
      
      return esriRequest({
        url: WIKI_QUERY_URL,
        callbackParamName: "callback",
        content: {
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
      var pages     = lang.getObject("page.query.pages", false, results),
          geoSearch = results.geo.query.geosearch;
      
      return array.map(geoSearch, function(result) {
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
      var content = "<a target=\"_blank\" href=\"${url}\">" + i18n.moreInfo + "</a>",
          infoTemplate = new InfoTemplate("${title}", content);
  
      return new Graphic(result.point, SYMBOL, result, infoTemplate);
    },
  
    _findGraphicById: function (params) {
      var id = params.id,
          results = params.results,
          match;
    
      array.some(results, function (graphic) {
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
