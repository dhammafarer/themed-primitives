import { always, identity, prop } from "ramda";
import { getProperty } from "./getProperty";

describe("getProperty", () => {
  test("outputs empty string when the property isn't found", () => {
    const props = {};
    const tfn = undefined;
    const fn = undefined;
    const getter = prop("color");
    const property = "color";

    const expected = "";

    expect(getProperty(tfn)(fn)(getter)(property)(props)).toBe(expected);
  });

  test("works for properties with literal values", () => {
    const tfn = (key: string, val: string, fn: any, theme: any) =>
      `${key}: ${fn(theme)(val)};`;
    const props = { color: "red" };
    const fn = (theme: any) => identity;
    const getter = prop("color");
    const property = "color";

    const expected = "color: red;";

    expect(getProperty(tfn)(fn)(getter)(property)(props)).toBe(expected);
  });

  test("works with a custom function", () => {
    const tfn = (key: string, val: string, fn: any, theme: any) =>
      `${key}: ${fn(theme)(val)};`;
    const props = { color: "red" };
    const fn = (theme: any) => always("pink");
    const getter = prop("color");
    const property = "color";

    const expected = "color: pink;";

    expect(getProperty(tfn)(fn)(getter)(property)(props)).toBe(expected);
  });
  test("supports template functions", () => {
    const template = (property: string, val: number, fn: any, theme: any) =>
      `X { ${property}: ${fn(theme)(val)}; }`;
    const getter = prop("width");
    const fn = (theme: any) => identity;
    const property = "width";
    const props = { width: 1 };

    const expected = `X { width: 1; }`;

    expect(getProperty(template)(fn)(getter)(property)(props)).toBe(expected);
  });

  test("supports responsive template functions", () => {
    const theme = { devices: ["A", "B", "C"] };
    const props = { theme, width: [1, 2, 3] };
    const template = (property: string, vals: number[], fn: any, theme: any) =>
      vals
        .map(
          (x, i) =>
            `${theme.devices[i]} { ${property}: ${fn(theme)(vals[i])}; }`
        )
        .join("\n");
    const fn = (theme: any) => identity;
    const getter = prop("width");
    const property = "width";

    const expected = `A { width: 1; }\nB { width: 2; }\nC { width: 3; }`;

    expect(getProperty(template)(fn)(getter)(property)(props)).toBe(expected);
  });
});
