import { Theme, Scale } from "./defaultTheme";
import { path, pathOr } from "ramda";

type Prop = keyof Theme;

const fromThemeScaled = (prop: Prop) => (theme: Theme) => (val: any) =>
  path([prop, val], theme);

const space = fromThemeScaled("sizes");
const fontSize = fromThemeScaled("fontSizes");
const fontWeight = fromThemeScaled("fontWeights");
const dimension = fromThemeScaled("dimensions");
const shadow = fromThemeScaled("shadows");
const zIndex = fromThemeScaled("zIndexes");
const border = fromThemeScaled("borders");
const radius = fromThemeScaled("radii");

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
