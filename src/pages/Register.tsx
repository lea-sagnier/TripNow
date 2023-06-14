import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  
} from "@ionic/react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    const [lastname, setLastname]= useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");


    function register() {
        if (password === cpassword) {
        // TODO: uncomment when firebase is done
        //     createUserWithEmailAndPassword(auth, email, password)
        //       .then((userCredential) => {
        //         const user = userCredential.user;
        //         addUserRegister(user);
        //       })
        //       .catch((error) => {
        //         console.error(error);
        //         alert("Erreur lors de l'inscription");
        //       });
        }
    }

    async function addUserRegister(user: any) {
        // TODO: uncomment when firebase is done
        // try {
        //     if (user) {
        //         await setDoc(doc(db, "users", user.uid), {
        //             email,
        //         });
        //     }
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }
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
                    <IonInput
                        type="password"
                    
                        onIonChange={(e: any) => setPassword(e.target.value)}
                    />
                    <IonLabel>Confirmation du mot de passe</IonLabel>
                    <IonInput
                        type="password"
                        onIonChange={(e: any) => setCPassword(e.target.value)}
                    />
                    <IonButton type="submit">S'inscrire</IonButton>
                </form>
                <Link to="/">SE CONNECTER</Link>
            </section>
        </IonContent>
        </IonPage>
    );
};

export default Register;