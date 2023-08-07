'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import accordionDetailsClasses, {
  getAccordionDetailsUtilityClass,
} from './accordionDetailsClasses';
import {
  AccordionDetailsProps,
  AccordionDetailsOwnerState,
  AccordionDetailsTypeMap,
} from './AccordionDetailsProps';
import useSlot from '../utils/useSlot';
import AccordionContext from '../Accordion/AccordionContext';

const useUtilityClasses = (ownerState: AccordionDetailsOwnerState) => {
  const { expanded } = ownerState;
  const slots = {
    root: ['root', expanded && 'expanded'],
    content: ['content', expanded && 'expanded'],
  };

  return composeClasses(slots, getAccordionDetailsUtilityClass, {});
};

const AccordionDetailsRoot = styled('div', {
  name: 'JoyAccordionDetails',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AccordionDetailsOwnerState }>(({ ownerState, theme }) => ({
  overflow: 'hidden',
  borderRadius: 'var(--AccordionDetails-radius)',
  display: 'grid',
  gridTemplateRows: '1fr',
  marginInline: 'calc(-1 * var(--ListItem-paddingLeft)) calc(-1 * var(--ListItem-paddingRight))',
  paddingInlineStart: 'var(--ListItem-paddingLeft)',
  paddingInlineEnd: 'var(--ListItem-paddingRight)',
  paddingBlockStart: 'calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px))',
  paddingBlockEnd: 'calc(2 * var(--ListItem-paddingY))',
  transition: 'var(--AccordionDetails-transition)',
  ...theme.variants[ownerState.variant!]?.[ownerState.color!],
  [`&:not(.${accordionDetailsClasses.expanded})`]: {
    gridTemplateRows: '0fr',
    paddingBlock: 0,
  },
}));

/**
 * The content slot is required because the root slot is a CSS Grid, it needs a child.
 */
const AccordionDetailsContent = styled('div', {
  name: 'JoyAccordionDetails',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AccordionDetailsOwnerState }>({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // required for user-provided transition to work
});

/**
 * ⚠️ AccordionDetails must be used as a direct child of the [Card](https://mui.com/joy-ui/react-card/) component.
 *
 * Demos:
 *
 * - [Accordion](https://mui.com/joy-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionDetails API](https://mui.com/joy-ui/api/accordion-details/)
 */
const AccordionDetails = React.forwardRef(function AccordionDetails(inProps, ref) {
  const props = useThemeProps<typeof inProps & AccordionDetailsProps>({
    props: inProps,
    name: 'JoyAccordionDetails',
  });

  const {
    component = 'div',
    children,
    color = 'neutral',
    variant = 'plain',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const { accordionId, expanded = false } = React.useContext(AccordionContext);

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    color,
    variant,
    expanded,
    nesting: true, // for the List styles
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: AccordionDetailsRoot,
    externalForwardedProps,
    additionalProps: {
      'aria-labelledby': accordionId,
      role: 'region',
      hidden: expanded ? undefined : true,
    },
    ownerState,
  });

  const [SlotContent, contentProps] = useSlot('content', {
    ref,
    className: classes.content,
    elementType: AccordionDetailsContent,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <SlotContent {...contentProps}>{children}</SlotContent>
    </SlotRoot>
  );
}) as OverridableComponent<AccordionDetailsTypeMap>;

AccordionDetails.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the AccordionDetails if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    content: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default AccordionDetails;
