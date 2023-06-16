import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '../hooks/UserHook';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';
import { History } from '../interface/History';

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
            console.log(historyLists)
            return historyLists;
        }
        async function fetchHistory() {
            const histories = await getHistory();
            console.log(histories)
            setWishlist(histories);
        }
        fetchHistory();
    }, [user?.uid]);
  
    const onNavigate = () => {
      navigate.push("/form");   
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Wishlist</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar> 
                        <IonButtons slot={"start"}>
                            <Link to="/home">
                                <IonImg className='heart'
                                src="../../assets/arrow.svg"
                                alt="arrow to go back"
                                />
                            </Link>
                        </IonButtons>  
                        <IonButtons slot="end">
                            <IonImg className='heart'
                                src="../../assets/heart.svg"
                                alt="heart to navigate"
                            />
                        </IonButtons>
                    </IonToolbar>  
                </IonHeader>
                { wishlist.length === 0 ? 
                    <>
                        <span className='emptyWishlist'>
                            Aucune destination dans votre liste de souhait. 
                            Il est temps de faire des découvertes !
                        </span>
                        <IonButton  
                            className='primaryButton' 
                            color={"primary"} 
                            onClick={onNavigate}
                        >
                            Découvrir
                        </IonButton> 
                    </>: 
                    <IonList>
                        {wishlist.map((city) => (
                            <IonCard key={city.id}>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        {city.cityName}
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        ))}
                  </IonList>
                }
            </IonContent>
        </IonPage>
    );
};

export default Wishlist;
