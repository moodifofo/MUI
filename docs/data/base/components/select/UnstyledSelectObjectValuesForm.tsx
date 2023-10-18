import * as React from 'react';
import { Select as BaseSelect, SelectProps, selectClasses } from '@mui/base/Select';
import { SelectOption } from '@mui/base/useOption';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { Popper as BasePopper } from '@mui/base/Popper';
import { styled } from '@mui/system';
import Box from '@mui/system/Box';

export default function UnstyledSelectObjectValuesForm() {
  const getSerializedValue = (option: SelectOption<Character> | null) => {
    if (option?.value == null) {
      return '';
    }

    return `${option.value.race}.${option.value.name}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    alert(`character=${formData.get('character')}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <div>
            <Label
              id="object-value-default-label"
              htmlFor="object-value-default-button"
            >
              Default behavior
            </Label>
            <Select
              name="character"
              id="object-value-default-button"
              aria-labelledby="object-value-default-label object-value-default-button"
              placeholder="Choose a character…"
            >
              {characters.map((character) => (
                <Option key={character.name} value={character}>
                  {character.name}
                </Option>
              ))}
            </Select>
          </div>
          <Button sx={{ ml: 1 }} type="submit">
            Submit
          </Button>
        </Box>
      </form>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
          <div>
            <Label
              id="object-value-serialize-label"
              htmlFor="object-value-serialize-button"
            >
              Custom getSerializedValue
            </Label>
            <Select
              getSerializedValue={getSerializedValue}
              name="character"
              id="object-value-serialize-button"
              aria-labelledby="object-value-serialize-label object-value-serialize-button"
              placeholder="Choose a character…"
            >
              {characters.map((character) => (
                <Option key={character.name} value={character}>
                  {character.name}
                </Option>
              ))}
            </Select>
          </div>
          <Button sx={{ ml: 1 }} type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

function Select<TValue extends {}, Multiple extends boolean = false>(
  props: SelectProps<TValue, Multiple>,
) {
  const slots: SelectProps<TValue, Multiple>['slots'] = {
    root: StyledButton,
    listbox: Listbox,
    popper: Popper,
    ...props.slots,
  };

  return <BaseSelect {...props} slots={slots} />;
}

interface Character {
  name: string;
  race: string;
}

const characters: Character[] = [
  { name: 'Frodo', race: 'Hobbit' },
  { name: 'Sam', race: 'Hobbit' },
  { name: 'Merry', race: 'Hobbit' },
  { name: 'Gandalf', race: 'Maia' },
  { name: 'Gimli', race: 'Dwarf' },
];

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
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
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectClasses.expanded} {
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

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 8px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  `,
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const Popper = styled(BasePopper)`
  z-index: 1;
`;

const Label = styled('label')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 4px;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `,
);

const Button = styled('button')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 8px 16px;
  line-height: 1.5;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  vertical-align: middle;
  min-height: calc(1em + 25px);

  &:hover {
    background-color: ${blue[600]};
  }
`;
