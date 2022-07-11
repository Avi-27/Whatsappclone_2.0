import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

function Message({ user, message }) {
  const [userLoggedin] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedin.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <TimeStamp>{message.timestamp ? moment(message.timestamp).format("LT") : "..."}</TimeStamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;
const Reciever = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const TimeStamp = styled.span`
  font-size: 12px;
  position: relative;
  top: 20px;
  color: gray;
`;
