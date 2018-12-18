import { identity } from "ramda";
import { getWithDirections } from "./getWithDirections";
import { responsiveTemplate } from "./templates";

const theme = { devices: ["A", "B", "C"] };

describe("getWithDirections", () => {
  test("outputs a set of properties with directions", () => {
    const props = { theme, pl: 1, px: 2 };
    const tfn = responsiveTemplate;
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

  test("works with arrays", () => {
    const props = { theme, pl: [1, 2], px: 2 };
    const tfn = responsiveTemplate;
    const fn = (theme: any) => identity;
    const property = "padding";
    const dps = [
      { dir: "left", l: ["l", "x", ""] },
      { dir: "right", l: ["r", "x", ""] },
      { dir: "top", l: ["t", "y", ""] },
      { dir: "bottom", l: ["b", "y", ""] },
    ];

    const expected =
      "A { padding-left: 1; }\nB { padding-left: 2; }\npadding-right: 2;";

    expect(getWithDirections(dps)(tfn)(fn)(property)(props)).toBe(expected);
  });
});
