import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from '../types';

type MessagesPaneProps = {
  chat: ChatProps;
};

export default function MessagesPane({ chat }: MessagesPaneProps) {
  // const [height, setHeight] = React.useState(290);
  // const [height, setHeight] = React.useState<number>(128);
  // const ref = React.useRef<null | HTMLDivElement>(null);

  // React.useEffect(() => {
  //   if (ref.current) {
  //     setHeight(ref.current.clientHeight);
  //   }
  // }, [setHeight]);

  // const measuredRef = React.useCallback((node) => {
  //   console.log('!!!!', node);
  //   if (node !== null) {
  //     setHeight(node.getBoundingClientRect().height);
  //   }
  // }, []);

  return (
    <Sheet sx={{ height: '100dvh' }}>
      <MessagesPaneHeader sender={chat.sender} />

      {/* todo: come back and fix the height here once top bar and textarea are done */}
      <Box
        sx={{
          display: 'flex',
          height: `calc(100dvh - 225px)`,
          // height: `calc(100dvh - 88px - ${height}px)`,
          px: 4,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chat.messages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === 'You';
            console.log('isYou', message);
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {!isYou && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>

      <MessageInput
      //  ref={measuredRef}
      />
    </Sheet>
  );
}
