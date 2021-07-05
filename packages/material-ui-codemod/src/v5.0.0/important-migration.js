import transformAdapterV4 from './adapter-v4';
import transformAutocompleteRenaming from './autocomplete-rename-closeicon';
import transformAvatarCircular from './avatar-circle-circular';
import transformBadgeOverlap from './badge-overlap-value';
import transformBoxBorderRadius from './box-borderradius-values';
import transformBoxRenameGap from './box-rename-gap';
import transformBoxRenameCss from './box-rename-css';
import transformButtonColorProp from './button-color-prop';
import transformChipVariantProp from './chip-variant-prop';
import transformCircularProgressVariant from './circularprogress-variant';
import transformCollapsedHeight from './collapse-rename-collapsedheight';
import transformCoreStylesImport from './core-styles-import';
import transformCreateTheme from './create-theme';
import transformEmotionPrependCache from './emotion-prepend-cache';
import transformFade from './fade-rename-alpha';
import transformGridJustify from './grid-justify-justifycontent';
import transformGridListComponent from './grid-list-component';
import transformHiddenDownProps from './hidden-down-props';
import transformStyles from './material-ui-styles';
import transformMovedLabModules from './moved-lab-modules';
import transformRootRef from './root-ref';
import transformSkeletonVariant from './skeleton-variant';
import transformStyledEngineProvider from './styled-engine-provider';
import transformThemeAugment from './theme-augment';
import transformThemeBreakpointsWidth from './theme-breakpoints-width';
import transformThemeOptions from './theme-options';
import transformThemePaletteMode from './theme-palette-mode';
import transformThemeProvider from './theme-provider';
import transformThemeSpacing from './theme-spacing';
import transformThemeTypographyRound from './theme-typography-round';
import transformTransitions from './transitions';
import transformTypes from './material-ui-types';
import transformUseTransitionProps from './use-transitionprops';
import transformVariantProp from './variant-prop';
import transformWithWidth from './with-width';
import transformUseAutocomplete from './use-autocomplete';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  file.source = transformAdapterV4(file, api, options);
  file.source = transformAutocompleteRenaming(file, api, options);
  file.source = transformAvatarCircular(file, api, options);
  file.source = transformBadgeOverlap(file, api, options);
  file.source = transformBoxBorderRadius(file, api, options);
  file.source = transformBoxRenameGap(file, api, options);
  file.source = transformBoxRenameCss(file, api, options);
  file.source = transformButtonColorProp(file, api, options);
  file.source = transformChipVariantProp(file, api, options);
  file.source = transformCircularProgressVariant(file, api, options);
  file.source = transformCollapsedHeight(file, api, options);
  file.source = transformCoreStylesImport(file, api, options);
  file.source = transformCreateTheme(file, api, options);
  file.source = transformEmotionPrependCache(file, api, options);
  file.source = transformFade(file, api, options);
  file.source = transformGridJustify(file, api, options);
  file.source = transformGridListComponent(file, api, options);
  file.source = transformHiddenDownProps(file, api, options);
  file.source = transformStyles(file, api, options);
  file.source = transformMovedLabModules(file, api, options);
  file.source = transformRootRef(file, api, options);
  file.source = transformSkeletonVariant(file, api, options);
  file.source = transformStyledEngineProvider(file, api, options);
  file.source = transformThemeAugment(file, api, options);
  file.source = transformThemeBreakpointsWidth(file, api, options);
  file.source = transformThemeOptions(file, api, options);
  file.source = transformThemePaletteMode(file, api, options);
  file.source = transformThemeProvider(file, api, options);
  file.source = transformThemeSpacing(file, api, options);
  file.source = transformThemeTypographyRound(file, api, options);
  file.source = transformTransitions(file, api, options);
  file.source = transformTypes(file, api, options);
  file.source = transformUseTransitionProps(file, api, options);
  file.source = transformVariantProp(file, api, options);
  file.source = transformWithWidth(file, api, options);
  file.source = transformUseAutocomplete(file, api, options);

  return file.source;
}
