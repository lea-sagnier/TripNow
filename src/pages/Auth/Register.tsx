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
import { Link } from "react-router-dom";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore/lite";

const Register: React.FC = () => {
    const [lastname, setLastname]= useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
   

    function register() {
        if (password === cpassword) {
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                addUserRegister(user);
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

    async function addUserRegister(user: any) {
        try {
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    email,
                });
            }
        } catch (e) {
            console.error("Error adding document: ", e);
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
                    <IonLabel>Nom</IonLabel>
                    <IonInput 
                        onIonChange={(e: any) => setLastname(e.target.value)}
                    />
                    <IonLabel>Prénom</IonLabel>
                    <IonInput 
                        onIonChange={(e: any) => setFirstname(e.target.value)}
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