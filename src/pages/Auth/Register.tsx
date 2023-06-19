import React, { useState } from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";

import Stepper from "../../components/Stepper";

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <section>
          <Stepper />
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Register;
