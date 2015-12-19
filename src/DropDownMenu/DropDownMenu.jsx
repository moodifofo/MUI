import React from 'react';
import Transitions from '../styles/transitions';
import DropDownArrow from '../svg-icons/navigation/arrow-drop-down';
import Menu from '../menus/menu';
import MenuItem from '../menus/menu-item';
import ClearFix from '../clearfix';
import Popover from '../popover/popover';
import PopoverAnimationFromTop from '../popover/popover-animation-from-top';
import styleUtils from '../utils/styles';
import muiThemeable from '../muiThemeable';
import warning from 'warning';
import deprecated from '../utils/deprecatedPropType';

let DropDownMenu = React.createClass({

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    /**
     * The width will automatically be set according to the items inside the menu.
     * To control this width in css instead, set this prop to false.
     */
    autoWidth: React.PropTypes.bool,

    /**
     * The `MenuItem`s to populate the `Menu` with. If the `MenuItems` have the
     * prop `label` that value will be used to render the representation of that
     * item within the field.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Disables the menu.
     */
    disabled: React.PropTypes.bool,

    /**
     * `DropDownMenu` will use this member to display
     * the name of the item.
     */
    displayMember: deprecated(React.PropTypes.string,
      'Instead, use composability.'),

    /**
     * Overrides the styles of icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * `DropDownMenu` will use this member to display
     * the name of the item on the label.
     */
    labelMember: deprecated(React.PropTypes.string,
      'Instead, use composability.'),

    /**
     * Overrides the styles of label when the `DropDownMenu` is inactive.
     */
    labelStyle: React.PropTypes.object,

    /**
     * The maximum height of the `Menu` when it is displayed.
     */
    maxHeight: React.PropTypes.number,

    /**
     * JSON data representing all menu items in the dropdown.
     */
    menuItems: deprecated(React.PropTypes.array,
      'Instead, use composability.'),

    /**
     * Overrides the styles of `Menu` when the `DropDownMenu` is displayed.
     */
    menuStyle: React.PropTypes.object,

    /**
     * Fired when a menu item is clicked that is not the one currently selected.
     */
    onChange: React.PropTypes.func,

    /**
     * Set to true to have the `DropDownMenu` automatically open on mount.
     */
    openImmediately: React.PropTypes.bool,

    /**
     * Index of the item selected.
     */
    selectedIndex: deprecated(React.PropTypes.number,
      'Use value instead to control the component.'),

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Overrides the inline-styles of the underline.
     */
    underlineStyle: React.PropTypes.object,

    /**
     * The value that is currently selected.
     */
    value: React.PropTypes.any,

    /**
     * Two-way binding link.
     */
    valueLink: deprecated(React.PropTypes.object,
      'It\'s deprecated by React too.'),

    /**
     * `DropDownMenu` will use this member as the value representing an item.
     */
    valueMember: deprecated(React.PropTypes.string,
      'Instead, use composability.'),
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      disabled: false,
      openImmediately: false,
      maxHeight: 500,
    };
  },

  getInitialState() {
    return {
      open: this.props.openImmediately,
      selectedIndex: this._isControlled() ? null : (this.props.selectedIndex || 0),
    };
  },

  componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props.selectedIndex);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.autoWidth) this._setWidth();
    if (nextProps.hasOwnProperty('value') || nextProps.hasOwnProperty('valueLink')) {
      return;
    }
    else if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps.selectedIndex);
    }
  },

  getStyles() {
    const {_muiTheme, disabled} = this.props;
    const spacing = _muiTheme.rawTheme.spacing;
    const palette = _muiTheme.rawTheme.palette;
    const accentColor = _muiTheme.dropDownMenu.accentColor;
    return {
      control: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        height: '100%',
        position: 'relative',
        width: '100%',
      },
      icon: {
        fill: accentColor,
        position: 'absolute',
        right: spacing.desktopGutterLess,
        top: ((spacing.desktopToolbarHeight - 24) / 2),
      },
      label: {
        color: disabled ? palette.disabledColor : palette.textColor,
        lineHeight: `${spacing.desktopToolbarHeight}px`,
        opacity: 1,
        position: 'relative',
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.iconSize +
                      spacing.desktopGutterLess +
                      spacing.desktopGutterMini,
        top: 0,
      },
      labelWhenOpen: {
        opacity: 0,
        top: (spacing.desktopToolbarHeight / 8),
      },
      rootWhenOpen: {
        opacity: 1,
      },
      root: {
        display: 'inline-block',
        fontSize: spacing.desktopDropDownMenuFontSize,
        height: spacing.desktopSubheaderHeight,
        outline: 'none',
        position: 'relative',
        transition: Transitions.easeOut(),
      },
      underline: {
        borderTop: `solid 1px ${accentColor}`,
        bottom: 1,
        left: 0,
        margin: `-1px ${spacing.desktopGutter}px`,
        right: 0,
        position: 'absolute',
      },
    };
  },

  getInputNode() {
    warning(false, `The imperative method getInputNode will be removed in favor of composability.`);
    const root = this.refs.root;
    const item = this.props.menuItems && this.props.menuItems[this.state.selectedIndex];
    if (item) {
      root.value = item[this.props.displayMember || 'text'];
    }

    return root;
  },

  render() {
    const {
      _muiTheme,
      autoWidth,
      children,
      className,
      displayMember,
      iconStyle,
      labelMember,
      labelStyle,
      maxHeight,
      menuItems,
      menuStyle,
      style,
      underlineStyle,
      valueLink,
      valueMember,
      ...other,
    } = this.props;

    const {
      anchorEl,
      open,
    } = this.state;

    const styles = this.getStyles();

    let value;
    let selectedIndex = this._isControlled() ? null : this.state.selectedIndex;

    if (menuItems && typeof selectedIndex === 'number') {
      warning(menuItems[selectedIndex],
        `SelectedIndex of ${selectedIndex} does not exist in menuItems.`);
    }

    let valueMember2 = valueMember || 'payload';

    if (valueMember2 && this._isControlled()) {
      value = this.props.hasOwnProperty('value') ? this.props.value : valueLink.value;
      if (menuItems && value !== null && value !== undefined) {
        for (let i = 0; i < menuItems.length; i++) {
          if (menuItems[i][valueMember2] === value) {
            selectedIndex = i;
          }
        }
      }
    }

    let displayValue = '';
    if (menuItems) {
      const selectedItem = menuItems[selectedIndex];
      if (selectedItem) {
        displayValue = selectedItem[labelMember || 'text'] || selectedItem[displayMember || 'text'];
      }
    } else {
      React.Children.forEach(children, child => {
        if (value === child.props.value) {
          // This will need to be improved (in case primaryText is a node)
          displayValue = child.props.label || child.props.primaryText;
        }
      });
    }

    let index = 0;
    const menuItemElements = menuItems
      ? menuItems.map((item, idx) => (
          <MenuItem
            key={idx}
            primaryText={item[displayMember || 'text']}
            value={item[valueMember2]}
            onTouchTap={this._onMenuItemTouchTap.bind(this, idx, item[valueMember2])} />
        ))
      : React.Children.map(children, child => {
        const clone = React.cloneElement(child, {
          onTouchTap: this._onMenuItemTouchTap.bind(this, index, child.props.value),
        }, child.props.children);
        index += 1;
        return clone;
      });

    let popoverStyle;
    if (anchorEl && !autoWidth) {
      popoverStyle = {width: anchorEl.clientWidth};
    }

    return (
      <div
        {...other}
        ref="root"
        className={className}
        style={styleUtils.prepareStyles(_muiTheme, styles.root, open && styles.rootWhenOpen, style)}
      >
        <ClearFix style={styleUtils.merge(styles.control)} onTouchTap={this._onControlTouchTap}>
          <div style={styleUtils.prepareStyles(_muiTheme, styles.label, open && styles.labelWhenOpen, labelStyle)}>
            {displayValue}
          </div>
          <DropDownArrow style={styleUtils.merge(styles.icon, iconStyle)}/>
          <div style={styleUtils.prepareStyles(_muiTheme, styles.underline, underlineStyle)}/>
        </ClearFix>
        <Popover
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          anchorEl={anchorEl}
          style={popoverStyle}
          animation={PopoverAnimationFromTop}
          open={open}
          onRequestClose={this._onMenuRequestClose} >
          <Menu
            maxHeight={maxHeight}
            desktop={true}
            value={value}
            style={menuStyle}
            >
            {menuItemElements}
          </Menu>
        </Popover>
      </div>
    );
  },

  _setWidth() {
    const el = this.refs.root;
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
    }
  },

  _setSelectedIndex(index) {
    warning(index >= 0, 'Cannot set selectedIndex to a negative index.');
    this.setState({selectedIndex: (index >= 0) ? index : 0});
  },

  _onControlTouchTap(event) {
    event.preventDefault();
    if (!this.props.disabled) {
      this.setState({
        open: !this.state.open,
        anchorEl: this.refs.root,
      });
    }
  },

  _onMenuItemTouchTap(key, payload, e) {
    const {
      onChange,
      menuItems,
      value,
      valueLink,
      valueMember,
    } = this.props;

    if (menuItems && (this.state.selectedIndex !== key || e.target.value !== value)) {
      const selectedItem = menuItems[key];
      if (selectedItem) {
        e.target.value = selectedItem[valueMember || 'payload'];
      }
      this._onMenuRequestClose();
    }

    if (valueLink) {
      valueLink.requestChange(e.target.value);
    } else if (onChange) {
      onChange(e, key, payload);
    }

    this.setState({
      selectedIndex: key,
      open: false,
    });
  },

  _onMenuRequestClose() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

});

DropDownMenu = muiThemeable(DropDownMenu);

export default DropDownMenu;
