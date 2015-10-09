const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ContentSort extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
      </SvgIcon>
    );
  }
}

module.exports = ContentSort;
