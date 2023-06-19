import React, { useState } from "react";
import { IonButton, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";

const StepperOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const history = useHistory();

  const handleNextStep = () => {
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLogin = () => {
    history.push("/login");
  };

  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <div className="h-100">
      <div className="step-indicators onbording-step">
        <div
          className={`step-indicator ${currentStep === 0 ? "active" : ""}`}
        ></div>
        <div
          className={`step-indicator ${currentStep === 1 ? "active" : ""}`}
        ></div>
      </div>
      <div className="stepper-content">
        {currentStep === 0 && (
          <div>
            <IonImg src="../../assets/background.svg" alt="some landscapes"/>
            <div className="description-onbording">
              <h1 className="titleInformation">Recherche</h1>
              <p className="informations">
                Différentes questions vous seront posées pour vous proposer des
                voyages correspondants.
              </p>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <IonImg  src="../../assets/background.svg" alt="some landscapes"
            />
            <div className="description-onbording">
              <h1 className="titleInformation">Swippez pour voyager</h1>
              <p className="informations">
                Il vous suffit de glisser vers le haut pour découvrir les
                destinations de vos envies.
              </p>
            </div>
          </div>
        )}

        <div className="btn-next">
          {currentStep < 1 ? (
            <div>
              <IonButton onClick={handleNextStep}>Suivant</IonButton>
              <IonButton fill="clear" onClick={handleLogin}>
                Passer
              </IonButton>
            </div>
          ) : (
            <div>
              <IonButton onClick={handleLogin}>Se connecter</IonButton>
              <IonButton fill="clear" onClick={handleRegister}>
                S'inscrire
              </IonButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperOnboarding;
