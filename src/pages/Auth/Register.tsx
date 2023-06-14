import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { createUserWithEmailAndPassword, updateProfile,  sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [displayName, setDisplayName] = useState("");

    const history = useHistory();

    function register() {
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
    }

    return (
        <IonPage>
        <IonHeader></IonHeader>
        <IonContent>
            <section >     
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    register();
                    }}
                >
                    <IonLabel>Pseudo</IonLabel>
                    <IonInput
                        onIonChange={(e: any) => setDisplayName(e.target.value)}
                    />
                    <IonLabel>Votre email</IonLabel>
                    <IonInput
                        onIonChange={(e: any) => setEmail(e.target.value)}
                    />
                    <IonLabel>Mot de passe</IonLabel>
                    <div className="password-input">
                        <IonInput
                            type={showPassword ? "text" : "password"}
                            onIonChange={(e: any) => setPassword(e.target.value)}
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
                            type={showCPassword ? "text" : "password"}
                            onIonChange={(e: any) => setCPassword(e.target.value)}
                        />
                        <IonIcon
                            className="password-toggle-icon"
                            icon={showPassword ? eyeOffOutline : eyeOutline}
                            onClick={() => setShowCPassword(!showCPassword)}
                        />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <IonButton type="submit">S'inscrire</IonButton>
                </form>
                <Link to="/">SE CONNECTER</Link>
            </section>
        </IonContent>
        </IonPage>
    );
};

export default Register;
