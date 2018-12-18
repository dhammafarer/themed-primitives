import { map, ifElse, always, isNil } from "ramda";

type Key = string;
type Value = any;
type Props = any;
type PropValue = any;
type PropReader = (p: Props) => PropValue;
type Accessor = (theme: any) => (val: PropValue) => Value;
type Theme = any;
type Devices = string[];
type TemplateFn = (k: Key, val: PropValue, devices: Devices) => string;

export const getProperty = (tfn: TemplateFn) => (fn: Accessor) => (
  reader: PropReader
) => (key: Key) => (props: Props) =>
  ifElse(isNil, always(""), val => {
    const f = fn(props.theme);
    const processed = Array.isArray(val) ? map(f, val) : f(val);
    return tfn(key, processed, props.theme.devices);
  })(reader(props));

export { Accessor, Key, Props, TemplateFn };
