import React, { useState } from "react";
import {
  IonButton,
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
    history.push("/login");
  };

  return (
    <div>
      {currentStep === 0 && (
        <div>
            <IonImg src="../../assets/background.svg" alt="some landscapes" />
            <h1 className="titleInformation">Recherche</h1>
            <p className="informations">
              Différentes questions vous seront posées pour vous proposer des
              voyages correspondants.
            </p>
        </div>
      )}

      {currentStep === 1 && (
        <div>
            <IonImg src="../../assets/background.svg" alt="some landscapes" />
            <h1 className="titleInformation">Titre</h1>
            <p className="informations">
              Sous titre
            </p>
        </div>
      )}

      {currentStep === 2 && (
        <div>
            <IonImg src="../../assets/background.svg" alt="some landscapes" />
            <h1 className="titleInformation">Swippez pour voyager</h1>
            <p className="informations">
              Il vous suffit de glisser vers le haut pour découvrir les destinations de vos envies.
            </p>
        </div>
      )}

      <div>
        {currentStep < 2 ? (
          <div>
            <IonButton onClick={handleNextStep}>Suivant</IonButton>
            <IonButton fill="clear" onClick={handleMissOut}>Passer</IonButton>
          </div>
        ) : (
          <IonButton onClick={handleMissOut}>Passer</IonButton>
        )}
      </div>
    </div>
  );
};

export default StepperOnboarding;
