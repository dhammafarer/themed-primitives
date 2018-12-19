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

const getColor = getResponsive(fns.color)(prop("color"))("color");

const numOrLiteral = (f: any) => (theme: any) =>
  ifElse(is(Number), f(theme), identity);

const parseSpace = numOrLiteral(fns.space);

const handleWidth = () => ifElse(gte(1), x => `${x * 100}%`, x => `${x}px`);

const parseWidth = numOrLiteral(handleWidth);

const getWidth = getResponsive(parseWidth)(prop("width"))("width");

const getDirectionalProperty = getWithDirections(directionsMap)(
  responsiveTemplate
)(parseSpace);

const getPadding = getDirectionalProperty("padding");
const getMargins = getDirectionalProperty("margin");

export { getWidth, getPadding, getMargins, getColor };
