import { expect } from 'chai';
import * as React from 'react';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import useSyncStorageState from './useSyncStorageState';

describe('useSyncStorageState', () => {
  const { render } = createRenderer();

  it('returns the value from store', () => {
    function TestComponent() {
      const [state, setState] = useSyncStorageState('TEST', false, {
        storage: window.sessionStorage,
      });

      return (
        <div>
          <p data-testid="state">Result: {JSON.stringify(state)}</p>

          <button
            onClick={() => {
              setState(true);
            }}
          >
            ADD
          </button>
        </div>
      );
    }

    expect(() => {
      render(<TestComponent />);
    }).not.toErrorDev();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByTestId('state')).to.have.text('Result: true');
  });
});
