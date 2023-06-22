import { IonContent, IonHeader, IonPage } from "@ionic/react"
import { SearchStepper } from "../../components/SearchStepper"
import { useLocation } from "react-router"

export const SearchQuestions = () => {
    return (
        <IonPage>
        <IonContent fullscreen>
            <section>
                <SearchStepper/>
            </section>
        </IonContent>
        </IonPage>
    )
}