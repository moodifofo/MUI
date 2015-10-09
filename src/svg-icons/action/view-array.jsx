const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ActionViewArray extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"/>
      </SvgIcon>
    );
  }
}

module.exports = ActionViewArray;
