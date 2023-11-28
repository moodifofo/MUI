import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import sinon from 'sinon';
import { getBaseUiComponentInfo } from './getBaseUiComponentInfo';

describe('getBaseUiComponentInfo', () => {
  it('return correct info for base component file', () => {
    const info = getBaseUiComponentInfo(
      path.join(process.cwd(), `/packages/mui-base/src/Button/Button.tsx`),
    );
    sinon.assert.match(info, {
      name: 'Button',
      apiPathname: '/base-ui/react-button/components-api/#button',
      muiName: 'MuiButton',
      apiPagesDirectory: sinon.match((value) =>
        value.endsWith(path.join('docs', 'pages', 'base-ui', 'api')),
      ),
    });

    info.readFile();

    expect(info.getInheritance()).to.deep.equal(null);

    let existed = false;
    try {
      fs.readdirSync(path.join(process.cwd(), 'docs/data'));
      existed = true;
      // eslint-disable-next-line no-empty
    } catch (error) {}
    if (existed) {
      expect(info.getDemos()).to.deep.equal([
        {
          demoPageTitle: 'Button',
          demoPathname: '/base-ui/react-button/',
        },
      ]);
    }
  });
});
