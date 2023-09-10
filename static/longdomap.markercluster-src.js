var lmc =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Cluster.js":
/*!************************!*\
  !*** ./src/Cluster.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Icon */ "./src/Icon.js");
/* harmony import */ var _LLBBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LLBBox */ "./src/LLBBox.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var longdo = window.longdo;
/**
 * class for cluster
 * @export Cluster
 * @class Cluster
 */

var _default = /*#__PURE__*/function () {
  /**
   * Creates an isntance of Cluster
   * @param {MarkerCluster} markerCluster MarkerCluster instance
   * @param {ConfigHandler} config config variables
   * @param {IconLoader} iloader IconLoader instance
   */
  function _default(markerCluster, config, iloader) {
    _classCallCheck(this, _default);

    this._markerCluster = markerCluster;
    this._config = config;
    this._map = markerCluster._map;
    this._center = null;
    this._markers = [];
    this._bounds = null;
    this._clusterIcon = new _Icon__WEBPACK_IMPORTED_MODULE_0__["ClusterIcon"](this, this._config, iloader);
  }
  /**
   * add marker to the cluster
   * @param {longdo.Marker} marker marker to be added
   * @param {longdo.Tile} [tile] tile including marker(optional), needed only in swarm mode 1.
   * @returns {undefined}
   */


  _createClass(_default, [{
    key: "addMarker",
    value: function addMarker(marker, tile) {
      if (!this._center) {
        this._center = marker.location();

        this._calculateBounds();
      } else {
        if (this._config.averageCenter) {
          this._center = longdo.Util.averageLocation(longdo.Projections.EPSG3857, this._center, marker.location());

          this._calculateBounds();
        }
      }

      marker.isAdded = true;

      this._markers.push(marker);

      if (this._config.drawMarkerArea) {
        this._bounds.drawArea(this._map);
      }

      if (this._config.swarmModeEnabled && this._config.swarmAlg === 1) {
        if (!this._gridids) {
          this._gridids = [];
        }

        this._gridids.push(_LLBBox__WEBPACK_IMPORTED_MODULE_1__["LLBBox"].generateFrom(longdo.Util.boundOfTile(longdo.Projections.EPSG3857, tile)).getNxNGridCord(marker.location(), this._config.swarmGridSize));
      }

      return true;
    }
    /**
     * remove icon & itself
     * @returns {undefined}
     */

  }, {
    key: "remove",
    value: function remove() {
      this._clusterIcon.remove();

      this._markers.length = 0;
      delete this._markers;

      this._bounds.removeArea(this._map);
    }
    /**
     * calculate cluster bound
     * @returns {undefined}
     */

  }, {
    key: "_calculateBounds",
    value: function _calculateBounds() {
      this._bounds = _LLBBox__WEBPACK_IMPORTED_MODULE_1__["LLBBox"].generateRect(this._center).extendSize(this._config.gridSize * Math.pow(2, -this._map.zoom()));
    }
    /**
     * returns whether marker is inside cluster bounds
     * @param {longdo.Marker} marker marker to be checked
     * @returns {boolean} If marker is inside cluster bound, returns true
     */

  }, {
    key: "isMarkerInClusterBounds",
    value: function isMarkerInClusterBounds(marker) {
      return this._bounds.isLocInBounds(marker.location());
    }
  }, {
    key: "isMarkerInClusterBoundsAtZoom",
    value: function isMarkerInClusterBoundsAtZoom(marker, zoom) {
      this._bounds = _LLBBox__WEBPACK_IMPORTED_MODULE_1__["LLBBox"].generateRect(this._center).extendSize(this._config.gridSize * Math.pow(2, -zoom));
      return this._bounds.isLocInBounds(marker.location());
    }
    /**
     * update icon's style and position and then show on map
     * @returns {undefined}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this._clusterIcon.setSums(this._markers.length);

      this._clusterIcon.setCenter(this._center);

      this._clusterIcon.show();
    }
  }]);

  return _default;
}();



/***/ }),

/***/ "./src/ConfigHandler.js":
/*!******************************!*\
  !*** ./src/ConfigHandler.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class for carrying config/option values
 * @export ConfigHandler
 * @class ConfigHandler
 */
var _default = function _default(options) {
  _classCallCheck(this, _default);

  this.maxZoom = options.maxZoom || null;
  this.minClusterSize = options.minClusterSize || 2;
  this.textColor = options.textColor || 'black';
  this.customOuterClusterCSS = options.customOuterClusterCSS || {};
  this.customInnerClusterCSS = options.customInnerClusterCSS || {};
  this.customTextClusterCSS = options.customTextClusterCSS || {};
  this.gridSize = options.gridSize || 120;
  this.clusterRadius = options.clusterRadius || this.gridSize;
  this.averageCenter = options.averageCenter;
  this.drawMarkerArea = options.drawMarkerArea;
  this.swarmModeEnabled = options.swarmModeEnabled;
  this.swarmAlg = options.swarmAlg ? parseInt(options.swarmAlg, 10) : null;
  this.styles = options.styles || null;
  this.onClickCenter = options.onClickCenter || false;
  this.swarmGridLength = options.swarmGridLength ? parseInt(options.swarmGridLength, 10) : null;
  this.swarmMarkersMaxLimit = options.swarmMarkersMaxLimit ? parseInt(options.swarmMarkersMaxLimit, 10) : null;
  this.swarmMarkersAmountAdjust = options.swarmMarkersAmountAdjust;
  this.swarmMarkersMaxAmountPerTile = options.swarmMarkersMaxAmountPerTile ? parseInt(options.swarmMarkersMaxAmountPerTile, 10) : null;
  this.swarmMarkersConstPerGrid = options.swarmMarkersConstPerGrid ? parseInt(options.swarmMarkersConstPerGrid, 10) : null;
};



/***/ }),

