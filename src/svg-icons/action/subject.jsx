const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ActionSubject extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
      </SvgIcon>
    );
  }
}

module.exports = ActionSubject;
