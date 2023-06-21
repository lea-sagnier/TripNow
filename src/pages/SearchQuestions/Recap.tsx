import { IonButton, IonContent, IonPage } from "@ionic/react"
import { useHistory, useLocation } from "react-router";

export const Recap = () => {
    const location = useLocation();
    const history = useHistory();

    const handleResult = () => {
        if(location.state){
            history.push("/result", {
                params: { 
                    // @ts-expect-error
                    result: location.state.params.result
                }
            })
        }
    }

    const handleModif = () => {
        history.push("/form")
    }

    if(location.state){
        // @ts-expect-error
        const choices = location.state.params;

        return (
            <IonPage>
                <IonContent fullscreen>
                    <section>
                    <div className="recapContainer">
                        <h1 className="stepperHeaderTitle">Récapitulatif</h1>
                        <div className="recapInformations">
                            { choices.choice1 && 
                                <p className="recapTexte">
                                    Je recherche <span className="importantText"> {choices.choice1.text} </span>,
                                    Je voudrais <span className="importantText"> {choices.choice2.text} </span>
                                    et j'aimerais <span className="importantText"> {choices.choice3.text} </span>.
                                    Ce sera un séjour <span className="importantText"> {choices.choice4.text} </span> 
                                    <span className="importantText"> {choices.choice5.text} </span> 
                                    et je voudrais faire des <span className="importantText"> {choices.choice6.text} </span>. 
                                    J'ai un <span className="importantText"> {choices.choice7.text} </span>
                                </p>
                            }
                        </div>
                    </div>
                    <div className="btn-next">
                        <div>
                            <IonButton onClick={handleResult}>Valider les résultats</IonButton>
                            <IonButton fill="clear" onClick={handleModif}>
                            Modifier mes informations
                            </IonButton>
                        </div>
                    </div>
                    </section>
                </IonContent>
                </IonPage>
            )
        }
}