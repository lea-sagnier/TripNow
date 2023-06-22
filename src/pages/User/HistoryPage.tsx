import {
    IonCard,
    IonContent,
    IonCardHeader,
    IonCardTitle,
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
  
  import "../style.css";
  
  const HistoryPage: React.FC = () => {
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
        return historyLists;
      }
      async function fetchHistory() {
        const histories = await getHistory();
        setHistory(histories);
      }
      fetchHistory();
    }, [user?.uid]);


    //Page d'affichage des réservations
    if (histories.length === 0) {
      return (
        <span className="emptyHistory">Aucune recherche n’a été éffectué !</span>     
      );
    }
    return (
        <div >
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
        </div>
    );
  };
  
  export default HistoryPage;
  