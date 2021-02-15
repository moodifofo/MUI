import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './default-standard-to-outlined-variant-prop';

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('textfield-variant-prop', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./textfield-variant-prop.test/actual.js'),
            path: require.resolve('./textfield-variant-prop.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./textfield-variant-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
