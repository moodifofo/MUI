const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorFormatTextdirectionLToR extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorFormatTextdirectionLToR;
