import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Subheader from 'material-ui/lib/Subheader';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';

const styles = {
  root: {
    border: 'solid 1px #d9d9d9',
    width: 360,
  },
};

const ListExampleChat = () => (
  <div style={styles.root}>
    <List>
      <Subheader>Recent chats</Subheader>
      <ListItem
        primaryText="Brendan Lim"
        leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Eric Hoffman"
        leftAvatar={<Avatar src="images/kolage-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Grace Ng"
        leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Kerem Suer"
        leftAvatar={<Avatar src="images/kerem-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Raquel Parrado"
        leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>
    <Divider />
    <List>
      <Subheader>Previous chats</Subheader>
      <ListItem
        primaryText="Chelsea Otakan"
        leftAvatar={<Avatar src="images/chexee-128.jpg" />}
      />
      <ListItem
        primaryText="James Anderson"
        leftAvatar={<Avatar src="images/jsa-128.jpg" />}
      />
    </List>
  </div>
);

export default ListExampleChat;
