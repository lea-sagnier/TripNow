import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react';
import './style.css';
import { useHistory } from 'react-router';

const Start: React.FC = () => {
  const navigate = useHistory();
  
  const onNavigate = () => {
    navigate.push("/onboarding");   
  }

  return (
    <IonPage> 
      <IonContent fullscreen>
        <IonImg
          src="../../assets/background.svg"
          alt="some landscapes"
        />
        <h1 className='titleInformation'>TRIPNOW</h1>
        <p className='informations'>Vivez des expériences magiques en découvrant les destinations qui correspondent à vos envies</p>
        <IonButton  className='primaryButton' color={"primary"} onClick={onNavigate}>Commencer</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Start;
