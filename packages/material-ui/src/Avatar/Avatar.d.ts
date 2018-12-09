import * as React from 'react';
import { PropsOf } from '..';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Avatar: OverridableComponent<{
  outerProps: {
    alt?: string;
    childrenClassName?: string;
    imgProps?: React.HtmlHTMLAttributes<HTMLImageElement>;
    sizes?: string;
    src?: string;
    srcSet?: string;
  };
  defaultComponent: 'div';
  classKey: AvatarClassKey;
}>;

export type AvatarClassKey = 'root' | 'colorDefault' | 'img';

export type AvatarProps = SimplifiedPropsOf<typeof Avatar>;

export default Avatar;
