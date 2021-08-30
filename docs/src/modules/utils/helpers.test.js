import { expect } from 'chai';
import { getDependencies } from './helpers';

describe('docs getDependencies helpers', () => {
  before(() => {
    process.env.SOURCE_CODE_REPO = 'https://github.com/mui-org/material-ui';
  });

  after(() => {
    delete process.env.SOURCE_CODE_REPO;
  });

  const s1 = `
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import SliderUnstyled from '@material-ui/unstyled/SliderUnstyled';
import FooBar, { Qux } from '@foo-bar/bip';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formContro
`;

  it('should handle @ dependencies', () => {
    expect(getDependencies(s1)).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@foo-bar/bip': 'latest',
      '@mui/material': 'next',
      '@material-ui/unstyled': 'next',
      'prop-types': 'latest',
    });
  });

  it('should handle * dependencies', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import * as _ from '@unexisting/thing';
import Draggable from 'react-draggable';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from '@mui/material/styles';
const suggestions = [
`;

    expect(getDependencies(source)).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@unexisting/thing': 'latest',
      'autosuggest-highlight': 'latest',
      'prop-types': 'latest',
      'react-draggable': 'latest',
    });
  });

  it('should support direct import', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { withStyles } from '@mui/material/styles';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { LocalizationProvider as MuiPickersLocalizationProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/lab';
`;

    expect(getDependencies(source)).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@material-ui/lab': 'next',
      'date-fns': 'latest',
    });
  });

  it('can collect required @types packages', () => {
    expect(getDependencies(s1, { codeLanguage: 'TS' })).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@foo-bar/bip': 'latest',
      '@mui/material': 'next',
      '@material-ui/unstyled': 'next',
      '@types/foo-bar__bip': 'latest',
      '@types/prop-types': 'latest',
      '@types/react-dom': 'latest',
      '@types/react': 'latest',
      typescript: 'latest',
    });
  });

  it('should handle multilines', () => {
    const source = `
import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import {
  LocalizationProvider as MuiPickersLocalizationProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/lab';
    `;

    expect(getDependencies(source)).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@material-ui/lab': 'next',
      'date-fns': 'latest',
    });
  });

  it('should include core if lab present', () => {
    const source = `
import lab from '@material-ui/lab';
    `;

    expect(getDependencies(source)).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@material-ui/lab': 'next',
    });
  });

  it('can use codesandbox deploys if a commit is given', () => {
    const source = `
import * as Core from '@mui/material';
import * as Unstyled from '@material-ui/unstyled';
import * as Icons from '@material-ui/icons';
import * as Lab from '@material-ui/lab';
import * as Styles from '@material-ui/styles';
import * as System from '@mui/system';
import * as Utils from '@material-ui/utils';
    `;

    expect(
      getDependencies(source, { muiCommitRef: '2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f' }),
    ).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material':
        'https://pkg.csb.dev/mui-org/material-ui/commit/2d0e8b4d/@mui/material',
      '@material-ui/icons':
        'https://pkg.csb.dev/mui-org/material-ui/commit/2d0e8b4d/@material-ui/icons',
      '@material-ui/lab':
        'https://pkg.csb.dev/mui-org/material-ui/commit/2d0e8b4d/@material-ui/lab',
      '@material-ui/styles':
        'https://pkg.csb.dev/mui-org/material-ui/commit/2d0e8b4d/@material-ui/styles',
      '@mui/system':
        'https://pkg.csb.dev/mui-org/material-ui/commit/2d0e8b4d/@mui/system',
      '@material-ui/utils':
        'https://pkg.csb.dev/mui-org/material-ui/commit/2d0e8b4d/@material-ui/utils',
      '@material-ui/unstyled':
        'https://pkg.csb.dev/mui-org/material-ui/commit/2d0e8b4d/@material-ui/unstyled',
    });
  });

  it('should date adapters', () => {
    const source = `
import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import AdapterDayjs from '@material-ui/lab/AdapterDayjs';
import AdapterLuxon from '@material-ui/lab/AdapterLuxon';
import AdapterMoment from '@material-ui/lab/AdapterMoment';
    `;

    expect(getDependencies(source)).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@material-ui/lab': 'next',
      'date-fns': 'latest',
      dayjs: 'latest',
      luxon: 'latest',
      moment: 'latest',
    });
  });
});
