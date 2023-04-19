// @ts-nocheck
import MaterialInput from '@mui/material/Input';
import Input from '@mui/base/Input';
import Switch from '@mui/base/Switch';
import Badge from '@mui/base/Badge';

<MaterialInput component={CustomRoot} />;

<Input component={CustomRoot} />;

<Input component={CustomRoot}></Input>;

<Switch
  component={CustomRoot}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ root: { className: 'root' } }}
/>;

<Badge
  slotProps={{ badge: { className: 'badge' } }}
  component={CustomRoot}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slots={{ badge: CustomBadge }}
/>;

<Input component='a' href='url'></Input>;
