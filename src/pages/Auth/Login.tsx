import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { chevronBackOutline, eyeOffOutline, eyeOutline, mailOutline } from "ionicons/icons";
import "../style.css";
import Loader from "../../components/Loader";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useHistory();
  
  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate.push("/home");   
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Adresse e-mail ou mot de passe incorrect");
      });
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Définissez loading sur false une fois que la tâche est terminée
    }, 2000);
  }, []);

  return (
    //Page d'accueil
    <div>
      {loading ? (
        <Loader /> // Affichez le Loader si loading est true
      ) : (
        <IonPage>
          <IonContent>
            <section>
              <IonButton fill="clear" className="btn-icon" href="./onboarding">
                <IonIcon className="back-btn" slot="icon-only" aria-hidden="true" icon={chevronBackOutline} />
              </IonButton>
              <h1 className="display">Se connecter</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  logIn();
                }}
              >
                <div className="d-flex">
                  <IonLabel position="stacked">Adresse mail</IonLabel>
                  <div className="input-icon">
                    <IonInput
                      name="email"
                      placeholder="exemple@gmail.com"
                      onIonInput={(e: any) => setEmail(e.target.value)}
                    />
                    <IonIcon
                      className="password-toggle-icon"
                      icon={mailOutline}
                    />
                  </div>
                  <IonLabel position="stacked">Mot de passe</IonLabel>
                  <div className="input-icon">
                    <IonInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mot de passe"
                      onIonInput={(e: any) => setPassword(e.target.value)}
                    />
                    <IonIcon
                      className="password-toggle-icon"
                      icon={showPassword ? eyeOffOutline : eyeOutline}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}

                  <Link to="/resetPassword">Mot de passe oublié ?</Link>
                </div>

                <IonButton type="submit">Se connecter</IonButton>
              </form>
                    <div  className="pt-1">

              <IonButton fill="clear" href="/register">
                S'inscrire
              </IonButton>
                    </div>
            </section>
          </IonContent>
        </IonPage>
      )}
    </div>
  );
};

export default Login;
