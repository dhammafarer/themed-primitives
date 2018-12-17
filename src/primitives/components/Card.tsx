import * as React from "react";
import { styled, css, Scale } from "../../theme";
import { Flex, flex, FlexProps } from "./Flex";
import {
  getOpacity,
  getBoxShadow,
  getBorder,
  getBorderRadius,
  getBorderColor,
} from "../getters";

interface CardProps extends FlexProps {
  opacity?: number;
  shadow?: Scale;
  radius?: Scale;
  b?: Scale;
  br?: Scale;
  bl?: Scale;
  bt?: Scale;
  bb?: Scale;
  bx?: Scale;
  by?: Scale;
  borderColor?: string;
}

const card = css<CardProps>`
  overflow: hidden;
  flex-direction: column;
  ${flex}
  ${props => css`
    ${getOpacity(props)}
    ${getBoxShadow(props)}
    ${getBorder(props)}
    ${getBorderColor(props)}
    ${getBorderRadius(props)}
  `}
`;

const Card = styled(
  ({ opacity, boxShadow, b, borderColor, radius, ...rest }) => (
    <Flex {...rest} />
  )
)<CardProps & React.HTMLProps<HTMLDivElement>>`
  ${card}
`;

export { Card, CardProps };
