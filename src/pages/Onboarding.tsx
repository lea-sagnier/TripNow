import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,  
} from "@ionic/react";

import StepperOnboarding from "../components/StepperOnboarding";

const Onboarding: React.FC = () => {
    return (
        <IonPage>
        <IonHeader></IonHeader>
        <IonContent>
            <section>
                <StepperOnboarding/>
            </section>
        </IonContent>
        </IonPage>
    );
};

export default Onboarding;
