import React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import copy from 'clipboard-copy';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Github from '@material-ui/docs/svgIcons/GitHub';
import JSLogo from '@material-ui/docs/svgIcons/JSLogo';
import HooksLogo from '@material-ui/docs/svgIcons/HooksLogo';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import { getDependencies } from 'docs/src/modules/utils/helpers';
import DemoFrame from 'docs/src/modules/components/DemoFrame';

const CODE_LANGUAGE_TYPES = {
  JS: 'js',
  HOOKS: 'hooks',
};

function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function addHiddenInput(form, name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

function getDemo(props, codeLanguage) {
  const raw = codeLanguage === CODE_LANGUAGE_TYPES.HOOKS ? props.rawHooks : props.rawJS;
  return {
    title: 'Material demo',
    description: props.githubLocation,
    dependencies: getDependencies(raw, props.demoOptions.react),
    files: {
      'demo.js': raw,
      'index.js': `
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';

ReactDOM.render(<Demo />, document.querySelector('#root'));
      `,
      'index.html': `
<body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <div id="root"></div>
</body>
      `,
    },
  };
}

const styles = theme => ({
  root: {
    position: 'relative',
    marginBottom: 40,
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing.unit}px`,
      marginLeft: 0,
      marginRight: 0,
    },
  },
  demo: theme.mixins.gutters({
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 6,
      paddingBottom: theme.spacing.unit * 3,
    },
  }),
  demoHiddenHeader: {
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 3,
    },
  },
  header: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flip: false,
      position: 'absolute',
      top: 0,
      right: theme.spacing.unit,
    },
  },
  code: {
    display: 'none',
    padding: 0,
    margin: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '& pre': {
      overflow: 'auto',
      margin: '0px !important',
      borderRadius: '0px !important',
    },
  },
});

class Demo extends React.Component {
  state = {
    anchorEl: null,
    codeLanguage: CODE_LANGUAGE_TYPES.JS,
    codeOpen: false,
  };

  handleClickMore = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMore = () => {
    this.setState({ anchorEl: null });
  };

  handleClickCodeOpen = () => {
    this.setState(state => ({
      codeOpen: !state.codeOpen,
    }));
  };

  handleClickCodeSandbox = () => {
    const { codeLanguage } = this.state;
    const demo = getDemo(this.props, codeLanguage);
    const parameters = compress({
      files: {
        'package.json': {
          content: {
            title: demo.title,
            description: demo.description,
            dependencies: demo.dependencies,
          },
        },
        'demo.js': {
          content: demo.files['demo.js'],
        },
        'index.js': {
          content: demo.files['index.js'],
        },
        'index.html': {
          content: demo.files['index.html'],
        },
      },
    });

    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://codeSandbox.io/api/v1/sandboxes/define';
    addHiddenInput(form, 'parameters', parameters);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  handleClickCopy = async () => {
    const { rawJS, rawHooks } = this.props;
    const { codeLanguage } = this.state;

    try {
      await copy(codeLanguage === CODE_LANGUAGE_TYPES.HOOKS ? rawHooks : rawJS);
    } finally {
      this.handleCloseMore();
    }
  };

  handleClickStackBlitz = () => {
    const { codeLanguage } = this.state;
    const demo = getDemo(this.props, codeLanguage);
    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://stackblitz.com/run';
    addHiddenInput(form, 'project[template]', 'javascript');
    addHiddenInput(form, 'project[title]', demo.title);
    addHiddenInput(form, 'project[description]', demo.description);
    addHiddenInput(form, 'project[dependencies]', JSON.stringify(demo.dependencies));
    Object.keys(demo.files).forEach(key => {
      const value = demo.files[key];
      addHiddenInput(form, `project[files][${key}]`, value);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    this.handleCloseMore();
  };

  handleCodeLanguageClick = event => {
    const { value: codeLanguage } = event.currentTarget;
    this.setState(prevState => {
      const isSameCodeOpen = prevState.codeLanguage === codeLanguage;
      return {
        codeLanguage,
        /**
         * if the the same code type is open,
         * toggle the state, otherwise if it is
         * another code type always open it. i.e, true
         */
        codeOpen: isSameCodeOpen ? !prevState.codeOpen : true,
      };
    });
  };

  hasHooksVersion = () => {
    return Boolean(this.props.rawHooks);
  };

  render() {
    const {
      classes,
      demoOptions,
      githubLocation: githubLocationJS,
      js: DemoComponent,
      rawJS,
      rawHooks,
    } = this.props;
    const { anchorEl, codeOpen, codeLanguage } = this.state;
    const category = demoOptions.demo;

    const hasHooksVersion = this.hasHooksVersion();

    const githubLocation =
      codeLanguage === CODE_LANGUAGE_TYPES.HOOKS
        ? githubLocationJS.replace(/\.jsx?$/, '.hooks.js')
        : githubLocationJS;

    const raw = codeLanguage === CODE_LANGUAGE_TYPES.HOOKS && hasHooksVersion ? rawHooks : rawJS;

    return (
      <div className={classes.root}>
        {demoOptions.hideHeader ? null : (
          <div>
            <div className={classes.header}>
              <Tooltip title="Display source in JavaScript" placement="top">
                <IconButton
                  aria-label="Display source in JavaScript"
                  onClick={this.handleCodeLanguageClick}
                  value={CODE_LANGUAGE_TYPES.JS}
                >
                  <JSLogo />
                </IconButton>
              </Tooltip>
              {hasHooksVersion && (
                <Tooltip title="Display source in Hooks" placement="top">
                  <IconButton
                    aria-label="Display source in React Hooks"
                    onClick={this.handleCodeLanguageClick}
                    value={CODE_LANGUAGE_TYPES.HOOKS}
                  >
                    <HooksLogo />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="See the source on GitHub" placement="top">
                <IconButton
                  data-ga-event-category={category}
                  data-ga-event-action="github"
                  href={githubLocation}
                  target="_blank"
                  aria-label="GitHub"
                >
                  <Github />
                </IconButton>
              </Tooltip>
              {demoOptions.hideEditButton ? null : (
                <Tooltip title="Edit in CodeSandbox" placement="top">
                  <IconButton
                    data-ga-event-category={category}
                    data-ga-event-action="codesandbox"
                    onClick={this.handleClickCodeSandbox}
                    aria-label="CodeSandbox"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              <IconButton
                onClick={this.handleClickMore}
                aria-owns={anchorEl ? 'demo-menu-more' : undefined}
                aria-haspopup="true"
                aria-label="See more"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="demo-menu-more"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleCloseMore}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  data-ga-event-category={category}
                  data-ga-event-action="copy"
                  onClick={this.handleClickCopy}
                >
                  Copy the source
                </MenuItem>
                {demoOptions.hideEditButton ? null : (
                  <MenuItem
                    data-ga-event-category={category}
                    data-ga-event-action="stackblitz"
                    onClick={this.handleClickStackBlitz}
                  >
                    Edit in StackBlitz
                  </MenuItem>
                )}
              </Menu>
            </div>
            <Collapse in={codeOpen} unmountOnExit>
              <MarkdownElement
                dir="ltr"
                className={classes.code}
                text={`\`\`\`jsx\n${raw}\n\`\`\``}
              />
            </Collapse>
          </div>
        )}
        <div
          className={classNames(classes.demo, {
            [classes.demoHiddenHeader]: demoOptions.hideHeader,
          })}
        >
          {demoOptions.iframe ? (
            <DemoFrame>
              <DemoComponent />
            </DemoFrame>
          ) : (
            <DemoComponent />
          )}
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  githubLocation: PropTypes.string.isRequired,
  js: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  rawHooks: PropTypes.string,
  rawJS: PropTypes.string.isRequired,
};

export default withStyles(styles)(Demo);