/***/ "./src/Icon.js":
/*!*********************!*\
  !*** ./src/Icon.js ***!
  \*********************/
/*! exports provided: ClusterIcon, IconLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClusterIcon", function() { return ClusterIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconLoader", function() { return IconLoader; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @module Icon */
var longdo = window.longdo;
/**
 * Class for managing cluster's icon & children markers' icons
 * @export ClusterIcon
 * @class ClusterIcon
 */

var ClusterIcon = /*#__PURE__*/function () {
  /**
   *Creates an instance of ClusterIcon.
   * @param {Cluster} cluster cluster in charge of this
   * @param {ConfigHandler} config config variables
   * @param {IconLoader} iloader cluster icon carrier
   * @memberof ClusterIcon
   */
  function ClusterIcon(cluster, config, iloader) {
    _classCallCheck(this, ClusterIcon);

    this._cluster = cluster;
    this._config = config;
    this._iloader = iloader;
    this._center = null;
    this._map = cluster._map;
    this._sums = null;
    this._clusterMarker = new longdo.Marker({
      "lat": 0,
      "lon": 0
    }, {
      "icon": this._cluster._markerCluster._iloader.getIcon(0),
      "weight": longdo.OverlayWeight.Top
    });
  }
  /**
   * show cluster icons & marker icons if needed
   * @returns {undefined}
   * @memberof ClusterIcon
   */


  _createClass(ClusterIcon, [{
    key: "show",
    value: function show() {
      var len = this._cluster._markers.length;

      if (!this._config.swarmModeEnabled) {
        var pos = this._center;

        if (this._cluster._markers.length < this._config.minClusterSize) {
          var marker = this._cluster._markers[0];

          if (!marker.active()) {
            this._map.Overlays.add(marker);
          }

          return;
        }

        var zoom = this._map.zoom();

        var mz = this._config.maxZoom;

        if (mz && zoom > mz || zoom === 20) {
          while (len--) {
            var _marker = this._cluster._markers[len];

            if (!_marker.active()) {
              this._cluster._map.Overlays.add(_marker);
            }
          }

          return;
        }

        if (this._clusterMarker.active()) {
          this._map.Overlays.move(this._clusterMarker, pos);
        } else {
          this._clusterMarker.setLocation(pos);

          this._map.Overlays.add(this._clusterMarker);

          var targetmarker = this._cluster._markers;

          for (var index = 0; index < targetmarker.length; index++) {
            var element = targetmarker[index];

            this._map.Overlays.remove(element);
          }

          if (this._poly) {
            this._map.Overlays.remove(this._poly);
          }

          if (this._config.drawMarkerArea) {
            this._poly = new longdo.Polygon(this._cluster._bounds.getRectVertex(), {
              "fillColor": "rgba(0,0,0,0.3)"
            });

            this._map.Overlays.add(this._poly);
          }
        }
      } else if (this._config.swarmAlg === 1) {
        //TODO
        var amounts = new Array(this._config.swarmGridLength * this._config.swarmGridLength).fill(0);
        var sum = 0;

        while (len--) {
          if (sum >= this._config.swarmMarkersMaxAmountPerTile) {
            break;
          }

          var m = this._cluster._markers[len];
          var tile = this._cluster._gridids[len];
          var idx = tile.u * this._config.swarmGridLength + tile.v;

          if (amounts[idx] % this._config.swarmMarkersConstPerGrid === 0) {
            if (!m.active()) {
              this._map.Overlays.add(m);
            }

            sum++;
          }

          amounts[idx]++;
        }
      } else if (this._config.swarmAlg === 2) {
        this._calculateMarkersDispAmount();

        var amount = 0;

        while (len--) {
          if (amount > this._config.swarmMarkersMaxLimit) {
            break;
          }

          var _m = this._cluster._markers[len];

          if (this.swarmAlg2Decider(amount, this._cluster._markers.length - len - 1)) {
            if (!_m.active()) {
              this._map.Overlays.add(_m);
            }

            amount++;
          }
        }

        return;
      }
    }
  }, {
    key: "_calculateMarkersDispAmount",
    value: function _calculateMarkersDispAmount() {
      var modsig = function modsig(n, inmax, outmax) {
        if (n === 0) {
          return 0;
        }

        var z = n / inmax * 49 - 13;
        var result = Math.round(outmax * (1 / (1 + Math.exp(-z))));
        return result === 0 ? 1 : result;
      };

      this._maxDispAmount = modsig(this._cluster._markers.length, this._cluster._markerCluster._maxClusterSize, this._config.swarmMarkersMaxLimit);
    }
  }, {
    key: "swarmAlg2Decider",
    value: function swarmAlg2Decider(amount, num) {
      if (this._config.swarmMarkersAmountAdjust) {
        return this._maxDispAmount > amount;
      }

      return amount <= 5 || num % 10 === 0;
    }
    /**
     * remove cluster icon from the map
     * @memberof ClusterIcon
     * @returns {undefined}
     */

  }, {
    key: "remove",
    value: function remove() {
      this._map.Overlays.remove(this._clusterMarker);

      if (this._poly) {
        this._map.Overlays.remove(this._poly);

        this._poly = null;
      }
    }
    /**
     * set position where cluster icon will be rendered
     * @param {longdo.Location} center position for cluster icon to be rendered
     * @memberof ClusterIcon
     * @returns {undefined}
     */

  }, {
    key: "setCenter",
    value: function setCenter(center) {
      this._center = center;
    }
    /**
     * set number displaying in cluster
     * @param {number} sums numbers to change to
     * @returns {undefined}
     * @memberof ClusterIcon
     */

  }, {
    key: "setSums",
    value: function setSums(sums) {
      if (this._sums && sums === this._sums) {
        return;
      }

      this._sums = sums;

      if (this._clusterMarker && this._clusterMarker.element()) {
        this._iloader.changeNumber(this._clusterMarker.element(), this._sums);
      }
    }
  }]);

  return ClusterIcon;
}();
/**
 * class for loading cluser icons & carrying them
 * @export IconLoader
 * @class IconLoader
 */

