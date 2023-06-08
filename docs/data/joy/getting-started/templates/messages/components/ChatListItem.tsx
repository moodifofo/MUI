import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from './AvatarWithStatus';
import { ChatProps } from '../types';
import { toggleMessagesPane } from '../utils';

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  unread?: boolean;
  sender: any;
  messages: any;
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

export default function ChatListItem({
  unread = false,
  id,
  sender,
  messages,
  selectedChatId,
  setSelectedChat,
}: ChatListItemProps) {
  const selected = selectedChatId === id;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({ id, sender, messages });
          }}
          selected={selected}
          variant={selected ? 'soft' : 'plain'}
          color="neutral"
          sx={{
            p: { xs: 1, md: 2 },
          }}
        >
          <Stack spacing={{ xs: 1, md: 2 }} flex={1}>
            <Stack direction="row" justifyContent="space-between" flex={1}>
              <Stack direction="row">
                <Box
                  width={20}
                  display="flex"
                  alignItems="center"
                  sx={{ display: { xs: 'none', md: 'block' } }}
                >
                  {messages[0].unread && (
                    <CircleIcon sx={{ fontSize: 10 }} color="primary" />
                  )}
                </Box>

                <AvatarWithStatus
                  online={sender.online}
                  src={sender.avatar}
                  // size="sm"
                  // size={{ xs: 'md', md: 'sm' }}
                />

                <Box ml={1.5}>
                  <Typography fontSize="sm" fontWeight="lg">
                    {sender.name}
                  </Typography>
                  <Typography level="body2">{sender.username}</Typography>
                </Box>
              </Stack>
              <Typography level="body2" display={{ xs: 'none', md: 'block' }}>
                5 mins ago
              </Typography>
            </Stack>

            <Typography
              level="body2"
              // l={2.5}
              pl={{ xs: 0, md: 2.5 }}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {messages[0].content}
            </Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
