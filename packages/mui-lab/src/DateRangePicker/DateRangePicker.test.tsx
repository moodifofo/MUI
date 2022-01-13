import * as React from 'react';
import TextField from '@mui/material/TextField';
import { expect } from 'chai';
import { spy } from 'sinon';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { act, describeConformance, fireEvent, screen, waitFor } from 'test/utils';
import Box from '@mui/material/Box';
import { createPickerRenderer, wrapPickerMount } from '../internal/pickers/test-utils';
import { DateRangePickerToolbarProps } from './DateRangePickerToolbar';

describe('<DateRangePicker />', () => {
  const { render } = createPickerRenderer();
  const startDate = new Date(Date.UTC(1970, 0, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(1970, 0, 12, 0, 0, 0));
  describeConformance(
    <DateRangePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={[null, null]}
    />,
    () => ({
      classes: {},
      muiName: 'MuiDateRangePicker',
      wrapMount: wrapPickerMount,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        'componentsProp',
        'themeDefaultProps',
        'themeStyleOverrides',
        'themeVariants',
        'mergeClassName',
        'propsSpread',
        'rootClass',
        'reactTestRenderer',
      ],
    }),
  );

  // TODO: Write tests for responsive pickers. This test should be removed after adding actual tests.
  it('renders without crashing', () => {
    render(
      <DateRangePicker
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
        onChange={() => {}}
        value={[startDate, endDate]}
      />,
    );
    screen.getByRole('textbox', {
      name: /start/i,
    });
    screen.getByText(/to/i);
    screen.getByRole('textbox', {
      name: /end/i,
    });
    screen.getByDisplayValue('01/01/1970');
    screen.getByDisplayValue('01/12/1970');
  });

  it('renders with basic functionality', async () => {
    render(
      <DateRangePicker
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
        onChange={() => {}}
        value={[startDate, endDate]}
      />,
    );
    act(() => {
      fireEvent.click(screen.getByDisplayValue('01/01/1970'));
    });
    await waitFor(() =>
      screen.getByRole('button', {
        name: /calendar view is open, go to text input view/i,
      }),
    );
    screen.getAllByRole('button', { name: /jan 1/i });
    screen.getAllByRole('button', { name: /jan 12/i });
    ['M', 'W', 'F'].forEach((char) => {
      screen.getByText(char);
    });
    expect(screen.getAllByText('S')).to.have.length(2);
    expect(screen.getAllByText('T')).to.have.length(2);
    screen.getByRole('button', {
      name: /previous month/i,
    });
    screen.getByRole('button', {
      name: /next month/i,
    });
    screen.getByRole('button', {
      name: /cancel/i,
    });
    screen.getByRole('button', {
      name: /ok/i,
    });
  }).timeout(10000);
  it('renders a custom toolbar', async () => {
    const CustomToolbar = ({ date }: DateRangePickerToolbarProps) => {
      return (
        <React.Fragment>
          Custom Tool bar for {(date as [Date, Date])[0].toDateString()}
        </React.Fragment>
      );
    };
    render(
      <DateRangePicker
        ToolbarComponent={CustomToolbar}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
        onChange={() => {}}
        value={[startDate, endDate]}
      />,
    );
    act(() => {
      fireEvent.click(screen.getByDisplayValue('01/01/1970'));
    });
    screen.getByText(/custom tool bar for thu jan 01 1970/i);
  });
  it('selects the new dates', async () => {
    const onAccept = spy();
    const onChange = spy();
    render(
      <DateRangePicker
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
        onChange={onChange}
        onAccept={onAccept}
        value={[startDate, endDate]}
      />,
    );
    fireEvent.click(screen.getByDisplayValue('01/01/1970'));
    await waitFor(() =>
      screen.getByRole('button', {
        name: /calendar view is open, go to text input view/i,
      }),
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: /jan 25, 1970/i,
      }),
    );
    expect(onChange.callCount).to.equal(1);
    fireEvent.click(
      screen.getByRole('button', {
        name: /jan 29, 1970/i,
      }),
    );
    expect(onChange.callCount).to.equal(2);
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(onAccept.callCount).to.equal(1);
    const acceptDates = onAccept.args[0][0].map((date: Date) => date.toDateString());
    expect(acceptDates[0]).to.equal('Sun Jan 25 1970');
    expect(acceptDates[1]).to.equal('Thu Jan 29 1970');
  }).timeout(10000);
});
