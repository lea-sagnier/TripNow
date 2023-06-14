import { IonContent,IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../style.css';
import { auth } from '../../firebaseConfig';
import { useHistory } from 'react-router-dom';
import UserEmail from '../../components/UserEmail';

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
        <UserEmail/>
        <IonButton href="./HistoryPage">Historique</IonButton>
        <IonButton onClick={logOut}>Se déconnecter</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default User;
