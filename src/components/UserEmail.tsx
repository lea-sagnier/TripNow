import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const UserEmail = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userDisplayName, setUserDisplayName] = useState("");
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.displayName && user.email) {
        setUserDisplayName(user.displayName);
        setUserEmail(user.email);
      }else{
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  return userDisplayName ? <p>{userDisplayName}</p> : <p>{userEmail}</p>;
};

export default UserEmail;
