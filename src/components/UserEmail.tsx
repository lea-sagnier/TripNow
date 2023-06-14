import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const UserEmail = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userDisplayName, setUserDisplayName] = useState("");
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.displayName) {
        setUserDisplayName(user.displayName)
      } else if(user && user.email){
        setUserEmail(user.email);
      }else{
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  return userEmail ? <p>{userEmail}</p> : null;
};

export default UserEmail;
