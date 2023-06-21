import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { eyeOutline, eyeOffOutline, chevronBackOutline } from "ionicons/icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleRegister = () => {
    if (displayName == "") {
      return setErrorMessage("Veuillez entrer un pseudo");
    }

    if (email == "") {
      return setErrorMessage("Veuillez entrer un email");
    } else if (!emailValid) {
      return setErrorMessage("Veuillez entrer un mail valide");
    }

    if (password == "") {
      return setErrorMessage("Veuillez entrer un mot de passe");
    } else if (password != cpassword) {
      return setErrorMessage(
        "Le mot de passe de confirmation ne correspond pas"
      );
    } else if (!passwordValid) {
      return setErrorMessage(
        "Votre mot de passe doit contenir au moins 12 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: displayName })
          .then(() => {})
          .catch((error) => {
            console.error("Erreur lors de l'ajout du pseudo", error);
          });
        history.push("/verifyEmail");
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de l'inscription");
      });

    setErrorMessage("");
  };

  const [passwordValid, setPasswordValid] = useState(false);

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#*$%^&)(+=._-]).{12,}$/;
    setPasswordValid(passwordRegex.test(value));
  };
  const [emailValid, setemailValid] = useState(false);

  const validateMail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setemailValid(emailRegex.test(value));
  };

  return (
    <IonPage>
      <IonContent>
        <section>
          <IonButton fill="clear" className="btn-icon" href="./onboarding">
            <IonIcon
              className="back-btn"
              slot="icon-only"
              aria-hidden="true"
              icon={chevronBackOutline}
            />
          </IonButton>

          <h1 className="display">S'inscrire</h1>
          <div className="form-register">
            <div>
              <IonLabel>Pseudo</IonLabel>
              <IonInput
                placeholder="Exemple59"
                value={displayName}
                onIonInput={(e) => setDisplayName(e.detail.value!)}
              />
              <IonLabel>Adresse email*</IonLabel>
              <IonInput
                required
                placeholder="exemple@gmail.com"
                value={email}
                onIonInput={(e) => {
                  setEmail(e.detail.value!);
                  validateMail(e.detail.value!);
                }}
              />
              <IonLabel>Mot de passe*</IonLabel>
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
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="d-flex">
              <IonButton onClick={handleRegister}>S'incrire</IonButton>
              <IonButton fill="clear" href="./login">
                Se connecter
              </IonButton>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Register;
