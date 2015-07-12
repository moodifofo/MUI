let React = require('react');
let CssEvent = require('./utils/css-event');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let ClickAwayable = require('./mixins/click-awayable');
let FlatButton = require('./flat-button');
let IconButton = require('./icon-button');
let NavigationClose = require('./svg-icons/navigation/close');



let Snackbar = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  manuallyBindClickAway: true,

  // ID of the active timer.
  _autoHideTimerId: undefined,

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    message: React.PropTypes.string.isRequired,
    action: React.PropTypes.string,
    autoHideDuration: React.PropTypes.number,
    onActionTouchTap: React.PropTypes.func,
    openOnMount: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      open: this.props.openOnMount || false,
    };
  },

  componentClickAway() {
    this.dismiss();
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._setAutoHideTimer();

        //Only Bind clickaway after transition finishes
        CssEvent.onTransitionEnd(React.findDOMNode(this), () => {
          this._bindClickAway();
        });
      }
      else {
        this._unbindClickAway();
      }
    }
  },

  getTheme() {
    return this.context.muiTheme.component.snackbar;
  },

  getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles() {
    let styles = {
      root: {
         display: 'flex',
         flexDirection: 'row',
        color: this.getTheme().textColor,
        backgroundColor: this.getTheme().backgroundColor,
        borderRadius: 2,
        padding: '0 0 0 ' + this.getSpacing().desktopGutter + 'px',
        height: this.getSpacing().desktopSubheaderHeight,
        lineHeight: this.getSpacing().desktopSubheaderHeight + 'px',
        minWidth: 288,
        maxWidth: 568,

        position: 'fixed',
        zIndex: 10,
        bottom: this.getSpacing().desktopGutter,
        marginLeft: this.getSpacing().desktopGutter,

        left: -10000,
        opacity: 0,
        transform: 'translate3d(0, 20px, 0)',
        transition:
          Transitions.easeOut('0ms', 'left', '400ms') + ',' +
          Transitions.easeOut('400ms', 'opacity') + ',' +
          Transitions.easeOut('400ms', 'transform'),
      },
      action: {
        order:3,
        color: '#778DC5',
        float: 'right',
        marginTop: 2,
        marginRight: -16,
        marginLeft: 0,
        backgroundColor: 'transparent',
        textTransform: 'none'
      },
      rootWhenOpen: {
        left: '0px',
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        transition:
          Transitions.easeOut('0ms', 'left', '0ms') + ',' +
          Transitions.easeOut('400ms', 'opacity', '0ms') + ',' +
          Transitions.easeOut('400ms', 'transform', '0ms'),
      },
    };

    return styles;
  },

  render() {
    let styles = this.getStyles();

    let action;
    if (this.props.action) {
      action = (
        <FlatButton
          style={styles.action}
          label={this.props.action}
          onTouchTap={this.props.onActionTouchTap} />
      );
    }

    let rootStyles = this.state.open ?
      this.mergeStyles(styles.root, styles.rootWhenOpen, this.props.style) :
      this.mergeStyles(styles.root, this.props.style);

    return (
      <span style={rootStyles}>
          <span style={{order:1}}>{this.props.message}</span>
          <span style={{order:2, borderRight: '1px solid #888', marginLeft: '20px', marginTop: '10px', marginBottom: '10px'}}></span>
          {action}
          <IconButton style={{order:4}} onTouchTap={this.dismiss}><NavigationClose /></IconButton>
      </span>
    );
  },

  show() {
    this.setState({ open: true });
  },

  dismiss() {
    this._clearAutoHideTimer();
    this.setState({ open: false });
  },

  _clearAutoHideTimer() {
    if (this._autoHideTimerId !== undefined) {
      this._autoHideTimerId = clearTimeout(this._autoHideTimerId);
    }
  },

  _setAutoHideTimer() {
    if (this.props.autoHideDuration > 0) {
      console.log("_setAutoHideTimer: " + this.props.autoHideDuration);
      this._clearAutoHideTimer();
      this._autoHideTimerId = setTimeout(() => { this.dismiss(); }, this.props.autoHideDuration);
    }
  },

});

module.exports = Snackbar;
