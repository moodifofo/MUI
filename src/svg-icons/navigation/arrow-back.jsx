const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class NavigationArrowBack extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </SvgIcon>
    );
  }
}

module.exports = NavigationArrowBack;
