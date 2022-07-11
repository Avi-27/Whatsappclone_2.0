import { where, query, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

const getRecipientEmail = (users, userLoggedIn) =>
  users.filter((user) => user !== userLoggedIn?.email)[0];

export default getRecipientEmail;

export const getRecipientName = (users, userLoggedIn) => {
  const user = users.filter((user) => user !== userLoggedIn?.email)[0];
  console.log(user);
  const [recsnap] = useCollection(query(collection(db, "users"), where("email", "==", user)));
  const recipient = recsnap?.docs[0]?.data();
  console.log(recsnap);

  return recipient?.username;
};
