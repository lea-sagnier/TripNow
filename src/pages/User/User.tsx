import {
  IonContent,
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonText,
  IonIcon,
} from "@ionic/react";
import "../style.css";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import UserEmail from "../../components/UserEmail";
import { updateProfile } from "firebase/auth";
import { useCurrentUser } from "../../hooks/UserHook";
import { useEffect, useState } from "react";
import {
  starOutline,
  heartOutline,
  personCircleOutline,
  helpCircleOutline,
  informationCircleOutline,
  notificationsOutline,
  settingsOutline,
  logOutOutline,
} from "ionicons/icons";

const User: React.FC = () => {
  const navigate = useHistory();
  const user = useCurrentUser();
  const [displayName, setDisplayName] = useState(user?.displayName);

  useEffect(() => {
    setDisplayName(user?.displayName);
  }, [user]);

  function updateDisplayName() {
    if (user !== null) {
      updateProfile(user, { displayName: displayName })
        .then(() => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully updated user", displayName);
        })
        .catch((error: any) => {
          console.log("Error updating user:", error);
        });
    }
  }

  function logOut() {
    auth
      .signOut()
      .then(() => {
        alert("Vous avez été déconnecté avec succès");
        navigate.push("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="userpage">
          <h1>{displayName}</h1>

          {/* <IonInput onIonInput={(e: any) => setDisplayName(e.target.value)} />
        <IonButton onClick={updateDisplayName}>Modifier mon pseudo</IonButton> */}
          <IonButton fill="clear">
            <span className="button-user">
              <IonIcon slot="start" icon={personCircleOutline}></IonIcon>
              Informations personelles
            </span>
          </IonButton>
          <IonButton fill="clear">
            <span className="button-user">
              <IonIcon slot="start" icon={heartOutline}></IonIcon>
              Wishlist
            </span>
          </IonButton>
          <IonButton fill="clear">
            <span className="button-user">
              <IonIcon slot="start" icon={notificationsOutline}></IonIcon>
              Notifications
            </span>
          </IonButton>
          <IonButton fill="clear">
            <span className="button-user">
              <IonIcon slot="start" icon={settingsOutline}></IonIcon>
              Paramètres
            </span>
          </IonButton>
          <hr />
          <IonButton fill="clear">
            <span className="button-user">
              <IonIcon slot="start" icon={starOutline}></IonIcon>
              Noter l'application
            </span>
          </IonButton>
          <IonButton fill="clear">
            <span className="button-user">
              <IonIcon slot="start" icon={helpCircleOutline}></IonIcon>
              Aide
            </span>
          </IonButton>
          <IonButton fill="clear">
            <span className="button-user">
              <IonIcon slot="start" icon={informationCircleOutline}></IonIcon>
              Mentions légales
            </span>
          </IonButton>
          <hr />
          <IonButton onClick={logOut} fill="clear">
            <span className="button-user">
              <IonIcon slot="start" icon={logOutOutline}></IonIcon>
              Déconnexion
            </span>
          </IonButton>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default User;
