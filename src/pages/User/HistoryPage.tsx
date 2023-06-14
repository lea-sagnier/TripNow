import {
    IonCard,
    IonHeader,
    IonContent,
    IonPage,
    IonCardHeader,
    IonCardTitle,
    IonToolbar,
    IonButton,
    IonList,
  } from "@ionic/react";
  import {
    collection,
    getDocs,
    query,
    where,
  } from "firebase/firestore/lite";
  import { db } from "../../firebaseConfig";
  import "firebase/app";
  import "firebase/firestore";
  import { History } from "../../interface/History";
  import { useEffect, useState } from "react";
  import { useCurrentUser } from "../../hooks/UserHook";
  import { useHistory } from "react-router";
  
  import "../style.css";
  
  const HistoryPage: React.FC = () => {
    const navigate = useHistory();
    const [histories, setHistory] = useState<History[]>([]);
    const user = useCurrentUser();
    useEffect(() => {
      async function getHistory() {
        const historyCol = collection(db, "history");
        const historyQuery = query(
            historyCol,
          where("userId", "==", user?.uid || "")
        );
        const historySnapshot = await getDocs(historyQuery);
        const historyLists = historySnapshot.docs.map((doc) => {
          const histroy = doc.data() as History;
          histroy.id = doc.id;
          return histroy;
        });
        console.log(historyLists)
        return historyLists;
      }
      async function fetchHistory() {
        const histories = await getHistory();
        console.log(histories)
        setHistory(histories);
      }
      fetchHistory();
    }, [user?.uid]);


    //Page d'affichage des réservations
    if (histories.length === 0) {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>Mon historique</IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
              <h1>Vous n'avez d'historique</h1>
              <IonButton
                onClick={(e) => {
                  e.preventDefault();
                  navigate.push("/home");
                }}
              >
                Retourner à l'accueil
              </IonButton>
          </IonContent>
        </IonPage>
      );
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>Mon historique</IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <h1>Mon historique</h1>
          <IonList>
            {histories.map((history) => (
              <IonCard key={history.id}>
                <IonCardHeader>
                  <IonCardTitle>
                    {history.cityName}
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default HistoryPage;
  