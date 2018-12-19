import * as React from "react";
import { styled, css } from "../../theme";
import {
  getPadding,
  getMargins,
  getBackground,
  getColor,
  getWidth,
} from "../getters";

type ResponsiveString = string | string[];
type ResponsiveScale = number | number[];
type ResponsiveEither = ResponsiveScale | ResponsiveString;

interface SpaceProps {
  p?: ResponsiveEither;
  px?: ResponsiveEither;
  py?: ResponsiveEither;
  pr?: ResponsiveEither;
  pl?: ResponsiveEither;
  pt?: ResponsiveEither;
  pb?: ResponsiveEither;
  m?: ResponsiveEither;
  mx?: ResponsiveEither;
  my?: ResponsiveEither;
  mr?: ResponsiveEither;
  ml?: ResponsiveEither;
  mt?: ResponsiveEither;
  mb?: ResponsiveEither;
}

const space = css<SpaceProps>`
  ${props => css`
    ${getPadding(props)}
    ${getMargins(props)}
  `}
`;

const box = css<BoxProps>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  ${space}
  ${props => css`
    ${getBackground(props)};
    ${getColor(props)};
    ${getWidth(props)};
  `}
`;

interface BoxProps extends SpaceProps {
  bg?: ResponsiveString;
  color?: ResponsiveString;
  width?: ResponsiveScale | ResponsiveString;
}

const Box = styled(
  ({
    p,
    px,
    py,
    pr,
    pl,
    pt,
    pb,
    m,
    mx,
    my,
    mr,
    ml,
    mt,
    mb,
    bg,
    width,
    color,
    ...rest
  }) => <div {...rest} />
)<BoxProps & React.HTMLProps<HTMLDivElement>>`
  ${box}
`;

export {
  box,
  Box,
  BoxProps,
  ResponsiveString,
  ResponsiveScale,
  ResponsiveEither,
};
