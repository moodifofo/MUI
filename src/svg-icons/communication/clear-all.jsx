const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class CommunicationClearAll extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"/>
      </SvgIcon>
    );
  }
}

module.exports = CommunicationClearAll;