var IconLoader = /*#__PURE__*/function () {
  /**
   *Creates an instance of IconLoader.
   * @param {MarkerCluster} markercluster MarkerCluster instance
   * @param {ConfigHandler} config config variables
   * @memberof IconLoader
   */
  function IconLoader(markercluster, config) {
    _classCallCheck(this, IconLoader);

    this._markerCluster = markercluster;
    this._config = config;
    this._images = new Map();
    this.ready = true;
    this.useDefault = true;

    if (this._config.styles) {
      this.loadStyles(this._config.styles);
    }
  }
  /**
   * load style of icons
   * @param {string} url url of icon image
   * @param {number} width width of the image
   * @param {number} height height of the image
   * @param {number} minThreshold minimum threshold of size of cluster
   * @param {Function} [callback] callback function to be called on finishing loading
   * @returns {number} index of loaded style
   * @memberof IconLoader
   */


  _createClass(IconLoader, [{
    key: "load",
    value: function load(url, width, height, minThreshold, callback) {
      this.ready = false;
      this.useDefault = false;
      var img = new Image(width, height);

      this._images.set(img, {
        "ready": false,
        "minThreshold": minThreshold
      });

      var that = this;

      img.onload = function () {
        that._images.get(img).ready = true;

        if (_toConsumableArray(that._images.values()).every(function (elm) {
          return elm.ready;
        })) {
          that.ready = true;

          that._markerCluster.resetViewport();

          that._markerCluster._createClusters();
        }

        if (callback) {
          callback();
        }
      };

      img.src = url;
      return this._images.keys.length - 1;
    }
    /**
     * load styles config value
     * @param {Array<Object>} styles styles to be loaded
     * @memberof IconLoader
     * @returns {undefined}
     */

  }, {
    key: "loadStyles",
    value: function loadStyles(styles) {
      styles.sort(function (elm1, elm2) {
        return elm1.minThreshold < elm2.minThreshold ? 1 : elm1.minThreshold === elm2.minThreshold ? 0 : -1;
      });
      var len = styles.length;
      var that = this;

      while (len--) {
        var style = styles[len];
        this.load(style.url, style.width, style.height, style.minThreshold, len === 0 ? function () {
          return that.ready = true;
        } : null);
      }
    }
    /**
     * returns icon config object according to longdo Marker icon syntax
     * @param {number} index index number to get icon style
     * @returns {Object} icon config values object 
     * @memberof IconLoader
     */

  }, {
    key: "getIcon",
    value: function getIcon(index) {
      var result = {
        "offset": {
          "x": 0,
          "y": 0
        }
      };

      if (this.useDefault || typeof index === 'undefined') {
        var elm = document.createElement("div");
        var elm2 = document.createElement('div');
        var elm3 = document.createElement('span');
        elm.appendChild(elm2);
        elm2.appendChild(elm3);
        elm.style.width = '44px';
        elm.style.height = '44px';
        elm.style.marginLeft = '-22px';
        elm.style.marginTop = '-22px';
        elm.style.overflow = 'hidden';
        elm.style.color = "".concat(this._config.textColor);
        elm.className = 'marker-cluster marker-cluster-small leaflet-marker-icon';

        if (this._config.customOuterClusterCSS) {
          for (var key in this._config.customOuterClusterCSS) {
            if (Object.hasOwnProperty.call(this._config.customOuterClusterCSS, key)) {
              var styleOuterClusterObj = this._config.customOuterClusterCSS[key];
              elm.style[key] = styleOuterClusterObj;
            }
          }
        }

        if (this._config.customInnerClusterCSS) {
          for (var _key in this._config.customInnerClusterCSS) {
            if (Object.hasOwnProperty.call(this._config.customInnerClusterCSS, _key)) {
              var styleInnerClusterObj = this._config.customInnerClusterCSS[_key];
              elm2.style[_key] = styleInnerClusterObj;
            }
          }
        }

        if (this._config.customTextClusterCSS) {
          for (var _key2 in this._config.customTextClusterCSS) {
            if (Object.hasOwnProperty.call(this._config.customTextClusterCSS, _key2)) {
              var styleTextObj = this._config.customTextClusterCSS[_key2];
              elm3.style[_key2] = styleTextObj;
            }
          }
        }

        result.html = elm.outerHTML;
        result.size = {
          "width": 44,
          "height": 44
        };
      } else {
        var img = _toConsumableArray(this._images.keys())[index];

        var _elm = document.createElement("div");

        _elm.style.width = "".concat(img.width, "px");
        _elm.style.height = "".concat(img.height, "px");
        _elm.style.marginLeft = "-".concat(img.width / 2, "px");
        _elm.style.marginTop = "-".concat(img.height / 2, "px");
        _elm.style.background = "url('".concat(encodeURI(img.src), "') no-repeat center top");
        _elm.style.lineHeight = _elm.style.height;
        _elm.style.color = "".concat(this._config.textColor);
        _elm.style.fontWeight = 'bold';
        _elm.style.textAlign = 'center';

        if (this._config.customTextClusterCSS) {
          for (var _key3 in this._config.customTextClusterCSS) {
            if (Object.hasOwnProperty.call(this._config.customTextClusterCSS, _key3)) {
              var _styleTextObj = this._config.customTextClusterCSS[_key3];
              _elm.style[_key3] = _styleTextObj;
            }
          }
        }

        result.html = _elm.outerHTML;
        result.size = {
          "width": img.width,
          "height": img.height
        };
      }

      return result;
    }
    /**
     * change displaying number in cluster
     * @param {HTMLElement} element element of cluster needing to be made changes
     * @param {number} num number to change to 
     * @memberof IconLoader
     * @returns {undefined}
     */

  }, {
    key: "changeNumber",
    value: function changeNumber(element, num) {
      if (this.useDefault) {
        element.children[0].children[0].children[0].innerText = "".concat(num.toLocaleString());

        if (num < 10) {
          element.children[0].className = 'marker-cluster marker-cluster-small';
        } else if (num < 100) {
          element.children[0].className = 'marker-cluster marker-cluster-medium';
        } else {
          element.children[0].className = 'marker-cluster marker-cluster-large';
        }
      } else {
        element.children[0].innerText = "".concat(num.toLocaleString());

        var list = _toConsumableArray(this._images.keys());

        var len = list.length;

        while (len--) {
          var img = list[len];

          if (num >= this._images.get(img).minThreshold) {
            var elm = element;
            elm.style.width = "".concat(img.width, "px");
            elm.style.height = "".concat(img.height, "px");
            elm = elm.children[0];
            elm.style.background = "url('".concat(encodeURI(img.src), "') no-repeat center top");
            elm.style.width = "".concat(img.width, "px");
            elm.style.height = "".concat(img.height, "px");
            elm.style.lineHeight = elm.style.height;
            break;
          }
        }
      }
    }
  }]);

  return IconLoader;
}();

