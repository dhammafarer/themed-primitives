import * as React from "react";
import { css, styled, Scale } from "../../theme";
import { Box, box, BoxProps, ResponsiveScale, ResponsiveString } from "./Box";
import {
  getBoxShadow,
  getBorder,
  getBorderRadius,
  getBorderColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLineHeight,
  getLetterSpacing,
  getTextTransform,
  getTextAlign,
} from "../getters";

interface ButtonProps extends BoxProps {
  shadow?: Scale;
  radius?: Scale;
  b?: Scale;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: ResponsiveScale;
  fontWeight?: ResponsiveScale;
  textTransform?: ResponsiveString;
  textAlign?: ResponsiveString;
  lineHeight?: ResponsiveString;
  letterSpacing?: ResponsiveString;
}

const button = css<ButtonProps>`
  font-family: ${props => props.theme.fonts.sans};
  text-decoration: none;
  cursor: pointer;
  ${box}
  ${props => css`
    ${getBoxShadow(props)}
    ${getBorder(props)}
    ${getBorderColor(props)}
    ${getBorderRadius(props)}
    ${getFontSize(props)}
    ${getFontWeight(props)}
    ${getFontFamily(props)}
    ${getLineHeight(props)}
    ${getLetterSpacing(props)}
    ${getTextTransform(props)}
    ${getTextAlign(props)}
  `}
`;

const Button = styled(
  ({
    shadow,
    b,
    borderColor,
    radius,
    fontSize,
    fontWeight,
    fontFamily,
    lineHeight,
    letterSpacing,
    textTransform,
    textAlign,
    ...rest
  }) => <Box {...rest} />
)<ButtonProps & React.HTMLProps<HTMLButtonElement>>`
  ${button}
`;

export { Button, ButtonProps };
