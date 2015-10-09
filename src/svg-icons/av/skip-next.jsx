const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvSkipNext extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvSkipNext;
