import React, {PropTypes} from 'react';
import Avatar from '../avatar';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {card} = state.muiTheme;

  return {
    root: {
      padding: 16,
      fontWeight: card.fontWeight,
      boxSizing: 'border-box',
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'top',
      whiteSpace: 'normal',
      paddingRight: '90px',
    },
    avatar: {
      marginRight: 16,
    },
    title: {
      color: props.titleColor || card.titleColor,
      display: 'block',
      fontSize: 15,
    },
    subtitle: {
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
      fontSize: 14,
    },
  };
}

const CardHeader = React.createClass({

  propTypes: {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: PropTypes.bool,

    /**
     * This is the [Avatar](/#/components/avatar) element to be displayed on the Card Header.
     */
    avatar: PropTypes.node,

    /**
     * Can be used to render elements inside the Card Header.
     */
    children: PropTypes.node,

    /**
     * If true, this card component is expandable.
     */
    expandable: PropTypes.bool,

    /**
     * If true, this card component will include a button to expand the card.
     */
    showExpandableButton: PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,

    /**
     * Can be used to render a subtitle in Card Header.
     */
    subtitle: PropTypes.node,

    /**
     * Override the subtitle color.
     */
    subtitleColor: PropTypes.string,

    /**
     * Override the inline-styles of the subtitle.
     */
    subtitleStyle: PropTypes.object,

    /**
     * Override the inline-styles of the text.
     */
    textStyle: PropTypes.object,

    /**
     * Can be used to render a title in Card Header.
     */
    title: PropTypes.node,

    /**
     * Override the title color.
     */
    titleColor: PropTypes.string,

    /**
     * Override the inline-styles of the title.
     */
    titleStyle: PropTypes.object,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

  getDefaultProps() {
    return {
      avatar: null,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const rootStyle = Object.assign(styles.root, this.props.style);
    const textStyle = Object.assign(styles.text, this.props.textStyle);
    const titleStyle = Object.assign(styles.title, this.props.titleStyle);
    const subtitleStyle = Object.assign(styles.subtitle, this.props.subtitleStyle);

    let avatar = this.props.avatar;
    if (React.isValidElement(this.props.avatar)) {
      avatar = React.cloneElement(avatar, {
        style: Object.assign(styles.avatar, avatar.props.style),
      });
    } else if (avatar !== null) {
      avatar = <Avatar src={this.props.avatar} style={styles.avatar} />;
    }

    const {
      title,
      subtitle,
      ...other,
    } = this.props;

    return (
      <div {...other} style={prepareStyles(rootStyle)}>
        {avatar}
        <div style={prepareStyles(textStyle)}>
          <span style={prepareStyles(titleStyle)}>{title}</span>
          <span style={prepareStyles(subtitleStyle)}>{subtitle}</span>
        </div>
        {this.props.children}
      </div>
    );
  },
});

export default CardHeader;
