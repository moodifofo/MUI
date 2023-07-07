import {
  unstable_generateUtilityClasses as generateUtilityClasses,
  unstable_generateUtilityClass as generateUtilityClass,
} from '@mui/utils';

export interface BadgeClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the badge `span` element. */
  badge: string;
  /** Styles applied to the badge `span` element if `variant="small"`. */
  small: string;
  /** Styles applied to the badge `span` element if `variant="large"`. */
  large: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }}`. */
  anchorOriginTopRight: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }}`. */
  anchorOriginBottomRight: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }}`. */
  anchorOriginTopLeft: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }}`. */
  anchorOriginBottomLeft: string;
  /** State class applied to the badge `span` element if `invisible={true}`. */
  invisible: string;
  /** Styles applied to the badge `span` element if `color="error"`. */
  colorError: string;
  /** Styles applied to the badge `span` element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the badge `span` element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the badge `span` element if `color="tertiary"`. */
  colorTertiary: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangular"`. */
  anchorOriginTopRightRectangular: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangular"`. */
  anchorOriginBottomRightRectangular: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangular"`. */
  anchorOriginTopLeftRectangular: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangular"`. */
  anchorOriginBottomLeftRectangular: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="circular"`. */
  anchorOriginTopRightCircular: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circular"`. */
  anchorOriginBottomRightCircular: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="circular"`. */
  anchorOriginTopLeftCircular: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circular"`. */
  anchorOriginBottomLeftCircular: string;
  /** Styles applied to the badge `span` element if `overlap="rectangular"`. */
  overlapRectangular: string;
  /** Styles applied to the badge `span` element if `overlap="circular"`. */
  overlapCircular: string;
}

export type BadgeClassKey = keyof BadgeClasses;

export function getBadgeUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeClasses: BadgeClasses = generateUtilityClasses('MuiBadge', [
  'root',
  'badge',
  'small',
  'large',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
  'invisible',
  'colorError',
  'colorPrimary',
  'colorSecondary',
  'colorTertiary',
  'overlapRectangular',
  'overlapCircular',
  // TODO: v6 remove the overlap value from these class keys
  'anchorOriginTopLeftCircular',
  'anchorOriginTopLeftRectangular',
  'anchorOriginTopRightCircular',
  'anchorOriginTopRightRectangular',
  'anchorOriginBottomLeftCircular',
  'anchorOriginBottomLeftRectangular',
  'anchorOriginBottomRightCircular',
  'anchorOriginBottomRightRectangular',
]);

export default badgeClasses;
