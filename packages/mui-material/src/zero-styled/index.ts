import { useDefaultProps } from "../DefaultPropsProvider";

export { default as styled } from '../styles/styled';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createUseThemeProps(name: string) {
  return useDefaultProps;
}
