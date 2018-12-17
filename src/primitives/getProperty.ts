import { ifElse, always, isNil } from "ramda";

export const getProperty = (tfn: any) => (fn: any) => (getter: any) => (
  key: string
) => (props: any) =>
  ifElse(isNil, always(""), val => tfn(key, val, fn, props.theme))(
    getter(props)
  );
