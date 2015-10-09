const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorVerticalAlignCenter extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorVerticalAlignCenter;
