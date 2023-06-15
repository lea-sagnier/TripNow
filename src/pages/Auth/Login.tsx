import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonIcon,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import '../style.css';
import Loader from "../../components/loader";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const providerGoogle = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);
  
  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Adresse e-mail ou mot de passe incorrect");
      });
  }

  function signInWithGoogle() {
    signInWithRedirect(auth, providerGoogle);
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
        <IonHeader></IonHeader>
        <IonContent>
          <section>
            <h1>Bonjour</h1>
            <h2>Connectez vous pour découvrir toutes nos fonctionnalités</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                logIn();
              }}
            >
              <IonInput
                name="email"
                placeholder="Email"
                onIonChange={(e: any) => setEmail(e.target.value)}
              />
              <div className="password-input">
                <IonInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onIonChange={(e: any) => setPassword(e.target.value)}
                />
                <IonIcon
                  className="password-toggle-icon"
                  icon={showPassword ? eyeOffOutline : eyeOutline}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
  
              <Link to="/resetPassword">Mot de passe oublié ?</Link>
              <IonButton type="submit">Se connecter</IonButton>
            </form>
            <IonButton onClick={signInWithGoogle} expand="full" type="submit">
              Se connecter avec google
            </IonButton>
            <p>Vous voulez nous rejoindre ?</p>
            <Link to="/register">S'inscrire</Link>
          </section>
        </IonContent>
      </IonPage>  
      )}
    </div>
  );
};

export default Home;
