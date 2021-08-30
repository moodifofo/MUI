import { unstable_useEventCallback as useEventCallback } from '@mui/utils';
import { expectType } from '@material-ui/types';

function InferenceTest() {
  useEventCallback((event) => {
    expectType<unknown, typeof event>(event);
  });
  useEventCallback((event: MouseEvent) => {
    expectType<MouseEvent, typeof event>(event);
  });
}
