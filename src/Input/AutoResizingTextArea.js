// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import classnames from 'classnames';
import EventListener from 'react-event-listener';
import customPropTypes from '../utils/customPropTypes';

const rowsHeight = 24;

export const styleSheet = createStyleSheet('MuiTextarea', () => {
  return {
    root: {
      position: 'relative', // because the shadow has position: 'absolute',
      'margin-bottom': '-4px', // this is an unfortunate hack
    },
    textarea: {
      width: '100%',
      resize: 'none',
      font: 'inherit',
      padding: 0,
      cursor: 'inherit',
      boxSizing: 'border-box',
      lineHeight: 'inherit',
      border: 'none',
      outline: 'none',
      'background-color': 'rgba(0,0,0,0)',
    },
    shadow: {
      resize: 'none',
      // Overflow also needed to here to remove the extra row
      // added to textareas in Firefox.
      overflow: 'hidden',
      // Visibility needed to hide the extra text area on ipads
      visibility: 'hidden',
      position: 'absolute',
      height: 'auto',
      whiteSpace: 'pre-wrap',
    },
  };
});

/**
 * Input
 */
export default class AutoResizingTextArea extends Component {
  shadow: HTMLInputElement;
  singleLineShadow: HTMLInputElement;
  input: HTMLInputElement;

  static propTypes = {
    /**
     * Override the inline-styles of the root element.
     */
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    hintText: PropTypes.string,
    onChange: PropTypes.func,
    onHeightChange: PropTypes.func,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    shadowClassName: PropTypes.object,
    value: PropTypes.string,
  };

  static defaultProps = {
    rows: 1,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    height: null,
    dirty: !!this.props.defaultValue,
  };

  componentWillMount() {
    this.setState({
      height: this.props.rows * rowsHeight,
    });
  }

  componentDidMount() {
    this.syncHeightWithShadow();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value ||
        nextProps.rowsMax !== this.props.rowsMax) {
      this.syncHeightWithShadow(nextProps.value, null, nextProps);
    }
  }

  handleResize = (event) => {
    this.syncHeightWithShadow(undefined, event);
  };

  getInputNode() {
    return this.input;
  }

  setValue(value) {
    this.getInputNode().value = value;
    this.syncHeightWithShadow(value);
  }

  syncHeightWithShadow(newValue, event, props) {
    const shadow = this.shadow;
    const singleLineShadow = this.singleLineShadow;

    const hasNewValue = (newValue && newValue !== '');
    const displayText = this.props.hintText && !hasNewValue ? this.props.hintText : newValue;

    if (displayText !== undefined) {
      shadow.value = displayText;
    }

    const lineHeight = singleLineShadow.scrollHeight;
    let newHeight = shadow.scrollHeight;

    // Guarding for jsdom, where scrollHeight isn't present.
    // See https://github.com/tmpvar/jsdom/issues/1013
    if (newHeight === undefined) return;

    props = props || this.props;

    if (props.rowsMax >= props.rows) {
      newHeight = Math.min(props.rowsMax * lineHeight, newHeight);
    }

    newHeight = Math.max(newHeight, lineHeight);

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight,
      });

      if (props.onHeightChange) {
        props.onHeightChange(event, newHeight);
      }
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.syncHeightWithShadow(value);
    this.setState({
      dirty: value.length > 0,
    });
    setTimeout(() => { // this needs to run after the above state is set.
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    }, 0);
  };

  render() {
    const {
      onChange,
      onHeightChange,
      rows,
      rowsMax,
      hintText,
      className,
      ...other
    } = this.props;

    const { styleManager } = this.context;
    const classes = styleManager.render(styleSheet);

    return (
      <div className={classnames(classes.root, className)}>
        <EventListener target="window" onResize={this.handleResize} />
        <textarea
          ref={(c) => { this.singleLineShadow = c; }}
          className={classnames(classes.shadow, classes.textarea)}
          tabIndex="-1"
          rows={1}
          readOnly
          value={''}
        />
        <textarea
          ref={(c) => { this.shadow = c; }}
          className={classnames(classes.shadow, classes.textarea)}
          tabIndex="-1"
          rows={this.props.rows}
          defaultValue={this.props.defaultValue}
          readOnly
          value={this.props.value}
        />
        <textarea
          {...other}
          ref={(c) => { this.input = c; }}
          rows={this.props.rows}
          className={classes.textarea}
          style={{ height: this.state.height }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
