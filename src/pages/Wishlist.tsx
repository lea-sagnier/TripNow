import {
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/UserHook";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { History } from "../interface/History";
import { chevronBackOutline, heart } from "ionicons/icons";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<History[]>([]);
  const navigate = useHistory();
  const user = useCurrentUser();

  useEffect(() => {
    async function getHistory() {
      const historyCol = collection(db, "history");
      const historyQuery = query(
        historyCol,
        where("userId", "==", user?.uid || ""),
        where("favorite", "==", true)
      );
      const historySnapshot = await getDocs(historyQuery);
      const historyLists = historySnapshot.docs.map((doc) => {
        const history = doc.data() as History;
        history.id = doc.id;
        return history;
      });
      console.log(historyLists);
      return historyLists;
    }
    async function fetchHistory() {
      const histories = await getHistory();
      console.log(histories);
      setWishlist(histories);
    }
    fetchHistory();
  }, [user?.uid]);

  const onNavigate = () => {
    navigate.push("/form");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="btn-navigation">
          <IonButton fill="clear" className="btn-icon" href="./home">
            <IonIcon slot="icon-only" aria-hidden="true" icon={chevronBackOutline} />
          </IonButton>
          <IonButton fill="clear" className="btn-icon btn-chevron">
            <IonIcon slot="icon-only" aria-hidden="true" icon={heart} />
          </IonButton>
        </div>
        {wishlist.length === 0 ? (
          <>
            <span className="emptyWishlist">
              Aucune destination dans votre liste de souhait. Il est temps de
              faire des découvertes !
            </span>
            <IonButton
              onClick={onNavigate}
            >
              Découvrir
            </IonButton>
          </>
        ) : (
          <IonList>
            {wishlist.map((city) => (
              <IonCard key={city.id}>
                <IonCardHeader>
                  <IonCardTitle>{city.cityName}</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Wishlist;