/***/ }),

/***/ "./src/LLBBox.js":
/*!***********************!*\
  !*** ./src/LLBBox.js ***!
  \***********************/
/*! exports provided: LLBBox, LLCircle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LLBBox", function() { return LLBBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LLCircle", function() { return LLCircle; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var longdo = window.longdo;
/**
 * class for carrying bound information
 * @export LLBBox
 * @class LLBBox
 */

var LLBBox = /*#__PURE__*/function () {
  /**
   *Creates an instance of LLBBox.
   * @param {Array<longdo.Location>} locations array of locations to create bound
   * @memberof LLBBox
   */
  function LLBBox(locations) {
    _classCallCheck(this, LLBBox);

    this._projection = longdo.Projections.EPSG3857;
    this._locationList = locations.slice();
    this._originalLocationList = this._locationList.slice();

    if (locations.length > 0) {
      this._bounds = longdo.Util.locationBound(this._locationList);
    }
  }
  /**
   * generate the instance set up bound
   * @static
   * @param {longdo.Bound} bound bound to be set up
   * @returns {LLBBox} instance of this class
   * @memberof LLBBox
   */


  _createClass(LLBBox, [{
    key: "getBounds",

    /**
     * returns bound
     * @returns {longdo.Bound} bound
     * @memberof LLBBox
     */
    value: function getBounds() {
      return {
        'minLon': this._bounds.minLon,
        'minLat': this._bounds.minLat,
        'maxLon': this._bounds.maxLon,
        'maxLat': this._bounds.maxLat
      };
    }
    /**
     * returns Left-Top of the bound
     * @returns {longdo.Location} left-top vertex of the bound
     * @memberof LLBBox
     */

  }, {
    key: "LT",
    value: function LT() {
      return {
        "lon": this._bounds.minLon,
        "lat": this._bounds.maxLat
      };
    }
    /**
     * returns Right-Top of the bound
     * @returns {londgo.Location} right-top vertex of the bound
     * @memberof LLBBox
     */

  }, {
    key: "RT",
    value: function RT() {
      return {
        "lon": this._bounds.maxLon,
        "lat": this._bounds.maxLat
      };
    }
    /**
     * returns Left-Bottom of the bound
     * @returns {longdo.Location} left-bottom vertex of the bound
     * @memberof LLBBox
     */

  }, {
    key: "LB",
    value: function LB() {
      return {
        "lon": this._bounds.minLon,
        "lat": this._bounds.minLat
      };
    }
    /**
     * returns right-bottom of the bound
     * @returns {longdo.Locaton} right-bottom vertex of the bound
     * @memberof LLBBox
     */

  }, {
    key: "RB",
    value: function RB() {
      return {
        "lon": this._bounds.maxLon,
        "lat": this._bounds.minLat
      };
    }
  }, {
    key: "getMinimumBounds",
    value: function getMinimumBounds() {
      var b = longdo.Util.locationBound(this._originalLocationList);
      return b;
    }
    /**
     * add location to bound and extend bound in order to include added location
     * @param {longdo.Location} location location to be added
     * @memberof LLBBox
     * @returns {undefined}
     */

  }, {
    key: "add",
    value: function add(location) {
      this._locationList.push(location);

      this._originalLocationList.push(location);

      this._bounds = longdo.Util.locationBound(this._locationList);
    }
    /**
     * remove location from the bound
     * @param {longdo.Location} location location to be removed
     * @memberof LLBBox
     * @returns {undefined}
     */

  }, {
    key: "remove",
    value: function remove(location) {
      this._locationList = this._locationList.filter(function (e) {
        return e !== location;
      });
      this._originalLocationList = this._originalLocationList.filter(function (e) {
        return e !== location;
      });
      this._bounds = this.empty() ? null : longdo.Util.locationBound(this._locationList);
    }
    /**
     * return whether including no locations or not
     * @returns {boolean} return true if containing no location
     * @memberof LLBBox
     */

  }, {
    key: "empty",
    value: function empty() {
      return this._locationList.length === 0;
    }
    /**
     * returns array of locations included itself
     * @returns {Array<longdo.Location>} array of locations included in itself
     * @memberof LLBBox
     */

  }, {
    key: "getLocations",
    value: function getLocations() {
      return this._locationList.slice();
    }
    /**
     * returns whether given location is within its bound
     * @param {longdo.Location} loc location to be checked
     * @returns {boolaen} returns true if location is in bound
     * @memberof LLBBox
     */

  }, {
    key: "isLocInBounds",
    value: function isLocInBounds(loc) {
      var result = longdo.Util.contains(loc, this.getRectVertex());
      return result === null ? true : result;
    } // isLocInBoundsInZoom(loc, zoom){
    //     console.log(zoom);
    //     console.log(this.getRectVertex());
    //     const result = longdo.Util.contains(loc, this.getRectVertex());
    //     return result === null ? true : result;
    // }

    /**
     * extend bound size
     * @param {number} diff size to extends
     * @returns {LLBBox} itself
     * @memberof LLBBox
     */

  }, {
    key: "extendSize",
    value: function extendSize(diff) {
      var b = this._bounds;
      var maxy = this._projection.latToNorm(b.maxLat) + diff;
      var miny = this._projection.latToNorm(b.minLat) - diff;

      this._locationList.push({
        "lon": b.minLon - diff,
        "lat": this._projection.normToLat(miny)
      });

      this._locationList.push({
        "lon": b.minLon - diff,
        "lat": this._projection.normToLat(maxy)
      });

      this._locationList.push({
        "lon": b.minLon + diff,
        "lat": this._projection.normToLat(miny)
      });

      this._locationList.push({
        "lon": b.maxLon + diff,
        "lat": this._projection.normToLat(maxy)
      });

      this._bounds = longdo.Util.locationBound(this._locationList);
      return this;
    }
    /**
     * returns array of vertex by order of drawing rect
     * @returns {Array<longdo.Location>} array of vertex locations
     * @memberof LLBBox
     */

  }, {
    key: "getRectVertex",
    value: function getRectVertex() {
      return [{
        "lon": this._bounds.minLon,
        "lat": this._bounds.minLat
      }, {
        "lon": this._bounds.minLon,
        "lat": this._bounds.maxLat
      }, {
        "lon": this._bounds.maxLon,
        "lat": this._bounds.maxLat
      }, {
        "lon": this._bounds.maxLon,
        "lat": this._bounds.minLat
      }];
    }
    /**
     * draw polygon to show bound
     * @param {longdo.Map} map map for polygon to show
     * @memberof LLBBox
     * @returns {undefined}
     */

  }, {
    key: "drawArea",
    value: function drawArea(map) {
      this._poly = new longdo.Polygon(this.getRectVertex());
      map.Overlays.add(this._poly);
    }
    /**
     * remove polygon from map
     * @param {longdo.Map} map map where the polygon will be removed
     * @memberof LLBBox
     * @returns {undefined}
     */

  }, {
    key: "removeArea",
    value: function removeArea(map) {
      if (this._poly && this._poly.active()) {
        map.Overlays.remove(this._poly);
        delete this._poly;
      }
    }
    /**
     * returns relative coordinates in given N x N grid
     * @param {longdo.Location} loc location to be checked
     * @param {number} n size of width,height of the grid
     * @returns {longdo.Tile} coordinates(Tile)
     * @memberof LLBBox
     */

  }, {
    key: "getNxNGridCord",
    value: function getNxNGridCord(loc, n) {
      if (!this.isLocInBounds(loc)) {
        return null;
      }

      var xlen = (this._bounds.maxLon - this._bounds.minLon) / n;
      var ylen = (this._lat2y(this._bounds.maxLat) - this._lat2y(this._bounds.minLat)) / n;
      var lonoffset = loc.lon - this._bounds.minLon;

      var yoffset = -this._lat2y(loc.lat) + this._lat2y(this._bounds.maxLat);

      var xid = Math.floor(lonoffset / xlen),
          yid = Math.floor(yoffset / ylen);
      return {
        "u": xid,
        "v": yid
      };
    }
    /*
    Adapted from https://wiki.openstreetmap.org/wiki/Mercator
    */

    /**
     * convert y pixel coordinate into latitude
     * @param {number} y pixel coordinate
     * @returns {number} latitude
     * @memberof LLBBox
     */

  }, {
    key: "_y2lat",
    value: function _y2lat(y) {
      return (Math.atan(Math.exp(y / (180 / Math.PI))) / (Math.PI / 4) - 1) * 90;
    }
    /**
     * convert latitude into y pixel coordinate
     * @param {number} lat latitude
     * @returns {number} y pixel coordinate
     * @memberof LLBBox
     */

  }, {
    key: "_lat2y",
    value: function _lat2y(lat) {
      return Math.log(Math.tan((lat / 90 + 1) * (Math.PI / 4))) * (180 / Math.PI);
    }
  }], [{
    key: "generateFrom",
    value: function generateFrom(bound) {
      return new LLBBox([{
        "lon": bound.minLon,
        "lat": bound.minLat
      }, {
        'lon': bound.maxLon,
        'lat': bound.maxLat
      }]);
    }
    /**
     * generate the instance set up rect bound from 1 or 2 vertex
     * @static
     * @param {longdo.Location} loc1 1st vertex
     * @param {longdo.Location} [loc2] 2nd vertex, if not provided, it will be as the same as loc1
     * @returns {LLBBox} instance of this class
     * @memberof LLBBox
     */

  }, {
    key: "generateRect",
    value: function generateRect(loc1, loc2) {
      if (!loc2) {
        loc2 = loc1;
      }

      return new LLBBox([loc1, loc2]);
    }
  }]);

  return LLBBox;
}();
var LLCircle = function LLCircle(center, radius) {
  _classCallCheck(this, LLCircle);

  this.center = center;
  this.sqrad = radius * radius;
};

