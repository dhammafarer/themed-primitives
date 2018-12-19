import { getProperty } from "./getProperty";
import { getWithDirections } from "./getWithDirections";
import { fns } from "../theme/accessors";
import { prop, is, gte, ifElse, identity } from "ramda";
import { responsiveTemplate } from "./templates";

const directionsMap = [
  { dir: "left", l: ["l", "x", ""] },
  { dir: "right", l: ["r", "x", ""] },
  { dir: "top", l: ["t", "y", ""] },
  { dir: "bottom", l: ["b", "y", ""] },
];

const getResponsive = getProperty(responsiveTemplate);
const getLiteral = getResponsive(() => identity);

const numOrLiteral = (f: any) => (theme: any) =>
  ifElse(is(Number), f(theme), identity);

const parseSpace = numOrLiteral(fns.space);

const getDirectionalProperty = getWithDirections(directionsMap)(
  responsiveTemplate
);

// directional
const getPadding = getDirectionalProperty(parseSpace)("padding");
const getMargins = getDirectionalProperty(parseSpace)("margin");
const getBorder = getDirectionalProperty(fns.border)("border");

// width
const handleLength = () => ifElse(gte(1), x => `${x * 100}%`, x => `${x}px`);
const parseLength = numOrLiteral(handleLength);
const getWidth = getResponsive(parseLength)(prop("width"))("width");

// colors
const fromColor = getResponsive(fns.color);
const getColor = fromColor(prop("color"))("color");
const getBackground = fromColor(prop("bg"))("background");
const getBorderColor = fromColor(prop("borderColor"))("border-color");

//misc
const getBoxShadow = getResponsive(fns.shadow)(prop("shadow"))("box-shadow");
const getOpacity = getLiteral(prop("opacity"))("opacity");
const getBorderRadius = getResponsive(fns.radius)(prop("radius"))(
  "border-radius"
);

// text
const getFontSize = getResponsive(fns.fontSize)(prop("fontSize"))("font-size");
const getFontWeight = getResponsive(fns.fontWeight)(prop("fontWeight"))(
  "font-weight"
);
const getFontFamily = getResponsive(fns.fontFamily)(prop("fontFamily"))(
  "font-family"
);
const getLineHeight = getResponsive(fns.lineHeight)(prop("lineHeight"))(
  "line-height"
);
const getLetterSpacing = getResponsive(fns.letterSpacing)(
  prop("letterSpacing")
)("letter-spacing");
const getTextTransform = getLiteral(prop("textTransform"))("text-transform");
const getTextAlign = getLiteral(prop("textAlign"))("text-align");

//flex
const getFlexWrap = getLiteral(prop("flexWrap"))("flex-wrap");
const getFlexDirection = getLiteral(prop("flexDirection"))("flex-direction");
const getJustifyContent = getLiteral(prop("justifyContent"))("justify-content");
const getAlignItems = getLiteral(prop("alignItems"))("align-items");

export {
  getBorder,
  getBorderColor,
  getBorderRadius,
  getColor,
  getBackground,
  getWidth,
  getFontSize,
  getFontFamily,
  getFontWeight,
  getTextAlign,
  getTextTransform,
  getLineHeight,
  getLetterSpacing,
  getPadding,
  getMargins,
  getFlexWrap,
  getJustifyContent,
  getAlignItems,
  getBoxShadow,
  getOpacity,
};
