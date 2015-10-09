const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class DeviceSignalCellularConnectedNoInternet2Bar extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M22 8V2L2 22h16V8z"/><path d="M14 22V10L2 22h12zm6-12v8h2v-8h-2zm0 12h2v-2h-2v2z"/>
      </SvgIcon>
    );
  }
}

module.exports = DeviceSignalCellularConnectedNoInternet2Bar;
