import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./style.css";
import { City } from "../interface/City";
import HistoryPage from "./User/HistoryPage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import * as data from "../data/villes-france.json";
import { heart} from "ionicons/icons";
import { useEffect, useState } from 'react';
import { CitiesSwiper } from "./CitiesSwiper";

const Home: React.FC = () => {
  // convert JSON data to an array
  const allCitiesInfomations = JSON.parse(JSON.stringify(data)).default;

  const cities : City[] = allCitiesInfomations.map((city : any) => {return {
    id: city.id,
    name: city.ville,
    location: city.region,
    place: city.departement,
    img: city.img,
    note: city.note,
  }} )

  const getRandomCities = () => {
    const citiesAvailable = cities;
    let selectedCities : City[] = []
    for(let i = 0; i<5; i++){
      const rand = Math.floor(Math.random()*citiesAvailable.length);
      selectedCities.push(citiesAvailable[rand])
      citiesAvailable.splice(rand, 1)
    }
    setSelectedCities(selectedCities)
  }

  const months = ["Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Janvier", "Février", "Mars", "Avril", "Mai"];

  const [activeMonth, setActiveMonth] = useState(months[0]);
  const [selectedCities, setSelectedCities] = useState<City[]>([])

  useEffect(() => {getRandomCities()}, [activeMonth])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Où allez-vous ?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h1 className="homepageTitle">Où allez-vous ?
          <IonButton className="btn-icon" fill="clear" href="./wishlist">
            <IonIcon slot="icon-only" aria-hidden="true" icon={heart} />
          </IonButton>
        </h1>
        <h2 className="sectionTitle">Destinations populaires</h2>
        <Swiper slidesPerView={3} spaceBetween={10} className='monthSwiper'>
              {months.map((month ) => (
                <SwiperSlide key={month}>
                 
                <IonCard className='monthIonCard' >
                  
                  <IonCardContent className={activeMonth === month ? "activeCard" : "" } onClick={() => setActiveMonth(month)}  > 
                    <p className='monthText'>{month}</p>  
                  </IonCardContent>
                
                </IonCard>
                </SwiperSlide>
              ))}
        </Swiper>
        <CitiesSwiper selectedCities={selectedCities} />
       
        <h2 className="sectionTitle">Dernière recherche</h2>
        <HistoryPage />
      </IonContent>
    </IonPage>
  );
};

export default Home;
