import baseStyled, {
  css as baseCss,
  ThemedCssFunction,
  ThemedStyledInterface,
} from "styled-components";

import { defaultTheme, Theme, Scale } from "./defaultTheme";
import { fns } from "./functions";
import { pathOr, mergeDeepRight } from "ramda";

const makeTheme = (theme: any) => mergeDeepRight(defaultTheme, theme);

const styled = baseStyled as ThemedStyledInterface<Theme>;
const css = baseCss as ThemedCssFunction<Theme>;

export { fns, defaultTheme, styled, css, Scale, Theme, makeTheme };
