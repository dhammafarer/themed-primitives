import { ifElse, always, isNil } from "ramda";

type Key = string;
type Value = any;
type Props = any;
type PropValue = any;
type PropReader = (p: Props) => PropValue;
type Accessor = (theme: any) => (val: PropValue) => Value;
type Theme = any;
type TemplateFn = (
  k: Key,
  val: PropValue,
  fn: Accessor,
  theme: Theme
) => string;

export const getProperty = (tfn: TemplateFn) => (fn: Accessor) => (
  gfn: PropReader
) => (key: Key) => (props: Props) =>
  ifElse(isNil, always(""), val => tfn(key, val, fn, props.theme))(gfn(props));

export { Accessor, Key, Props, TemplateFn };
