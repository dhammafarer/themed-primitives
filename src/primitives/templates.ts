import { isEmpty } from "ramda";

type Fn<T, V> = (theme: T) => (val: V) => string | number;

export const template = <T, V>(key: string, val: V, fn: Fn<T, V>, theme: T) =>
  isEmpty(val) ? "" : `${key}: ${fn(theme)(val)};`;

type ResponsiveT = { devices: string[] };

export const responsiveTemplate = <T extends ResponsiveT, V>(
  key: string,
  val: V | V[],
  fn: Fn<T, V>,
  theme: T
) => {
  if (Array.isArray(val)) {
    return val
      .map((v, i) => `${theme.devices[i]} { ${key}: ${fn(theme)(v)}; }`)
      .join("\n");
  } else {
    return template(key, val, fn, theme);
  }
};
