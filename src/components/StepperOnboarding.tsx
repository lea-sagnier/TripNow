import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const StepperOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const history = useHistory();

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleMissOut = () => {
    history.push("/home");
  };

  return (
    <div>
      {currentStep === 0 && (
        <div>
          <IonContent fullscreen>
            <IonImg src="../../assets/background.svg" alt="some landscapes" />
            <h1 className="titleInformation">Recherche</h1>
            <p className="informations">
              Différentes questions vous seront posées pour vous proposer des
              voyages correspondants.
            </p>
          </IonContent>
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <IonContent fullscreen>
            <IonImg src="../../assets/background.svg" alt="some landscapes" />
            <h1 className="titleInformation">Titre</h1>
            <p className="informations">
              Sous titre
            </p>
          </IonContent>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <IonContent fullscreen>
            <IonImg src="../../assets/background.svg" alt="some landscapes" />
            <h1 className="titleInformation">Swippez pour voyager</h1>
            <p className="informations">
              Il vous suffit de glisser vers le haut pour découvrir les destinations de vos envies.
            </p>
          </IonContent>
        </div>
      )}

      <div>
        {currentStep < 2 ? (
          <div>
            <IonButton onClick={handleNextStep}>Suivant</IonButton>
            <IonButton onClick={handleMissOut}>Passer</IonButton>
          </div>
        ) : (
          <IonButton onClick={handleMissOut}>Passer</IonButton>
        )}
      </div>
    </div>
  );
};

export default StepperOnboarding;
