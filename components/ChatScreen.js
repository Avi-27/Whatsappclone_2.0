import { Avatar, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MicIcon from "@mui/icons-material/Mic";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  doc,
  query,
  collection,
  orderBy,
  setDoc,
  serverTimestamp,
  addDoc,
  where,
} from "firebase/firestore";
import Message from "./Message";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useRef, useState } from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import timeagoReact from "timeago-react";
import TimeAgo from "timeago-react";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const endofmessageRef = useRef(null);
  const router = useRouter();
  const [input, setInput] = useState("");
  const chatRef = doc(db, "chats", router.query.id);
  const [messageSnapshot] = useCollection(
    query(collection(chatRef, "messages"), orderBy("timestamp", "asc"))
  );
  const [recipientSnapshot] = useCollection(
    query(collection(db, "users"), where("email", "==", getRecipientEmail(chat.users, user)))
  );

  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => {
        <Message key={message.id} user={message.user} message={message} />;
      });
    }
  };

  const scrollToBottom = () => {
    endofmessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    addDoc(collection(chatRef, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
    scrollToBottom();
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <UserAvatar src={recipient?.photoURL} />
        ) : (
          <UserAvatar>{recipientEmail.charAt(0).toUpperCase()}</UserAvatar>
        )}
        <HeaderInfo>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last Active:{""}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading: Last Active...</p>
          )}
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>{showMessages()}</MessageContainer>

      <EndOfChat ref={endofmessageRef} />
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} onClick={sendMessage}>
          Send
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: 0;
  align-items: center;
  padding: 20px;
  position: sticky;
  background-color: whitesmoke;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;
const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 12px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndOfChat = styled.div`
  margin-bottom: 50px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const HeaderIcons = styled.div``;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
