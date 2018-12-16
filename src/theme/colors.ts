import { lighten, darken } from "./utils";

const primary = "rgb(36,140,204)";
const secondary = "rgb(203,160,83)";
const white = "rgb(255,255,255)";
const black = "rgb(0,0,0)";

export const colors = {
  primary: {
    light: lighten(primary)(1 / 4),
    main: primary,
    dark: darken(primary)(1 / 4),
    contrast: "rgba(255,255,255,0.9)",
  },
  secondary: {
    light: lighten(secondary)(1 / 4),
    main: secondary,
    dark: darken(secondary)(1 / 4),
    contrast: "rgba(255,255,255,0.9)",
  },
  error: "red",
  divider: "rgba(0, 0, 0, 0.12)",
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    A100: "#d5d5d5",
    A200: "#aaaaaa",
    A400: "#303030",
    A700: "#616161",
  },
  background: {
    paper: "#fff",
    default: "#fafafa",
  },
  text: {
    dark: "rgba(0, 0, 0, 0.87)",
    main: "rgba(0, 0, 0, 0.54)",
    light: "rgba(0, 0, 0, 0.38)",
    contrast: "rgba(255, 255, 255, 0.9)",
  },
  white: {
    dark: "rgba(255,255,255,0.8)",
    main: "rgba(255,255,255,0.9)",
    light: "rgba(255,255,255,1)",
    contrast: "rgba(0, 0, 0, 0.9)",
  },
  black: {
    dark: black,
    main: lighten(black)(1 / 5),
    light: lighten(black)(1 / 4),
    contrast: "rgba(255, 255, 255, 0.9)",
  },
  common: {
    white: "#fff",
    black: "#000",
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(0, 0, 0, 0.14)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
  },
};
