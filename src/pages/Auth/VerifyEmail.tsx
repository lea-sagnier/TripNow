import { IonButton, IonContent, IonHeader, IonPage } from "@ionic/react";
import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../hooks/UserHook";

export const VerifyEmail = () => {
    const history = useHistory();
    const currentUser = useCurrentUser()
    const [time, setTime] = useState(60)
    const [timeActive, setTimeActive] = useState(true)

    useEffect(() => {
        let interval : any = null
        if(timeActive && time !== 0 ){
          interval = setInterval(() => {
            setTime((time) => time - 1)
          }, 1000)
        }else if(time === 0){
          setTimeActive(false)
          setTime(60)
          clearInterval(interval)
        }
        return () => clearInterval(interval);
      }, [timeActive, time])
    
    useEffect(() => {
        const interval = setInterval(() => {
          currentUser?.reload()
          .then(() => {
            if(currentUser?.emailVerified){
              clearInterval(interval)
              history.push('/home')
            }
          })
          .catch((err) => {
            alert(err.message)
          })
        }, 1000)
      }, [history, currentUser])  
    
    const resendEmailVerification = () => {
        if(auth.currentUser !== null){
            sendEmailVerification(auth.currentUser)
            .then(() => {
                setTimeActive(true)
            }).catch((err) => {
            alert(err.message)
            })
        }
    }

    return (
        <IonPage>
          <IonHeader></IonHeader>
          <IonContent>
            <section>
            <h1>Vérifions votre Email.</h1>
            <p>{currentUser?.email}</p>
            <IonButton 
                onClick={resendEmailVerification}
                disabled={timeActive}
            >
                Renvoyer le mail {timeActive && time}
            </IonButton>
            </section>
          </IonContent>
        </IonPage>
      );
}