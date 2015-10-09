const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class CommunicationCallMerge extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M17 20.41L18.41 19 15 15.59 13.59 17 17 20.41zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8z"/>
      </SvgIcon>
    );
  }
}

module.exports = CommunicationCallMerge;