/***/ }),

/***/ "./src/MarkerCluster.js":
/*!******************************!*\
  !*** ./src/MarkerCluster.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MarkerCluster; });
/* harmony import */ var _LLBBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LLBBox */ "./src/LLBBox.js");
/* harmony import */ var _ConfigHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigHandler */ "./src/ConfigHandler.js");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./src/Icon.js");
/* harmony import */ var _Cluster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Cluster */ "./src/Cluster.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @module MarkerCluster*/
if (typeof window.longdo === 'undefined') {
  throw new Error('longdo API must be loaded before the longdomap markercluster plugin');
}

var longdo = window.longdo;




/**
 * Class for MarkerCluster
 *
 * @export MarkerCluser
 * @class MarkerCluster
 */

var MarkerCluster = /*#__PURE__*/function () {
  /**
   *Creates an instance of MarkerCluster.
   * @param {longdo.Map} map Longdo Map instance
   * @param {Object} options Options for MarkerCluster
   * @memberof MarkerCluster
   */
  function MarkerCluster(map, options) {
    _classCallCheck(this, MarkerCluster);

    this._map = map;
    this._markers = [];
    this._clusters = [];
    this._prevZoom = 2;
    this._ready = false;
    this.overlay = [];
    this.config = new _ConfigHandler__WEBPACK_IMPORTED_MODULE_1__["default"](options);
    this._iloader = new _Icon__WEBPACK_IMPORTED_MODULE_2__["IconLoader"](this, this.config);
    this._projection = longdo.Projections.EPSG3857;
    var that = this;

    this._map.Event.bind('zoom', function ()
    /*pivot*/
    {
      if (!that._ready || !that._iloader.ready) {
        return;
      }

      setTimeout(function () {
        that.resetViewport();

        that._createClusters();
      }, 100);
    });

    this._map.Event.bind('drop', function () {
      if (!that._ready || !that._iloader.ready) {
        return;
      }

      that.resetViewport();

      that._createClusters();
    });

    this._map.Event.bind('overlayClick', function (overlay) {
      that.setSelectedMarker(overlay);

      if (!that._ready || !that._iloader.ready) {
        return;
      }

      var len = that._clusters.length;
      var distance = Number.POSITIVE_INFINITY;

      while (len--) {
        var cl = that._clusters[len];
        var cen = cl._center;

        if (overlay === cl._clusterIcon._clusterMarker && cen) {
          var l = [];
          var len2 = cl._markers.length;

          while (len2--) {
            var marker = cl._markers[len2];
            l.push(marker.location());
            var d = longdo.Util.distance([cen, marker.location()]);

            if (d < distance) {
              distance = d;

              var zoom = that._map.zoom();

              for (var index = zoom; index <= 20; index++) {
                var isinCluster = cl.isMarkerInClusterBoundsAtZoom(marker, index);

                if (!isinCluster) {
                  that._map.zoom(index);

                  if (that.config.onClickCenter) {
                    that._map.location(overlay.location(), false);
                  } else {
                    var zoomTime = index - zoom - 1;
                    var avgLoc = longdo.Util.averageLocation(that._projection, that._map.location(), overlay.location());

                    while (zoomTime--) {
                      avgLoc = longdo.Util.averageLocation(that._projection, avgLoc, overlay.location());
                    }

                    that._map.location(avgLoc, false);
                  }

                  return;
                }
              }
            }
          } // that._map.bound(longdo.Util.locationBound(l));
          // setTimeout(function(){
          //     that.resetViewport();
          //     that._createClusters();
          // },10);


          return;
        }
      }
    }); // this._map.Event.bind('loadTile', function(s){
    //     if(s === 'start' || !that._ready || !that._iloader.ready){return;}
    //     console.log('load tile')
    //     that.resetViewport();
    //     that._createClusters();
    // });

  }
  /**
   * add marker(s) to plugins's management
   * @param {longdo.Marker| Array<longdo.Marker>} markers marker(s) to add
   * @memberof MarkerCluster
   * @returns {undefined}
   */


  _createClass(MarkerCluster, [{
    key: "addMarkers",
    value: function addMarkers(markers) {
      if (markers instanceof longdo.Marker) {
        markers = [markers];
      }

      var len = markers.length;

      while (len--) {
        var m = markers[len];

        this._markers.push(m);
      }

      if (this.config.swarmModeEnabled) {
        this.shuffle();
      }
    }
    /**
     * randomize elements order in {@link MarkerCluster._markers}
     * using Fisher-Yates Algorithm
     * @memberof MarkerCluster
     * @returns {undefined}
     */

  }, {
    key: "shuffle",
    value: function shuffle() {
      for (var i = this._markers.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var temp = this._markers[i];
        this._markers[i] = this._markers[r];
        this._markers[r] = temp;
      }
    }
  }, {
    key: "getSelectedMarker",
    value: function getSelectedMarker() {
      if (this.overlay) {
        return this.overlay;
      }

      return null;
    }
  }, {
    key: "setSelectedMarker",
    value: function setSelectedMarker(_overlay) {
      if (_overlay && _overlay.element() && _overlay.element().classList.contains('ldmap_clickable')) {
        this.overlay = _overlay;
      }
    }
    /**
     * start rendering if icons-loading finished
     * @memberof MarkerCluster
     * @returns {undefined}
     */

  }, {
    key: "render",
    value: function render() {
      this._ready = true;

      if (this._iloader.ready) {
        // this._map.Event.bind('ready',() => {
        //     if(!this._ready || !this._iloader.ready){return;}
        //     this._prevZoom = this._map.zoom;
        //     console.log('map ready')
        //     this.resetViewport();
        //     this._createClusters();
        // });
        this.resetViewport();

        this._createClusters();
      }
    }
    /**
     * choose markers in Map bound & add to clusters
     * @memberof MarkerCluster
     * @returns {undefined}
     */

  }, {
    key: "_createClusters",
    value: function _createClusters() {
      var mapBounds = _LLBBox__WEBPACK_IMPORTED_MODULE_0__["LLBBox"].generateFrom(this._map.bound());
      var bounds = mapBounds.extendSize(this.config.gridSize * Math.pow(2, -this._map.zoom()));
      var len = this._markers.length;

      while (len--) {
        var m = this._markers[len];
        var loc = m.location();

        if (!m.isAdded && bounds.isLocInBounds(loc)) {
          if (!this.config.swarmModeEnabled) {
            this._addToClosestCluster(m);
          } else {
            if (this.config.swarmAlg === 2) {
              this._addToClosestCluster(m);
            } else {
              this._addToTiledCluster(m);
            }
          }
        }
      }

      len = this._clusters.length;

      while (len--) {
        var cl = this._clusters[len];
        cl.finalize();
      }
    }
    /**
     * add marker to the closest cluster if it is within cluster's grid. If not, create new one.
     * @param {longdo.Marker} marker marker to be added
     * @memberof MarkerCluster
     * @returns {undefined}
     */

  }, {
    key: "_addToClosestCluster",
    value: function _addToClosestCluster(marker) {
      var distance = Number.POSITIVE_INFINITY;
      var clusterToAddTo = null;
      var len = this._clusters.length;

      while (len--) {
        var cluster = this._clusters[len];
        var cen = cluster._center;

        if (cen) {
          var d = longdo.Util.distance([cen, marker.location()]);

          if (d < distance) {
            distance = d;
            clusterToAddTo = cluster;
          }
        }
      }

      if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);

        if (this._maxClusterSize && this._maxClusterSize < clusterToAddTo._markers.length) {
          this._maxClusterSize = clusterToAddTo._markers.length;
        } else {
          this._maxClusterSize = clusterToAddTo._markers.length;
        }
      } else {
        var _cluster = new _Cluster__WEBPACK_IMPORTED_MODULE_3__["default"](this, this.config, this._iloader);

        _cluster.addMarker(marker);

        this._clusters.push(_cluster);

        if (this._maxClusterSize && this._maxClusterSize < _cluster._markers.length) {
          this._maxClusterSize = _cluster._markers.length;
        } else {
          this._maxClusterSize = _cluster._markers.length;
        }
      }
    }
    /**
     * add marker to clusters in charge of its tile
     * @param {longdo.Marker} marker marker to be added
     * @returns {undefined}
     * @memberof MarkerCluster
     */

  }, {
    key: "_addToTiledCluster",
    value: function _addToTiledCluster(marker) {
      var that = this;

      var locationToTile = function locationToTile(loc) {
        var point = longdo.Util.locationToPoint(longdo.Projections.EPSG3857, loc);
        point.z = 20 - that._map.zoom();
        return longdo.Util.pointToTile(point);
      };

      var tile = locationToTile(marker.location());
      var len = this._clusters.length;

      while (len--) {
        var _cluster2 = this._clusters[len];

        if (_cluster2.u === tile.u && _cluster2.v === tile.v) {
          _cluster2.addMarker(marker, tile);

          return;
        }
      }

      var cluster = new _Cluster__WEBPACK_IMPORTED_MODULE_3__["default"](this, this.config, this._iloader);
      cluster.u = tile.u;
      cluster.v = tile.v;
      cluster.addMarker(marker, tile);

      this._clusters.push(cluster);
    }
  }, {
    key: "_removeMarker",
    value: function _removeMarker(marker) {
      var index = this._markers.indexOf(marker);

      if (index === -1) {
        return false;
      }

      this._map.Overlays.remove(marker);

      this._markers.splice(index, 1);

      return true;
    }
  }, {
    key: "removeMarker",
    value: function removeMarker(marker) {
      var removed = this._removeMarker(marker);

      if (removed) {
        this.resetViewport();

        this._createClusters();

        return true;
      }

      return false;
    }
  }, {
    key: "removeMarkers",
    value: function removeMarkers(markers) {
      var markersCopy = markers === this._markers ? this._markers.slice() : markers;
      var removed = false;
      var len = markersCopy.length;

      while (len--) {
        var r = this._removeMarker(markersCopy[len]);

        removed = removed || r;
      }

      if (removed) {
        this.resetViewport();

        this._createClusters();

        return true;
      }

      return false;
    }
  }, {
    key: "clearMarkers",
    value: function clearMarkers() {
      this.resetViewport();
      var len = this._markers.length;

      while (len--) {
        var marker = this._markers[len];

        this._map.Overlays.remove(marker);
      }

      this._markers = [];
    }
    /**
     * remove clusters & markers from the map, then clear clusters
     * @memberof MarkerCluster
     * @returns {undefined}
     */

  }, {
    key: "resetViewport",
    value: function resetViewport() {
      var len = this._clusters.length;

      while (len--) {
        this._clusters[len].remove();
      }

      len = this._markers.length;

      while (len--) {
        var marker = this._markers[len];
        marker.isAdded = false; //this._map.Overlays.remove(marker);
      }

      this._clusters = [];
    }
  }]);

  return MarkerCluster;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: MarkerCluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MarkerCluster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarkerCluster */ "./src/MarkerCluster.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MarkerCluster", function() { return _MarkerCluster__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ })

/******/ });
//# sourceMappingURL=longdomap.markercluster-src.js.map