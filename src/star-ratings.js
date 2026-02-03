import React, { useId } from "react";
import PropTypes from "prop-types";
import Star from "./star";

class StarRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highestStarHovered: -Infinity,
      fillId: null,
    };
  }

  componentDidMount() {
    this.setState({ fillId: `starGrad${Math.random().toFixed(15).slice(2)}` });
  }

  get starRatingsStyle() {
    if (this.props.ignoreInlineStyles) return {};
    return {
      position: "relative",
      boxSizing: "border-box",
      display: "inline-block",
    };
  }

  get starGradientStyle() {
    if (this.props.ignoreInlineStyles) return {};
    return {
      position: "absolute",
      zIndex: 0,
      width: 0,
      height: 0,
      visibility: "hidden",
    };
  }

  stopColorStyle(color) {
    if (this.props.ignoreInlineStyles) return {};
    return { stopColor: color, stopOpacity: "1" };
  }

  get titleText() {
    const { typeOfWidget, rating } = this.props;
    const hoveredRating = this.state.highestStarHovered;
    const currentRating = hoveredRating > 0 ? hoveredRating : rating;
    let formattedRating = parseFloat(currentRating.toFixed(2)).toString();
    if (Number.isInteger(currentRating)) {
      formattedRating = String(currentRating);
    }
    return `${formattedRating} ${
      formattedRating === "1" ? typeOfWidget : `${typeOfWidget}s`
    }`;
  }

  get offsetValue() {
    const { rating } = this.props;
    if (Number.isInteger(rating)) return "0%";
    return `${rating.toFixed(2).split(".")[1].slice(0, 2)}%`;
  }

  hoverOverStar = (starRating) => () => {
    this.setState({ highestStarHovered: starRating });
  };

  unHoverOverStar = () => {
    this.setState({ highestStarHovered: -Infinity });
  };

  renderStars() {
    const {
      changeRating,
      rating,
      numberOfStars,
      starDimension,
      starSpacing,
      starRatedColor,
      starEmptyColor,
      starHoverColor,
      gradientPathName,
      ignoreInlineStyles,
      svgIconPath,
      svgIconViewBox,
      name,
    } = this.props;

    return Array.from({ length: numberOfStars }).map((_, index) => {
      const starRating = index + 1;
      const isStarred = starRating <= rating;
      const isHovered = starRating <= this.state.highestStarHovered;
      const isCurrentHoveredStar = starRating === this.state.highestStarHovered;
      const isPartiallyFullStar =
        starRating > rating && starRating - 1 < rating;
      const isFirstStar = starRating === 1;
      const isLastStar = starRating === numberOfStars;
      const hoverMode = this.state.highestStarHovered > 0;

      return (
        <Star
          key={starRating}
          fillId={this.state.fillId}
          changeRating={
            changeRating ? () => changeRating(starRating, name) : null
          }
          hoverOverStar={changeRating ? this.hoverOverStar(starRating) : null}
          unHoverOverStar={changeRating ? this.unHoverOverStar : null}
          isStarred={isStarred}
          isPartiallyFullStar={isPartiallyFullStar}
          isHovered={isHovered}
          hoverMode={hoverMode}
          isCurrentHoveredStar={isCurrentHoveredStar}
          isFirstStar={isFirstStar}
          isLastStar={isLastStar}
          starDimension={starDimension}
          starSpacing={starSpacing}
          starHoverColor={starHoverColor}
          starRatedColor={starRatedColor}
          starEmptyColor={starEmptyColor}
          gradientPathName={gradientPathName}
          ignoreInlineStyles={ignoreInlineStyles}
          svgIconPath={svgIconPath}
          svgIconViewBox={svgIconViewBox}
        />
      );
    });
  }

  render() {
    const { starRatedColor, starEmptyColor } = this.props;

    return (
      <div
        className="star-ratings"
        title={this.titleText}
        style={this.starRatingsStyle}
      >
        <svg className="star-grad" style={this.starGradientStyle}>
          <defs>
            <linearGradient
              id={this.state.fillId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                className="stop-color-first"
                style={this.stopColorStyle(starRatedColor)}
              />
              <stop
                offset={this.offsetValue}
                className="stop-color-first"
                style={this.stopColorStyle(starRatedColor)}
              />
              <stop
                offset={this.offsetValue}
                className="stop-color-final"
                style={this.stopColorStyle(starEmptyColor)}
              />
              <stop
                offset="100%"
                className="stop-color-final"
                style={this.stopColorStyle(starEmptyColor)}
              />
            </linearGradient>
          </defs>
        </svg>
        {this.renderStars()}
      </div>
    );
  }
}

StarRatings.propTypes = {
  rating: PropTypes.number.isRequired,
  numberOfStars: PropTypes.number.isRequired,
  changeRating: PropTypes.func,
  starHoverColor: PropTypes.string.isRequired,
  starRatedColor: PropTypes.string.isRequired,
  starEmptyColor: PropTypes.string.isRequired,
  starDimension: PropTypes.string.isRequired,
  starSpacing: PropTypes.string.isRequired,
  gradientPathName: PropTypes.string.isRequired,
  ignoreInlineStyles: PropTypes.bool.isRequired,
  svgIconPath: PropTypes.string.isRequired,
  svgIconViewBox: PropTypes.string.isRequired,
  name: PropTypes.string,
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
  svgIconViewBox: "0 0 51 48",
};

export default StarRatings;
