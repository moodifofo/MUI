import * as React from 'react';
import PropTypes from 'prop-types';

export default class MenuState extends React.Component {
  state = { anchorEl: null };

  open = eventOrAnchorEl =>
    this.setState({
      anchorEl:
        eventOrAnchorEl && eventOrAnchorEl.target ? eventOrAnchorEl.target : eventOrAnchorEl,
    });

  close = () => this.setState({ anchorEl: null });

  render() {
    const { open, close } = this;
    const { menuId, children } = this.props;
    const { anchorEl } = this.state;

    const isOpen = Boolean(anchorEl);

    return children({
      open,
      close,
      isOpen,
      bindTrigger: {
        'aria-owns': isOpen ? menuId : null,
        'aria-haspopup': true,
        onClick: open,
      },
      bindMenu: {
        id: menuId,
        anchorEl,
        open: isOpen,
        onClose: close,
      },
    });
  }
}

MenuState.propTypes = {
  /**
   * The render function.  It will be called with a single object with the
   * following properties:
   * - `open(eventOrAnchorEl)` - calling this will open the menu
   * - `close()` - calling this will close the menu
   * - `isOpen` - `true`/`false` if the menu is open/closed
   * - `bindTrigger` - a set of properties to pass to the menu trigger, including
   *   an `onClick` property that will open the menu
   * - `bindMenu` - a set of properties to pass to the `Menu` component
   */
  children: PropTypes.func.isRequired,
  /**
   * The `id` property to use for the `Menu`.  Will be passed to the render
   * function as `bindMenu.id`, and also used for the `aria-owns` property
   * passed to the trigger component via `bindTrigger`.
   */
  menuId: PropTypes.string,
};
