import { IonContent, IonHeader, IonPage } from "@ionic/react"
import { SearchStepper } from "../../components/SearchStepper"

export const SearchQuestions = () => {
    return (
        <IonPage>
        <IonHeader></IonHeader>
        <IonContent className="ion-padding">
            <SearchStepper/>
        </IonContent>
        </IonPage>
    )
}