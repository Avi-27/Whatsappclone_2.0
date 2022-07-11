import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user.email));
  const [chatSnapshot] = useCollection(userChatRef);
  const createChat = () => {
    const input = prompt("Please enter an email addres for the user you want to chat with");

    if (!input) return null;

    if (EmailValidator.validate(input) && !chatAlreadyexists(input) && input !== user.email) {
      // we add the chat into the chats collection if it doesnot already exists and is a valid one
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    } else {
      alert("Either a chat exists or the email is invalid");
    }
  };

  const chatAlreadyexists = (recipientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton variant="text" onClick={createChat}>
        Start a New Chat
      </SidebarButton>

      {/* list of chats */}
      {chatSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  border-right: 1px solid #e9eaeb;
`;
const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  margin-left: 10px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  /* margin: 10px; */
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const SidebarButton = styled(Button)`
  width: 100%;
  border-bottom: 1px solid whitesmoke;
  border-top: 1px solid whitesmoke;
`;
const IconsContainer = styled.div``;
