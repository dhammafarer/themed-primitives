import { always, identity, prop } from "ramda";
import { getProperty, TemplateFn } from "./getProperty";
import { responsiveTemplate } from "./templates";

const theme = { devices: ["A", "B", "C"] };

describe("getProperty", () => {
  test("outputs empty string when the property isn't found", () => {
    const props = { theme };
    const tfn = responsiveTemplate;
    const fn = () => identity;
    const getter = prop("color");
    const property = "color";

    const expected = "";

    expect(getProperty(tfn)(fn)(getter)(property)(props)).toBe(expected);
  });

  test("works for properties with literal values", () => {
    const tfn = responsiveTemplate;
    const props = { theme, color: "red" };
    const fn = (theme: any) => identity;
    const getter = prop("color");
    const property = "color";

    const expected = "color: red;";

    expect(getProperty(tfn)(fn)(getter)(property)(props)).toBe(expected);
  });

  test("works with a custom function", () => {
    const tfn = responsiveTemplate;
    const props = { theme, color: "red" };
    const fn = (theme: any) => always("pink");
    const getter = prop("color");
    const property = "color";

    const expected = "color: pink;";

    expect(getProperty(tfn)(fn)(getter)(property)(props)).toBe(expected);
  });

  test("works with arrays", () => {
    const theme = { devices: ["A", "B", "C"] };
    const props = { theme, width: [1, 2, 3] };
    const template = responsiveTemplate;
    const fn = (theme: any) => identity;
    const getter = prop("width");
    const property = "width";

    const expected = `A { width: 1; }\nB { width: 2; }\nC { width: 3; }`;

    expect(getProperty(template)(fn)(getter)(property)(props)).toBe(expected);
  });
});
