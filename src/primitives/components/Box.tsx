import * as React from "react";
import { styled, css, Scale } from "../../theme";
import {
  getPadding,
  getMargins,
  getBackground,
  getColor,
  getWidth,
} from "../getters";

type ResponsiveString = string | string[];
type ResponsiveScale = Scale | Scale[];

interface SpaceProps {
  p?: ResponsiveScale;
  px?: ResponsiveScale;
  py?: ResponsiveScale;
  pr?: ResponsiveScale;
  pl?: ResponsiveScale;
  pt?: ResponsiveScale;
  pb?: ResponsiveScale;
  m?: ResponsiveScale;
  mx?: ResponsiveScale;
  my?: ResponsiveScale;
  mr?: ResponsiveScale;
  ml?: ResponsiveScale;
  mt?: ResponsiveScale;
  mb?: ResponsiveScale;
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
  bg?: string;
  color?: string;
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

export { box, Box, BoxProps, ResponsiveString, ResponsiveScale };
