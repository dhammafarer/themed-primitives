import { always, identity, prop } from "ramda";
import { getP, getProperty, getWithDirections } from "./getters";

test("getProperty works for properties with literal values", () => {
  const props = { color: "red" };
  const fn = identity;
  const getter = prop("color");
  const property = "color";

  const expected = "color: red;";

  expect(getProperty(fn)(getter)(property)(props)).toBe(expected);
});

test("getProperty works for with a custom function", () => {
  const props = { color: "red" };
  const fn = always("pink");
  const getter = prop("color");
  const property = "color";

  const expected = "color: pink;";

  expect(getProperty(fn)(getter)(property)(props)).toBe(expected);
});

test("getP supports template functions", () => {
  const template = (property: string, vals: number[], fn: any) =>
    `X { ${property}: ${fn(vals[0])}; }`;
  const fn = (x: any) => `${x * 100}%`;
  const getter = prop("width");
  const property = "width";
  const props = { width: [1 / 2] };

  const expected = `X { width: 50%; }`;

  expect(getP(template)(fn)(getter)(property)(props)).toBe(expected);
});

test("getWithDirections outputs a set of properties with directions", () => {
  const props = { pl: 1, px: 2 };
  const fn = identity;
  const property = "padding";
  const dps = [
    { dir: "left", l: ["l", "x", ""] },
    { dir: "right", l: ["r", "x", ""] },
    { dir: "top", l: ["t", "y", ""] },
    { dir: "bottom", l: ["b", "y", ""] },
  ];

  const expected = "padding-left: 1;\npadding-right: 2;";

  expect(getWithDirections(dps)(fn)(property)(props)).toBe(expected);
});
