import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './style.css';
import { Link } from 'react-router-dom';
import { City } from '../interface/City';
import HistoryPage from './User/HistoryPage';
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/swiper.css';
import * as data from "../data/villes-france.json";

const Home: React.FC = () => {

  // convert JSON data to an array
  const allCitiesInfomations = JSON.parse(JSON.stringify(data)).default

  const cities : City[] = allCitiesInfomations.map((city : any) => {return {
    id: city.id,
    name: city.ville,
    location: city.region,
    place: city.departement,
    img: city.img,
    note: city.note,
  }} )

  console.log(cities)


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
        { cities.length !== 0 && 
          <Swiper slidesPerView={1.1}>
              {cities.map((city ) => (
                <SwiperSlide key={city.id}>
                <IonCard className='ionCardCity' style={{"backgroundImage":`linear-gradient(#000000ba , #00000000, #000000ba), url(${city.img})`}}>
                  <IonCardHeader>
                    <IonCardTitle>
                      <p className='cardLocationName'>{city.location}</p>
                      <p className='cardCityName'>{city.name}</p>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className='cityCardContent'> 
                    <p className='cityCardPlace'>{city.place}</p> 
                    <div className='cardFooter'>
                        <div className='informationInCardFooter'>    
                        <IonImg className='cardIcon'
                          src="../../assets/locationIcon.svg"
                          alt="arrow to go back"
                        />
                        <span>France</span>
                        </div>
                        <div className='informationInCardFooter'>    
                            <span>{city.note}</span>
                            <IonImg className='cardIcon'
                                src="../../assets/star.svg"
                                alt="heart to navigate"
                            />
                          </div>
                      </div>   
                  </IonCardContent>
                </IonCard>
                </SwiperSlide>
              ))}
          </Swiper>
        }
        <h2 className='sectionTitle'>Dernière recherche</h2>
        <HistoryPage/>

      </IonContent>
    </IonPage>
  );
};

export default Home;
