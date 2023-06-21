import { IonContent, IonPage } from "@ionic/react";
import { useLocation } from "react-router";

export const Result = () => {
  const location = useLocation();

  if (location.state) {
    // @ts-expect-error
    const results = location.state.params.result;

        const getResults = () => {
            const result = []
            for(let i=0; i<5; i++){
                result.push(<p key={results[i].ville}>{results[i].ville}</p>)
            }
            return result
        }

        return (
            <IonPage>
                <IonContent fullscreen>
                    <section>
                    <div>
                        <h1 className="stepperHeaderTitle">Résultats</h1>
                        <div className="recapInformations">
                            {
                                results.length > 0 ? 
                                    results.length > 5 ? 
                                        getResults()
                                        :
                                        results.map((city: any) => <p key={city.ville}>{city.ville}</p>) 
                                    :
                                    <p>Aucune ville ne correspond à vos recherches</p>
                            }           
                        </div>
                    </div>          
                    </section>       
                </IonContent>
                </IonPage>
            )
        }
}