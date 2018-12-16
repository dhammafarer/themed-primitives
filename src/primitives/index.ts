import { Scale, styled, css, fns } from "../theme";
import { getP, getProperty, getLiteral, getWithDirections } from "./getters";
import { prop } from "ramda";

type ResponsiveString = string | string[];
type ResponsiveScale = Scale | Scale[];

// directions map
const dps = [
  { dir: "left", l: ["l", "x", ""] },
  { dir: "right", l: ["r", "x", ""] },
  { dir: "top", l: ["t", "y", ""] },
  { dir: "bottom", l: ["b", "y", ""] },
];

const responsiveTemplate = (
  property: string,
  val: any | any[],
  fn: any,
  theme: any
) => {
  if (Array.isArray(val)) {
    return val.map(
      (v: any, i: number) => `${theme.devices[i]} { ${property}: ${fn(v)}; }`
    );
  } else {
    return `${property}: ${fn(val)};`;
  }
};

const getResponsive = getP(responsiveTemplate);

const getDirectionalProperty = getWithDirections(dps)(responsiveTemplate)(
  fns.space
);
const getPadding = getDirectionalProperty("padding");
const getMargins = getDirectionalProperty("margin");

const getFromColor = getProperty(fns.color);
const getBackground = getFromColor(prop("bg"))("background");
const getColor = getFromColor(prop("color"))("color");
const getBorderColor = getFromColor(prop("borderColor"))("border-color");
const getBorderLeftColor = getFromColor(prop("blc"))("border-left-color");
const getBorderRightColor = getFromColor(prop("brc"))("border-right-color");
const getBorderTopColor = getFromColor(prop("btc"))("border-top-color");
const getBorderBottomColor = getFromColor(prop("bbc"))("border-bottom-color");

const getBoxShadow = getProperty(fns.shadow)(prop("shadow"))("box-shadow");
//const getBorder = getProperty(fns.border)(prop("border"))("border");
const getBorder = getWithDirections(dps)(responsiveTemplate)(fns.border)(
  "border"
);
const getBorderRadius = getProperty(fns.radius)(prop("radius"))(
  "border-radius"
);

const getFontWeight = getProperty(fns.fontWeight)(prop("fontWeight"))(
  "font-weight"
);
const getFontFamily = getProperty(fns.fontFamily)(prop("fontFamily"))(
  "font-family"
);

const getLineHeight = getProperty(fns.lineHeight)(prop("lineHeight"))(
  "line-height"
);
const getLetterSpacing = getProperty(fns.letterSpacing)(prop("letterSpacing"))(
  "letter-spacing"
);
const getTextTransform = getLiteral(prop("textTransform"))("text-transform");
const getTextAlign = getLiteral(prop("textAlign"))("text-align");
const getOpacity = getLiteral(prop("opacity"))("opacity");

type Width = string | number;
const parseWidth = (theme: any) => (v: Width) =>
  typeof v === "number" ? `${v * 100}%` : v;
const getWidth = getResponsive(parseWidth)(prop("width"))("width");

const getFontSize = getResponsive(fns.fontSize)(prop("fontSize"))("font-size");

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

interface BoxProps extends SpaceProps {
  bg?: string;
  color?: string;
  width?: string | number | number[] | string[];
}

interface FlexProps extends BoxProps {
  flexDirection?: ResponsiveString;
  justifyContent?: ResponsiveString;
  alignItems?: ResponsiveString;
  flexWrap?: ResponsiveString;
  spacing?: Scale;
}

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
  blc?: string;
  brc?: string;
  btc?: string;
  bbc?: string;
  borderColor?: string;
}

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

interface TextProps extends BoxProps {
  fontFamily?: string;
  fontSize?: ResponsiveScale;
  fontWeight?: ResponsiveScale;
  shadow?: ResponsiveScale;
  textTransform?: ResponsiveString;
  textAlign?: ResponsiveString;
  lineHeight?: ResponsiveString;
  letterSpacing?: ResponsiveString;
}

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

const flex = css<FlexProps>`
  display: flex;
  flex-shrink: 0;
  ${box}
  ${props => css`
    ${getLiteral(prop("flexDirection"))("flex-direction")(props)}
    ${getLiteral(prop("flexWrap"))("flex-wrap")(props)}
    ${getLiteral(prop("justifyContent"))("justify-content")(props)}
    ${getLiteral(prop("alignItems"))("align-items")(props)}
  `}
  ${props =>
    props.spacing &&
    props.spacing > 0 &&
    css`
      padding: ${props.theme.sizes[props.spacing - 1]};
      & > * {
        padding: ${props.theme.sizes[props.spacing - 1]};
      }
    `}
`;

const card = css<CardProps>`
  overflow: hidden;
  flex-direction: column;
  ${flex}
  ${props => css`
    ${getOpacity(props)}
    ${getBoxShadow(props)}
    ${getBorder(props)}
    ${getBorderColor(props)}
    ${getBorderLeftColor(props)}
    ${getBorderRightColor(props)}
    ${getBorderTopColor(props)}
    ${getBorderBottomColor(props)}
    ${getBorderRadius(props)}
  `}
`;

const text = css<TextProps>`
  font-family: ${props => props.theme.fonts.sans};
  ${box}
  ${props => css`
    ${getFontSize(props)}
    ${getFontWeight(props)}
    ${getFontFamily(props)}
    ${getLineHeight(props)}
    ${getLetterSpacing(props)}
    ${getTextTransform(props)}
    ${getTextAlign(props)}
  `}
`;

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
  `}
`;

export const Box = styled.div<BoxProps>`
  ${box}
`;
export const Flex = styled.div<FlexProps>`
  ${flex}
`;
export const Card = styled.div<CardProps>`
  ${card}
`;
export const Text = styled.p<TextProps>`
  ${text}
`;
export const Button = styled.button<ButtonProps>`
  ${button}
`;

export { BoxProps, FlexProps, TextProps, CardProps, ButtonProps };
