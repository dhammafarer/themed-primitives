import chroma from "chroma-js";

export const darken = (color: string) => (v: number) =>
  chroma(color)
    .darken(v)
    .hex();
export const lighten = (color: string) => (v: number) =>
  chroma(color)
    .brighten(v)
    .hex();

export const pxToRem = (n: number, base: number = 16) => n / base;

export const unit = (u: string, xs: number[]) => xs.map(x => `${x}${u}`);
