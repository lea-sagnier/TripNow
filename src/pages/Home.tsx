import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
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
import { heart, locationOutline, star } from "ionicons/icons";
import { useEffect, useState } from 'react';

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
    let selectedCities : City[] = []
    for(let i = 0; i<5; i++){
      const rand = Math.floor(Math.random()*cities.length);
      selectedCities.push(cities[rand])
    }
    setSelectedCities(selectedCities)
  }

  const months = ["Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Janvier", "Février", "Mars", "Avril", "Mai"];

  const [activeMonth, setActiveMonth] = useState(months[0]);
  const [selectedCities, setSelectedCities] = useState<City[]>([])

  useEffect(() => {getRandomCities()}, [activeMonth])

  const onChangeMonth = (month : string) => {
    setActiveMonth(month);
    getRandomCities();
  }

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
                  
                  <IonCardContent className={activeMonth === month ? "activeCard" : "" } onClick={() => onChangeMonth(month)}  > 
                    <p className='monthText'>{month}</p>  
                  </IonCardContent>
                
                </IonCard>
                </SwiperSlide>
              ))}
        </Swiper>

        { selectedCities.length !== 0 && 
          <Swiper slidesPerView={1.1} className='citySwiper'>
              {selectedCities.map((city ) => (
                <SwiperSlide key={city.id}>
                <IonCard className='ionCardCity' style={{"backgroundImage":`linear-gradient(#000000ba , #00000000, #000000ba), url(${city.img})`}}>
                  <IonCardHeader>
                    <IonCardTitle>
                      <p className="cardLocationName">{city.location}</p>
                      <p className="cardCityName">{city.name}</p>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="cityCardContent">
                    <p className="cityCardPlace">{city.place}</p>
                    <div className="cardFooter">
                      <div className="informationInCardFooter">
                      <IonIcon slot="icon-only" aria-hidden="true" icon={locationOutline} />
                        <span>France</span>
                      </div>
                      <div className="informationInCardFooter">
                        <span>{city.note}</span>
                        <IonIcon slot="icon-only" aria-hidden="true" icon={star} />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </SwiperSlide>
            ))}
          </Swiper>
        }
        <h2 className="sectionTitle">Dernière recherche</h2>
        <HistoryPage />
      </IonContent>
    </IonPage>
  );
};

export default Home;
