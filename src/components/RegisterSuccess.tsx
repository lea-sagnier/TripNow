import { IonPage, IonHeader, IonContent } from "@ionic/react";

export const RegisterSuccess = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <div>
          <h2>Félicitations !</h2>
          <p>
            Votre compte à bien était créer, vous êtes maintenant prêt à trouver
            le voyage qui vous correspond le mieux !
          </p>
          <p> Alors, connecter vous pour en profiter au maximum.</p>
        </div>
        ;
      </IonContent>
    </IonPage>
  );
};
