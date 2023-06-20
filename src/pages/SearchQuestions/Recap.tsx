import { IonContent, IonHeader, IonPage } from "@ionic/react"
import { useLocation } from "react-router";

export const Recap = () => {
    const location = useLocation();
    if(location.state){
        // @ts-expect-error
        const choices = location.state.params;
    
        return (
            <IonPage>
            <IonHeader></IonHeader>
            <IonContent className="ion-padding">
            <p>{choices.choice1.map((c: string) => c)}</p>
            <p>{choices.choice2.map((c: string) => c)}</p>
            <p>{choices.choice3.map((c: string) => c)}</p>
            <p>{choices.choice4.map((c: string) => c)}</p>
            <p>{choices.choice5.map((c: string) => c)}</p>
            <p>{choices.choice6.map((c: string) => c)}</p>
            <p>{choices.choice7.map((c: string) => c)}</p>
            </IonContent>
            </IonPage>
            )
        }
}