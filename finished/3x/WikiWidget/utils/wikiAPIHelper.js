define([

  "dojo/_base/array",
  "dojo/_base/lang",

  "esri/geometry/Point",
  "esri/geometry/webMercatorUtils",

  "esri/request"

], function (
  array, lang,
  Point, webMercatorUtils,
  esriRequest) {

  var WIKI_QUERY_URL = "//en.wikipedia.org/w/api.php";
  var THUMBNAIL_SIZE = 125;

  var wikiAPIUtil = {

    findNearbyItems: function(options) {
      return wikiAPIUtil._findNearbyItems(options)
        .then(function(items) {
          return wikiAPIUtil._getPageInfo({
            geoResponse: items,
            maxResults: options.maxResults
          });
        })
        .then(wikiAPIUtil._toResultItems);
    },

    _findNearbyItems: function(options) {
      var maxResults = options.maxResults;
      var searchRadius = options.searchRadius;
      var center = webMercatorUtils.webMercatorToGeographic(options.center);

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
      var geoSearch = lang.getObject("query.geosearch", false, options.geoResponse);
      var maxResults = options.maxResults;

      var pageIds = array.map(geoSearch, function(result) {
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
    }

  };

  return wikiAPIUtil;

});
