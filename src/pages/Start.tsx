import { IonButton, IonContent, IonImg, IonPage } from "@ionic/react";
import "./style.css";
import { useHistory } from "react-router";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";

const Start: React.FC = () => {
  const navigate = useHistory();
  const [loading, setLoading] = useState(true);

  const onNavigate = () => {
    navigate.push("/onboarding");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Définissez loading sur false une fois que la tâche est terminée
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader /> // Affichez le Loader si loading est true
      ) : (
        <IonPage>
          <IonContent fullscreen>
            <IonImg src="../../assets/background.svg" alt="some landscapes" />
            <h1 className="titleInformation">TRIPNOW</h1>
            <p className="informations">
              Vivez des expériences magiques en découvrant les destinations qui
              correspondent à vos envies
            </p>
            <IonButton
              className="primaryButton"
              color={"primary"}
              onClick={onNavigate}
            >
              Commencer
            </IonButton>
          </IonContent>
        </IonPage>
      )}
    </div>
  );
};

export default Start;
