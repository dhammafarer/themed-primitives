import { Theme, Scale } from "./defaultTheme";
import { pathOr, mergeDeepRight } from "ramda";

const space = (theme: Theme) => (val: Scale) => theme.sizes[val];

const fontSize = (theme: Theme) => (val: Scale) => theme.fontSizes[val];

const fontWeight = (theme: Theme) => (val: Scale) => theme.fontWeights[val];

const dimension = (theme: Theme) => (val: Scale) => theme.dimensions[val];

const shadow = (theme: Theme) => (val: Scale) => theme.shadows[val];

const zIndex = (theme: Theme) => (val: Scale) => theme.zIndexes[val];

const border = (theme: Theme) => (val: Scale) => theme.borders[val];

const radius = (theme: Theme) => (val: Scale) => theme.radii[val];

const fontFamily = (theme: Theme) => (val: "sans" | "serif") =>
  theme.fonts[val];

const lineHeight = (theme: Theme) => (val: "solid" | "title" | "copy") =>
  theme.lineHeights[val];

const letterSpacing = (theme: Theme) => (
  val: "normal" | "tight" | "tracked" | "mega"
) => theme.letterSpacings[val];

const color = (theme: Theme) => (s: string) =>
  pathOr(s, s.split("."), theme.colors);

export const fns = {
  color,
  border,
  radius,
  dimension,
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  letterSpacing,
  space,
  shadow,
  zIndex,
};
