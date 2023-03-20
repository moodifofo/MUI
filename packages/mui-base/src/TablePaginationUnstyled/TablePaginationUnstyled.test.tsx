import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import { describeConformanceUnstyled, fireEvent, createRenderer, createMount } from 'test/utils';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
  LabelDisplayedRowsArgs,
} from '@mui/base/TablePaginationUnstyled';

interface WithClassName {
  className: string;
}

describe('<TablePaginationUnstyled />', () => {
  const noop = () => {};
  const { render } = createRenderer();
  const mount = createMount();

  const CustomRootComponent = React.forwardRef(
    ({ className }: WithClassName, ref: React.Ref<any>) => (
      <th className={className} ref={ref} data-testid="custom" />
    ),
  );

  describeConformanceUnstyled(
    <TablePaginationUnstyled count={1} onPageChange={noop} page={0} rowsPerPage={10} />,
    () => ({
      inheritComponent: 'td',
      render: (node) => {
        const { container, ...other } = render(
          <table>
            <tbody>
              <tr>{node}</tr>
            </tbody>
          </table>,
        );
        return {
          container: container?.firstChild?.firstChild?.firstChild as HTMLElement,
          ...other,
        };
      },
      mount: (node: any) => {
        const wrapper = mount(
          <table>
            <tbody>
              <tr>{node}</tr>
            </tbody>
          </table>,
        );
        return wrapper.find('tr').childAt(0);
      },
      refInstanceof: window.HTMLTableCellElement,
      testComponentPropWith: 'th',
      muiName: 'MuiTablePagination',
      slots: {
        root: {
          expectedClassName: classes.root,
          testWithComponent: CustomRootComponent as any,
          testWithElement: 'th',
        },
      },
    }),
  );

  describe('prop: labelDisplayedRows', () => {
    it('should use the labelDisplayedRows callback', () => {
      let labelDisplayedRowsCalled = false;
      function labelDisplayedRows({ from, to, count, page }: LabelDisplayedRowsArgs) {
        labelDisplayedRowsCalled = true;
        expect(from).to.equal(11);
        expect(to).to.equal(20);
        expect(count).to.equal(42);
        expect(page).to.equal(1);
        return `Page ${page}`;
      }

      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={42}
                page={1}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelDisplayedRows={labelDisplayedRows}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      expect(labelDisplayedRowsCalled).to.equal(true);
      expect(container.innerHTML.includes('Page 1')).to.equal(true);
    });
  });

  describe('prop: labelRowsPerPage', () => {
    it('labels the select for the current page', () => {
      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelRowsPerPage="lines per page:"
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const combobox = container.getElementsByTagName('select')[0];
      expect(combobox).toHaveAccessibleName('lines per page: 10');
    });

    it('accepts React nodes', () => {
      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelRowsPerPage={
                  <React.Fragment>
                    <em>lines</em> per page:
                  </React.Fragment>
                }
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      // will be `getByRole('combobox')` in aria 1.2
      const combobox = container.getElementsByTagName('select')[0];
      expect(combobox).toHaveAccessibleName('lines per page: 10');
    });
  });

  describe('prop: page', () => {
    it('should disable the back button on the first page', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={11}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = getByRole('button', { name: 'Go to next page' });
      const backButton = getByRole('button', { name: 'Go to previous page' });
      expect(backButton).to.have.property('disabled', true);
      expect(nextButton).to.have.property('disabled', false);
    });

    it('should disable the next button on the last page', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={11}
                page={1}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = getByRole('button', { name: 'Go to next page' });
      const backButton = getByRole('button', { name: 'Go to previous page' });
      expect(backButton).to.have.property('disabled', false);
      expect(nextButton).to.have.property('disabled', true);
    });
  });

  describe('prop: onPageChange', () => {
    it('should handle next button clicks properly', () => {
      let page = 1;
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={30}
                page={page}
                onPageChange={(event, nextPage) => {
                  page = nextPage;
                }}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = getByRole('button', { name: 'Go to next page' });
      fireEvent.click(nextButton);
      expect(page).to.equal(2);
    });

    it('should handle back button clicks properly', () => {
      let page = 1;
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={30}
                page={page}
                onPageChange={(event, nextPage) => {
                  page = nextPage;
                }}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const backButton = getByRole('button', { name: 'Go to previous page' });
      fireEvent.click(backButton);
      expect(page).to.equal(0);
    });
  });

  describe('label', () => {
    it('should display 0 as start number if the table is empty ', () => {
      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={0}
                page={0}
                rowsPerPage={10}
                onPageChange={noop}
                onRowsPerPageChange={noop}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      expect(container.querySelectorAll('p')[1]).to.have.text('0–0 of 0');
    });

    it('should hide the rows per page selector if there are less than two options', () => {
      const { container, queryByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                page={0}
                rowsPerPage={5}
                rowsPerPageOptions={[5]}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                count={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      expect(container).not.to.include.text('Rows per page');
      expect(queryByRole('listbox')).to.equal(null);
    });
  });

  describe('prop: count=-1', () => {
    it('should display the "of more than" text and keep the nextButton enabled', () => {
      function Test() {
        const [page, setPage] = React.useState(0);
        return (
          <table>
            <TableFooter>
              <TableRow>
                <TablePaginationUnstyled
                  page={page}
                  rowsPerPage={10}
                  count={-1}
                  onPageChange={(_, newPage) => {
                    setPage(newPage);
                  }}
                  slotProps={{
                    displayedRows: {
                      'data-testid': 'displayedRows',
                    } as any,
                  }}
                />
              </TableRow>
            </TableFooter>
          </table>
        );
      }

      const { getByRole, getByTestId } = render(<Test />);

      expect(getByTestId('displayedRows')).to.have.text('1–10 of more than 10');
      fireEvent.click(getByRole('button', { name: 'Go to next page' }));
      expect(getByTestId('displayedRows')).to.have.text('11–20 of more than 20');
    });
  });

  describe('prop: showFirstButton', () => {
    it('should change the page', () => {
      const handleChangePage = spy();
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                page={1}
                rowsPerPage={10}
                count={98}
                onPageChange={handleChangePage}
                slotProps={{
                  actions: {
                    showFirstButton: true,
                  } as any,
                }}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      fireEvent.click(getByRole('button', { name: 'Go to first page' }));
      expect(handleChangePage.args[0][1]).to.equal(0);
    });
  });

  describe('prop: showLastButton', () => {
    it('should change the page', () => {
      const handleChangePage = spy();
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                page={0}
                rowsPerPage={10}
                count={98}
                onPageChange={handleChangePage}
                slotProps={{
                  actions: {
                    showLastButton: true,
                  } as any,
                }}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      fireEvent.click(getByRole('button', { name: 'Go to last page' }));
      expect(handleChangePage.args[0][1]).to.equal(9);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('should raise a warning if the page prop is out of range', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          TablePaginationUnstyled.propTypes,
          {
            classes: {},
            page: 2,
            count: 20,
            rowsPerPage: 10,
            onPageChange: noop,
            onRowsPerPageChange: noop,
          },
          'prop',
          'MockedTablePaginationUnstyled',
        );
      }).toErrorDev(
        'MUI: The page prop of a TablePaginationUnstyled is out of range (0 to 1, but page is 2).',
      );
    });
  });

  describe('prop: selectId, labelId', () => {
    it('does allow manual label ids', () => {
      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                selectId="foo"
                labelId="bar"
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      // will be `getByRole('combobox')` in aria 1.2
      const combobox = container.getElementsByTagName('select')[0];
      expect(combobox).toHaveAccessibleName('Rows per page: 10');
    });
  });

  describe('prop: rowsPerPage', () => {
    it('should display max number of rows text when prop is -1', () => {
      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={25}
                page={0}
                rowsPerPage={-1}
                onPageChange={noop}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      expect(container).to.include.text('All');
      expect(container).to.include.text('1–25 of 25');
    });
  });

  describe('duplicated keys', () => {
    it('should not raise a warning due to duplicated keys', () => {
      render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePaginationUnstyled
                rowsPerPageOptions={[5, 10, { label: 'All', value: 10 }]}
                count={10}
                rowsPerPage={10}
                page={0}
                onPageChange={noop}
                slotProps={{
                  select: { 'aria-label': 'rows per page' },
                }}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
    });
  });
});
