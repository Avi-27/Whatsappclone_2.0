import styled from "styled-components";
import Head from "next/head";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login-Whatsapp 2.0</title>
      </Head>
      <LoginContainer>
        <Logo src="https://www.freepnglogos.com/uploads/whatsapp-png-logo-1.png" />
        <Button variant="outlined" color="success" onClick={signIn}>
          Sign In with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`;
