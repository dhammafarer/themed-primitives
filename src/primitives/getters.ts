import { Scale, fns } from "../theme";
import { getWithDirections } from "./getWithDirections";
import { getProperty } from "./getProperty";
import { prop, identity } from "ramda";
import { responsiveTemplate } from "./templates";

const getResponsive = getProperty(responsiveTemplate);
const getLiteral = getResponsive(() => identity);

// directions map
const directionsMap = [
  { dir: "left", l: ["l", "x", ""] },
  { dir: "right", l: ["r", "x", ""] },
  { dir: "top", l: ["t", "y", ""] },
  { dir: "bottom", l: ["b", "y", ""] },
];

const getDirectionalProperty = getWithDirections(directionsMap)(
  responsiveTemplate
)(fns.space);

export const getPadding = getDirectionalProperty("padding");
export const getMargins = getDirectionalProperty("margin");

const getFromColor = getResponsive(fns.color);
export const getBackground = getFromColor(prop("bg"))("background");
export const getColor = getFromColor(prop("color"))("color");
export const getBorderColor = getFromColor(prop("borderColor"))("border-color");
export const getBorderLeftColor = getFromColor(prop("blc"))(
  "border-left-color"
);
export const getBorderRightColor = getFromColor(prop("brc"))(
  "border-right-color"
);
export const getBorderTopColor = getFromColor(prop("btc"))("border-top-color");
export const getBorderBottomColor = getFromColor(prop("bbc"))(
  "border-bottom-color"
);

export const getBoxShadow = getResponsive(fns.shadow)(prop("shadow"))(
  "box-shadow"
);

export const getBorder = getWithDirections(directionsMap)(responsiveTemplate)(
  fns.border
)("border");

export const getBorderRadius = getResponsive(fns.radius)(prop("radius"))(
  "border-radius"
);

export const getFontWeight = getResponsive(fns.fontWeight)(prop("fontWeight"))(
  "font-weight"
);
export const getFontFamily = getResponsive(fns.fontFamily)(prop("fontFamily"))(
  "font-family"
);

export const getLineHeight = getResponsive(fns.lineHeight)(prop("lineHeight"))(
  "line-height"
);
export const getLetterSpacing = getResponsive(fns.letterSpacing)(
  prop("letterSpacing")
)("letter-spacing");
export const getTextTransform = getLiteral(prop("textTransform"))(
  "text-transform"
);
export const getTextAlign = getLiteral(prop("textAlign"))("text-align");
export const getOpacity = getLiteral(prop("opacity"))("opacity");
export const getFlexDirection = getLiteral(prop("flexDirection"))(
  "flex-direction"
);
export const getFlexWrap = getLiteral(prop("flexWrap"))("flex-wrap");
export const getJustifyContent = getLiteral(prop("justifyContent"))(
  "justify-content"
);
export const getAlignItems = getLiteral(prop("alignItems"))("align-items");

type Width = string | Scale;
const parseWidth = (theme: any) => (v: Width) =>
  typeof v === "number" ? `${v * 100}%` : v;
export const getWidth = getResponsive(parseWidth)(prop("width"))("width");

export const getFontSize = getResponsive(fns.fontSize)(prop("fontSize"))(
  "font-size"
);
