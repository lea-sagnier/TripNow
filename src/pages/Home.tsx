import { IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './style.css';
import { Link } from 'react-router-dom';
import { City } from '../interface/City';
import HistoryPage from './User/HistoryPage';

const Home: React.FC = () => {
  // TODO use popularTrip data instead
  const popularCities : City[]=[];

  return (
    <IonPage>
      <IonHeader>
      <   IonToolbar>
            <IonTitle size="large">Où allez-vous ?</IonTitle>
          </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar> 
            <h1 className='homepageTitle'>Où allez-vous ?</h1>  
            <IonButtons slot="end">
              <Link to="/wishlist">
                <IonImg className='heart'
                  src="../../assets/heart.svg"
                  alt="heart to navigate"
                />
              </Link>
            </IonButtons>
          </IonToolbar>  
        </IonHeader>
        <h2 className='sectionTitle'>Destinations populaires</h2>
        { popularCities.length !== 0 &&
          <IonList>
              {popularCities.map((city) => (
                <IonCard key={city.id}>
                  <IonCardHeader>
                    <IonCardTitle>
                      {city.name}
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              ))}
          </IonList>
        }
        <h2 className='sectionTitle'>Dernière recherche</h2>
        <HistoryPage/>

      </IonContent>
    </IonPage>
  );
};

export default Home;
