import { IonContent,IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../style.css';
import { auth } from '../../firebaseConfig';
import { useHistory } from 'react-router-dom';

const User: React.FC = () => {
  const navigate = useHistory();

  function logOut() {
    auth
      .signOut()
      .then(() => {
        alert("Vous avez été déconnecté avec succès");
        navigate.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={logOut}>Se déconnecter</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default User;
