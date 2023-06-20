import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,  
} from "@ionic/react";

import StepperOnboarding from "../../components/StepperOnboarding";

const Onboarding: React.FC = () => {
    return (
        <IonPage>
        <IonContent>
                <StepperOnboarding/>
        </IonContent>
        </IonPage>
    );
};

export default Onboarding;
