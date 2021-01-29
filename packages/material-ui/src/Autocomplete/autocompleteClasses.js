import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getAutocompleteUtilityClass(slot) {
  return generateUtilityClass('MuiAutocomplete', slot);
}

const autocompleteClasses = generateUtilityClasses('MuiAutocomplete', [
  'root',
  'fullWidth',
  'focused',
  'tag',
  'tagSizeSmall',
  'tagSizeMedium',
  'hasPopupIcon',
  'inputRoot',
  'input',
  'inputFocused',
  'endAdornment',
  'clearIndicator',
  'popupIndicator',
  'popupIndicatorOpen',
  'popper',
  'popperDisablePortal',
  'paper',
  'listbox',
  'loading',
  'noOptions',
  'option',
  'groupLabel',
  'groupUl',
]);

export default autocompleteClasses;
