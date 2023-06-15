import React, { useState } from 'react';
import { IonButton, IonIcon, IonInput, IonLabel } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router-dom';

const Stepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = () => {
    if (password === cpassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {      
            const user = userCredential.user;
            updateProfile(user, { displayName: displayName })
            .then(() => {
                console.log("Pseudo ajouté avec succès");
                sendEmailVerification(user)
                    .then(() => {
                        history.push('/verifyEmail')
                    }).catch((err) => alert(err.message))
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du pseudo", error);
            });
            console.log(user)
          })
          .catch((error) => {
            console.error(error);
            alert("Erreur lors de l'inscription");
          });
    }
    else {
        setErrorMessage("Le mot de passe de confirmation ne correspond pas");
    }
  };

  return (
    <div>
      {currentStep === 0 && (
        <div>
          <IonLabel>Pseudo</IonLabel>
          <IonInput value={displayName} onIonChange={(e) => setDisplayName(e.detail.value!)} />
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <IonLabel>Votre email</IonLabel>
          <IonInput value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <IonLabel>Mot de passe</IonLabel>
          <div className="password-input">
            <IonInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
            <IonIcon
              className="password-toggle-icon"
              icon={showPassword ? eyeOffOutline : eyeOutline}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <IonLabel>Confirmation du mot de passe</IonLabel>
          <div className="password-input">
            <IonInput
              type={showCPassword ? 'text' : 'password'}
              value={cpassword}
              onIonChange={(e) => setCPassword(e.detail.value!)}
            />
            <IonIcon
              className="password-toggle-icon"
              icon={showPassword ? eyeOffOutline : eyeOutline}
              onClick={() => setShowCPassword(!showCPassword)}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}

      <div>
        <IonButton onClick={handlePreviousStep} disabled={currentStep === 0}>
          Précédent
        </IonButton>
        {currentStep < 2 ? (
          <IonButton onClick={handleNextStep}>Suivant</IonButton>
        ) : (
          <IonButton onClick={handleRegister}>S'inscrire</IonButton>
        )}
      </div>
    </div>
  );
};

export default Stepper;
