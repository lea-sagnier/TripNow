import React, { useState } from "react";
import { IonButton, IonIcon, IonInput, IonLabel } from "@ionic/react";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

const Stepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 0 && displayName == "") {
      setCurrentStep(currentStep);
      setErrorMessage("Veuillez entrer un pseudo");
    } else if (currentStep === 1) {
      if(email == ""){
        setCurrentStep(currentStep);
        setErrorMessage("Veuillez entrer un email");
      }else if(!emailValid){
        setCurrentStep(currentStep);
        setErrorMessage("Veuillez entrer un mail valide");
      }else {
        setErrorMessage("");
      }
    } else if (currentStep === 2) {
      if (password == "") {
        setErrorMessage("Veuillez entrer un mot de passe");
        setCurrentStep(currentStep);
      }else if (password != cpassword) {
        setErrorMessage("Le mot de passe de confirmation ne correspond pas");
        setCurrentStep(currentStep);
      } else if (!passwordValid) {
        setErrorMessage(
          "Votre mot de passe doit contenir au moins 12 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial."
        );
        setCurrentStep(currentStep + 1);
      } else{
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: displayName })
          .then(() => {
          })
          .catch((error) => {
            console.error("Erreur lors de l'ajout du pseudo", error);
          });
        console.log(user);
        history.push("/verifyEmail");
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de l'inscription");
      });
  };
  const [passwordValid, setPasswordValid] = useState(false);

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&)(+=._-]).{12,}$/;
    setPasswordValid(passwordRegex.test(value));
  };
  const [emailValid, setemailValid] = useState(false);

  const validateMail =(value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setemailValid(emailRegex.test(value));
  }
  return (
    <div className="h-100">
      <div className="step-indicators">
        <div
          className={`step-indicator ${currentStep === 0 ? "active" : ""}`}
        ></div>
        <div
          className={`step-indicator ${currentStep === 1 ? "active" : ""}`}
        ></div>
        <div
          className={`step-indicator ${currentStep === 2 ? "active" : ""}`}
        ></div>
        <div
          className={`step-indicator ${currentStep === 3 ? "active" : ""}`}
        ></div>
      </div>
      <div className="stepper-content">
        {currentStep === 0 && (
          <div >
            <h2>S'inscrire</h2>
            <p>
              Votre nom d’utilisateur sera visible sur votre profil, vos annonces
              ... Vous pourrez le modifier quand bon vous semble
            </p>
            <IonLabel>Pseudo</IonLabel>
            <IonInput
              placeholder="Pseudo"
              value={displayName}
              onIonInput={(e) => setDisplayName(e.detail.value!)}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2>Adresse email</h2>
            <p>
              Optimiser votre envie de voyager en nous rejoignant. La création
              d’un compte vous permettra de retrouver toutes nos propositions de
              voyage à votre gout !
            </p>
            <IonLabel>Votre email</IonLabel>
            <IonInput
              required
              placeholder="exemple@gmail.com"
              value={email}
              onIonInput={(e) => {setEmail(e.detail.value!);
              validateMail(e.detail.value!)}}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2>Définissez votre mot de passe</h2>
            <p>
              Votre mot de passe doit contenir au moins 12 caractères dont une
              majuscule, une minuscule, un chiffre et un caractère spécial parmi
              !@#$%^&)(+=._-
            </p>
            <IonLabel>Mot de passe</IonLabel>
            <div className="input-icon">
              <IonInput
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onIonInput={(e) => {
                  setPassword(e.detail.value!);
                  validatePassword(e.detail.value!);
                }}
              />
              <IonIcon
                className="password-toggle-icon"
                icon={showPassword ? eyeOffOutline : eyeOutline}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <IonLabel>Confirmation du mot de passe</IonLabel>
            <div className="input-icon">
              <IonInput
                required
                type={showCPassword ? "text" : "password"}
                value={cpassword}
                onIonInput={(e) => setCPassword(e.detail.value!)}
              />
              <IonIcon
                className="password-toggle-icon"
                icon={showCPassword ? eyeOffOutline : eyeOutline}
                onClick={() => setShowCPassword(!showCPassword)}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div >
            <h2>Félicitations !</h2>
            <p>
              Votre compte à bien était créer, vous êtes maintenant prêt à trouver
              le voyage qui vous correspond le mieux !{" "}
            </p>
            <p> Alors, connecter vous pour en profiter au maximum.</p>
          </div>
        )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="btn-stepper">
        {currentStep < 3 ? (
          <IonButton onClick={handleNextStep}>Suivant</IonButton>
        ) : (
          <IonButton onClick={handleRegister}>Se connecter</IonButton>
        )}
        {currentStep < 1 ? (
          <IonButton fill="clear" href="./login">
            Se connecter
          </IonButton>
        ) : (
          <IonButton fill="clear" onClick={handlePreviousStep}>
            {" "}
            Précédent
          </IonButton>
        )}
      </div>
    </div>
  );
};

export default Stepper;
