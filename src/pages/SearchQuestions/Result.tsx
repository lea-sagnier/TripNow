import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export const Result = () => {
  const location = useLocation();

  if (location.state) {
    // @ts-expect-error
    const results = location.state.params.result;

    const getResults = () => {
      const result = [];
      for (let i = 0; i < 5; i++) {
        result.push(
          <div id={`ville${i}`} key={i}>
              <img className="result-img" src={results[i].imgResult} alt={`Ville ${i}`} />
          </div>
        );
      }
      return result;
    };

    return (
      <IonPage>
        <IonContent >
          <div>
            {results.length > 0 ? (
              results.length > 5 ? (
                getResults()
              ) : (
                results.map((city: any) => <p key={city.ville}>{city.ville}</p>)
              )
            ) : (
              <p>Aucune ville ne correspond à vos recherches</p>
            )}
          </div>
        </IonContent>
      </IonPage>
    );
  }
};
