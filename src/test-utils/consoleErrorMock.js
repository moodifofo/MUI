/* eslint-disable flowtype/require-valid-file-annotation, no-console */
import { spy } from 'sinon';

class consoleErrorMock {
  consoleErrorContainer;

  spy = () => {
    // $FlowFixMe
    this.consoleErrorContainer = console.error;
    // $FlowFixMe
    console.error = spy();
  };

  reset = () => {
    console.error = this.consoleErrorContainer;
    delete this.consoleErrorContainer;
  };

  callCount = () => {
    if (this.consoleErrorContainer) {
      // $FlowFixMe
      return console.error.callCount;
    }

    throw new Error('Requested call count before spy() was called');
  };

  calledWith = (...args) => {
    if (this.consoleErrorContainer) {
      // $FlowFixMe
      return console.error.calledWith(...args);
    }

    throw new Error('Requested calledWith before spy() was called');
  };
}

export default new consoleErrorMock();
