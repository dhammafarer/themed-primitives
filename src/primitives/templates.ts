import { isEmpty } from "ramda";
import { TemplateFn } from "./getProperty";

export const template: TemplateFn = (key, val, fn, theme) =>
  isEmpty(val) ? "" : `${key}: ${fn(theme)(val)};`;

export const responsiveTemplate: TemplateFn = (key, val, fn, theme) => {
  if (Array.isArray(val)) {
    return val
      .map((v, i) => `${theme.devices[i]} { ${key}: ${fn(theme)(v)}; }`)
      .join("\n");
  } else {
    return template(key, val, fn, theme);
  }
};
