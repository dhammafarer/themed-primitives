import { template, responsiveTemplate } from "./templates";

describe("template", () => {
  test("returns empty string for empty string value", () => {
    const key = "padding";
    const val = "";
    const theme = {};
    const fn = (t: typeof theme) => (val: string) => val;
    const expected = "";

    expect(template(key, val, fn, theme)).toBe(expected);
  });

  test("works with an identity function", () => {
    const key = "padding";
    const val = 1;
    const theme = {};
    const fn = (t: typeof theme) => (val: number) => val;
    const expected = "padding: 1;";

    expect(template(key, val, fn, theme)).toBe(expected);
  });

  test("works with an accessor function", () => {
    const key = "padding";
    const val = 1;
    const theme = { sizes: ["0px", "2px"] };
    const fn = (t: typeof theme) => (val: number) => theme.sizes[val];
    const expected = "padding: 2px;";

    expect(template(key, val, fn, theme)).toBe(expected);
  });
});

describe("responsiveTemplate", () => {
  test("returns empty string for empty string value", () => {
    const key = "padding";
    const val = "";
    const theme = { devices: ["A", "B"] };
    const fn = (t: typeof theme) => (val: string) => val;
    const expected = "";

    expect(responsiveTemplate(key, val, fn, theme)).toBe(expected);
  });

  test("works with a literal value", () => {
    const key = "padding";
    const val = 1;
    const theme = { devices: ["A", "B"] };
    const fn = (t: typeof theme) => (val: number) => val;
    const expected = "padding: 1;";

    expect(responsiveTemplate(key, val, fn, theme)).toBe(expected);
  });

  test("returns empty string for an empty array", () => {
    const key = "padding";
    const val: string[] = [];
    const theme = { devices: ["A", "B"] };
    const fn = (t: typeof theme) => (val: string) => val;
    const expected = "";

    expect(responsiveTemplate(key, val, fn, theme)).toBe(expected);
  });

  test("works with arrays", () => {
    const key = "padding";
    const val = [1, 2];
    const theme = { devices: ["A", "B"] };
    const fn = (t: typeof theme) => (val: number) => val;
    const expected = "A { padding: 1; }\nB { padding: 2; }";

    expect(responsiveTemplate(key, val, fn, theme)).toBe(expected);
  });

  test("works with arrays and accessor functions", () => {
    const key = "padding";
    const val = [0, 1];
    const theme = { devices: ["A", "B"], sizes: ["0px", "2px"] };
    const fn = (t: typeof theme) => (val: number) => theme.sizes[val];
    const expected = "A { padding: 0px; }\nB { padding: 2px; }";

    expect(responsiveTemplate(key, val, fn, theme)).toBe(expected);
  });
});
