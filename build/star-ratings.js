"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _star = require("./star");

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StarRatings = function (_React$Component) {
  _inherits(StarRatings, _React$Component);

  function StarRatings(props) {
    _classCallCheck(this, StarRatings);

    var _this = _possibleConstructorReturn(this, (StarRatings.__proto__ || Object.getPrototypeOf(StarRatings)).call(this, props));

    _this.hoverOverStar = function (starRating) {
      return function () {
        _this.setState({ highestStarHovered: starRating });
      };
    };

    _this.unHoverOverStar = function () {
      _this.setState({ highestStarHovered: -Infinity });
    };

    _this.state = {
      highestStarHovered: -Infinity,
      fillId: "starGrad" + Math.random().toFixed(15).slice(2)
    };
    return _this;
  }

  _createClass(StarRatings, [{
    key: "stopColorStyle",
    value: function stopColorStyle(color) {
      if (this.props.ignoreInlineStyles) return {};
      return { stopColor: color, stopOpacity: "1" };
    }
  }, {
    key: "renderStars",
    value: function renderStars() {
      var _this2 = this;

      var _props = this.props,
          changeRating = _props.changeRating,
          rating = _props.rating,
          numberOfStars = _props.numberOfStars,
          starDimension = _props.starDimension,
          starSpacing = _props.starSpacing,
          starRatedColor = _props.starRatedColor,
          starEmptyColor = _props.starEmptyColor,
          starHoverColor = _props.starHoverColor,
          gradientPathName = _props.gradientPathName,
          ignoreInlineStyles = _props.ignoreInlineStyles,
          svgIconPath = _props.svgIconPath,
          svgIconViewBox = _props.svgIconViewBox,
          name = _props.name;


      return Array.from({ length: numberOfStars }).map(function (_, index) {
        var starRating = index + 1;
        var isStarred = starRating <= rating;
        var isHovered = starRating <= _this2.state.highestStarHovered;
        var isCurrentHoveredStar = starRating === _this2.state.highestStarHovered;
        var isPartiallyFullStar = starRating > rating && starRating - 1 < rating;
        var isFirstStar = starRating === 1;
        var isLastStar = starRating === numberOfStars;
        var hoverMode = _this2.state.highestStarHovered > 0;

        return _react2.default.createElement(_star2.default, {
          key: starRating,
          fillId: _this2.state.fillId,
          changeRating: changeRating ? function () {
            return changeRating(starRating, name);
          } : null,
          hoverOverStar: changeRating ? _this2.hoverOverStar(starRating) : null,
          unHoverOverStar: changeRating ? _this2.unHoverOverStar : null,
          isStarred: isStarred,
          isPartiallyFullStar: isPartiallyFullStar,
          isHovered: isHovered,
          hoverMode: hoverMode,
          isCurrentHoveredStar: isCurrentHoveredStar,
          isFirstStar: isFirstStar,
          isLastStar: isLastStar,
          starDimension: starDimension,
          starSpacing: starSpacing,
          starHoverColor: starHoverColor,
          starRatedColor: starRatedColor,
          starEmptyColor: starEmptyColor,
          gradientPathName: gradientPathName,
          ignoreInlineStyles: ignoreInlineStyles,
          svgIconPath: svgIconPath,
          svgIconViewBox: svgIconViewBox
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          starRatedColor = _props2.starRatedColor,
          starEmptyColor = _props2.starEmptyColor;


      return _react2.default.createElement(
        "div",
        {
          className: "star-ratings",
          title: this.titleText,
          style: this.starRatingsStyle
        },
        _react2.default.createElement(
          "svg",
          { className: "star-grad", style: this.starGradientStyle },
          _react2.default.createElement(
            "defs",
            null,
            _react2.default.createElement(
              "linearGradient",
              {
                id: this.state.fillId,
                x1: "0%",
                y1: "0%",
                x2: "100%",
                y2: "0%"
              },
              _react2.default.createElement("stop", {
                offset: "0%",
                className: "stop-color-first",
                style: this.stopColorStyle(starRatedColor)
              }),
              _react2.default.createElement("stop", {
                offset: this.offsetValue,
                className: "stop-color-first",
                style: this.stopColorStyle(starRatedColor)
              }),
              _react2.default.createElement("stop", {
                offset: this.offsetValue,
                className: "stop-color-final",
                style: this.stopColorStyle(starEmptyColor)
              }),
              _react2.default.createElement("stop", {
                offset: "100%",
                className: "stop-color-final",
                style: this.stopColorStyle(starEmptyColor)
              })
            )
          )
        ),
        this.renderStars()
      );
    }
  }, {
    key: "starRatingsStyle",
    get: function get() {
      if (this.props.ignoreInlineStyles) return {};
      return {
        position: "relative",
        boxSizing: "border-box",
        display: "inline-block"
      };
    }
  }, {
    key: "starGradientStyle",
    get: function get() {
      if (this.props.ignoreInlineStyles) return {};
      return {
        position: "absolute",
        zIndex: 0,
        width: 0,
        height: 0,
        visibility: "hidden"
      };
    }
  }, {
    key: "titleText",
    get: function get() {
      var _props3 = this.props,
          typeOfWidget = _props3.typeOfWidget,
          rating = _props3.rating;

      var hoveredRating = this.state.highestStarHovered;
      var currentRating = hoveredRating > 0 ? hoveredRating : rating;
      var formattedRating = parseFloat(currentRating.toFixed(2)).toString();
      if (Number.isInteger(currentRating)) {
        formattedRating = String(currentRating);
      }
      return formattedRating + " " + (formattedRating === "1" ? typeOfWidget : typeOfWidget + "s");
    }
  }, {
    key: "offsetValue",
    get: function get() {
      var rating = this.props.rating;

      if (Number.isInteger(rating)) return "0%";
      return rating.toFixed(2).split(".")[1].slice(0, 2) + "%";
    }
  }]);

  return StarRatings;
}(_react2.default.Component);

StarRatings.propTypes = {
  rating: _propTypes2.default.number.isRequired,
  numberOfStars: _propTypes2.default.number.isRequired,
  changeRating: _propTypes2.default.func,
  starHoverColor: _propTypes2.default.string.isRequired,
  starRatedColor: _propTypes2.default.string.isRequired,
  starEmptyColor: _propTypes2.default.string.isRequired,
  starDimension: _propTypes2.default.string.isRequired,
  starSpacing: _propTypes2.default.string.isRequired,
  gradientPathName: _propTypes2.default.string.isRequired,
  ignoreInlineStyles: _propTypes2.default.bool.isRequired,
  svgIconPath: _propTypes2.default.string.isRequired,
  svgIconViewBox: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string
};

StarRatings.defaultProps = {
  rating: 0,
  typeOfWidget: "Star",
  numberOfStars: 5,
  changeRating: null,
  starHoverColor: "rgb(230, 67, 47)",
  starRatedColor: "rgb(109, 122, 130)",
  starEmptyColor: "rgb(203, 211, 227)",
  starDimension: "50px",
  starSpacing: "7px",
  gradientPathName: "",
  ignoreInlineStyles: false,
  svgIconPath: "m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z",
  svgIconViewBox: "0 0 51 48"
};

exports.default = StarRatings;