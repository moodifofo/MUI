import AvatarGroup from '@mui/material/AvatarGroup';
import { AvatarGroup as MyAvatarGroup } from '@mui/material';

<AvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"}
  }}
/>;
<MyAvatarGroup
componentsProps={{
  additionalAvatar: {color: "red"}
}}
/>;
<MyAvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"}
  }}
  slotProps={{
    additionalAvatar: {color: "blue"}
  }}
/>;

// should skip non MUI components
<NonMuiAvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"}
  }}
/>;
