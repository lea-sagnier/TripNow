import { Swiper, SwiperSlide } from "swiper/react"
import { City } from "../interface/City"
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react"
import { locationOutline, star } from "ionicons/icons"

type props = {
    selectedCities:  City[]
}
export const CitiesSwiper = ({selectedCities } : props ) => {
    return (
        <>
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
        </>
    )
}