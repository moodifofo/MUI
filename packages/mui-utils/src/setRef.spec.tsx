import * as React from 'react';
import setRef from './setRef';

function MyRef() {
  const ref = React.useRef<HTMLDivElement>();

  const handleRef = React.useCallback((node: any) => {
    setRef(ref, node.current);
  }, []);

  return <div ref={handleRef} />;
}
