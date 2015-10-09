const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ActionSwapVert extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/>
      </SvgIcon>
    );
  }
}

module.exports = ActionSwapVert;
