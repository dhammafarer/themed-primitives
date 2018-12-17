import { identity } from "ramda";
import { getWithDirections } from "./getWithDirections";

describe("getWithDirections", () => {
  test("outputs a set of properties with directions", () => {
    const props = { pl: 1, px: 2 };
    const tfn = (k: number, v: number, fn: any, theme: any) =>
      `${k}: ${fn(theme)(v)};`;
    const fn = (theme: any) => identity;
    const property = "padding";
    const dps = [
      { dir: "left", l: ["l", "x", ""] },
      { dir: "right", l: ["r", "x", ""] },
      { dir: "top", l: ["t", "y", ""] },
      { dir: "bottom", l: ["b", "y", ""] },
    ];

    const expected = "padding-left: 1;\npadding-right: 2;";

    expect(getWithDirections(dps)(tfn)(fn)(property)(props)).toBe(expected);
  });
});
