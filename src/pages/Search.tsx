import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react';
import './style.css';
import { useHistory } from 'react-router';

const Search: React.FC = () => {
  const navigate = useHistory();
  
  const onNavigate = () => {
    navigate.push("/form");   
  }

  return (
    <IonPage> 
      <IonContent fullscreen>
        <IonImg
          src="../../assets/background.svg"
          alt="some landscapes"
        />
        <h1 className='titleInformation'>Recherche</h1>
        <p className='informations'>Différentes questions vous seront posées pour vous proposer des voyages correspondants.</p>
        <IonButton  className='primaryButton' color={"primary"} onClick={onNavigate}>Commencer la recherche</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Search;
