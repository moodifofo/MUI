/* eslint-disable react/no-danger */
import * as React from 'react';
import {
  styled,
  // alpha
} from '@mui/material/styles';
// import {
//   brandingDarkTheme as darkTheme,
//   brandingLightTheme as lightTheme,
// } from 'docs/src/modules/brandingTheme';
import { SlotsFormatedParams, getHash } from '../list/SlotsList';

const StyledTable = styled('table')(
  ({ theme }) => ({
    '& .table-headers': {
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: 'left',
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(14),
    },
    '& .MuiApi-table-rule-name': {
      //   fontWeight: theme.typography.fontWeightSemiBold,
      //   fontFamily: theme.typography.fontFamilyCode,
      //   fontSize: theme.typography.pxToRem(13),
      //   color: `var(--muidocs-palette-primary-700, ${lightTheme.palette.primary[700]})`,
    },
    '& .MuiApi-table-global-class': {
      //   padding: '0 4px',
      //   borderRadius: 5,
      //   color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      //   backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
      //   border: '1px solid',
      //   borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      //   ...theme.typography.caption,
      //   fontFamily: theme.typography.fontFamilyCode,
      //   fontWeight: theme.typography.fontWeightRegular,
    },
    '& .MuiApi-table-description': {
      //   padding: '0 4px',
      //   borderRadius: 5,
      //   border: '1px solid',
      //   borderColor: alpha(darkTheme.palette.primary[100], 0.5),
      //   backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      //   ...theme.typography.caption,
      //   fontFamily: theme.typography.fontFamilyCode,
      //   fontWeight: theme.typography.fontWeightRegular,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiApi-table-rule-name': {
        // color: `var(--muidocs-palette-primary-700, ${darkTheme.palette.primary[700]})`,
      },
    },
  }),
);

interface SlotsTableProps {
  slots: SlotsFormatedParams[];
}

export default function SlotsTable(props: SlotsTableProps) {
  const { slots } = props;
  return (
    <StyledTable>
      <thead>
        <tr>
          <th className="table-headers">Slot name</th>
          <th className="table-headers">Class name</th>
          <th className="table-headers">Default</th>
          <th className="table-headers">Description</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((params) => {
          const { description, className, name, defaultValue, componentName } = params;

          return (
            <tr key={className} id={getHash({ componentName, className })}>
              <td className="MuiApi-table-slot-name">{name}</td>
              <td className="MuiApi-table-class-name">{className}</td>
              <td className="MuiApi-table-default-value">
                {defaultValue && <code>{defaultValue}</code>}
              </td>
              <td>
                <span
                  className="MuiApi-table-description"
                  dangerouslySetInnerHTML={{
                    __html: description || '',
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
