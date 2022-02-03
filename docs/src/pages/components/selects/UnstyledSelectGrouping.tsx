import * as React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled, {
  OptionGroupUnstyledProps,
} from '@mui/base/OptionGroupUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 2px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    outline-offset: 2px;
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 0;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;

  &:focus {
    outline: 2px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    outline-offset: 2px;
  }
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 10px;
  margin: 0;
  border-bottom: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${blue[500]};
    color: #fff;
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${blue[600]};
    color: #fff;
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledGroupRoot = styled('li')`
  list-style: none;
`;

const StyledGroupHeader = styled('span')`
  display: block;
  padding: 15px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;

const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;

  > li {
    padding-left: 20px;
  }
`;

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props: SelectUnstyledProps<string>) {
  const components: SelectUnstyledProps<string>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(
  props: OptionGroupUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const components: OptionGroupUnstyledProps['components'] = {
    Root: StyledGroupRoot,
    Label: StyledGroupHeader,
    List: StyledGroupOptions,
    ...props.components,
  };

  return <OptionGroupUnstyled {...props} ref={ref} components={components} />;
});

export default function UnstyledSelectGrouping() {
  return (
    <CustomSelect>
      <CustomOptionGroup label="Hobbits">
        <StyledOption value="Frodo">Frodo</StyledOption>
        <StyledOption value="Sam">Sam</StyledOption>
        <StyledOption value="Merry">Merry</StyledOption>
        <StyledOption value="Pippin">Pippin</StyledOption>
      </CustomOptionGroup>
      <CustomOptionGroup label="Elves">
        <StyledOption value="Galadriel">Galadriel</StyledOption>
        <StyledOption value="Legolas">Legolas</StyledOption>
      </CustomOptionGroup>
    </CustomSelect>
  );
}
