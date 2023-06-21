import {  IonContent, IonHeader, IonPage } from "@ionic/react"
import {  useLocation } from "react-router";

export const Result = () => {
    const location = useLocation();

    if(location.state){
        // @ts-expect-error
        const results = location.state.params.result;

        return (
            <IonPage>
                <IonHeader></IonHeader>
                <IonContent className="ion-padding">
                    <div className="recapContainer">
                        <h1 className="stepperHeaderTitle">Résultats</h1>
                        <div className="recapInformations">
                            {
                                results.length > 0 ? 
                                    results.map((city: any) => <p key={city.ville}>{city.ville}</p>) 
                                    :
                                    <p>Aucune ville ne correspond à vos recherches</p>
                            }           
                        </div>
                    </div>                 
                </IonContent>
                </IonPage>
            )
        }
}