import React, { useEffect, useState } from "react";
import { IonButton, IonIcon, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { chevronBackOutline, star, sunny } from "ionicons/icons";
import * as data from "../data/villes-france.json";

type Choice = {
  data: string;
  text: string;
};

export const SearchStepper: React.FC  = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const history = useHistory();
  const [result, setResult] = useState<any[]>([]);
  const [choice1, setChoice1] = useState<Choice>();
  const [choice2, setChoice2] = useState<Choice>();
  const [choice3, setChoice3] = useState<Choice>();
  const [choice4, setChoice4] = useState<Choice>();
  const [choice5, setChoice5] = useState<Choice>();
  const [choice6, setChoice6] = useState<Choice>();
  const [choice7, setChoice7] = useState<Choice>();
  const [disabled, setDisabled] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const [activeButton2, setActiveButton2] = useState(null);
  const [activeButton3, setActiveButton3] = useState(null);
  const [activeButton4, setActiveButton4] = useState(null);
  const [activeButton5, setActiveButton5] = useState(null);
  const [activeButton6, setActiveButton6] = useState(null);
  const [activeButton7, setActiveButton7] = useState(null);
 
  // convert JSON data to an array
  const allCitiesInfomations = JSON.parse(JSON.stringify(data)).default;
  const handleBtnClick = (button: any) => {
    setActiveButton(button);
  };
  const handleBtnClick2 = (button: any) => {
    setActiveButton2(button);
  };
  const handleBtnClick3 = (button: any) => {
    setActiveButton3(button);
  };
  const handleBtnClick4 = (button: any) => {
    setActiveButton4(button);
  };
  const handleBtnClick5 = (button: any) => {
    setActiveButton5(button);
  };
  const handleBtnClick6 = (button: any) => {
    setActiveButton6(button);
  };
  const handleBtnClick7 = (button: any) => {
    setActiveButton7(button);
  };
  const handleNextStep = () => {
    if (currentStep === 0) {
      let tmpResult = [];
      choice1?.data === "chaud" &&
        tmpResult.push(
          ...allCitiesInfomations.filter((city: any) => city.chaud === true)
        );

      choice1?.data === "froid" &&
        tmpResult.push(
          ...allCitiesInfomations.filter((city: any) => city.froid === true)
        );

      choice1?.data === "tempéré" &&
        tmpResult.push(
          ...allCitiesInfomations.filter((city: any) => city.tempere === true)
        );

      setResult(Array.from(new Set(tmpResult)));
    }

    if (currentStep === 1) {
      let tmpResult = [];
      choice2?.data === "campagne" &&
        tmpResult.push(...result.filter((city: any) => city.campagne === true));

      choice2?.data === "urbain" &&
        tmpResult.push(...result.filter((city: any) => city.urbain === true)),
        choice2?.data === "touristique" &&
          tmpResult.push(
            ...result.filter((city: any) => city.touristique === true)
          ),
        setResult(Array.from(new Set(tmpResult)));
    }

    if (currentStep === 2) {
      let tmpResult = [];
      choice3?.data === "calme" &&
        tmpResult.push(...result.filter((city: any) => city.calme === true));

      choice3?.data === "périurbaine" &&
        tmpResult.push(
          ...result.filter((city: any) => city.périurbaine === true)
        );

      choice3?.data === "festif" &&
        tmpResult.push(...result.filter((city: any) => city.festif === true));

      setResult(tmpResult);
    }

    if (currentStep === 4) {
      let tmpResult = [];
      choice5?.data === "solitaire" &&
        tmpResult.push(...result.filter((city: any) => city.seul === true));

      choice5?.data === "couple" &&
        tmpResult.push(...result.filter((city: any) => city.plusieur === true));

      choice5?.data === "groupe" &&
        tmpResult.push(...result.filter((city: any) => city.plusieur === true));

      setResult(tmpResult);
    }

    if (currentStep === 5) {
      let tmpResult = [];
      choice6?.data === "aventure" &&
        tmpResult.push(...result.filter((city: any) => city.aventure === true));

      choice6?.data === "detente" &&
        tmpResult.push(...result.filter((city: any) => city.detente === true));

      choice6?.data === "historique" &&
        tmpResult.push(
          ...result.filter((city: any) => city.historique === true)
        );

      setResult(tmpResult);
    }

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
    setDisabled(true);
  };

  const handleRecap = () => {
    history.push("/recap", {
      params: {
        choice1: choice1,
        choice2: choice2,
        choice3: choice3,
        choice4: choice4,
        choice5: choice5,
        choice6: choice6,
        choice7: choice7,
        result: result,
      },
    });
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setDisabled(false);
    }

    if (currentStep === 0) {
      history.push("/search");
    }
  };

  return (
    <div>
      <div>
        {currentStep === 0 && (
          <div>
            <div className="stepperHeader">
              <IonButton
                fill="clear"
                className="btn-icon"
                onClick={handlePreviousStep}
              >
                <IonIcon
                  slot="icon-only"
                  aria-hidden="true"
                  icon={chevronBackOutline}
                />
              </IonButton>
              <div>
                <h1 className="stepperHeaderTitle">1 / 7</h1>
                <h2 className="stepperHeaderSubtitle">
                  1 seule réponse est attendue
                </h2>
              </div>
            </div>
            <div>
              <h1 className="stepperQuestionTitle">Je recherche...</h1>
              <div className="questionsButtons">
                <IonButton
                  color={activeButton === "button1" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice1({
                      data: "chaud",
                      text: "un endroit ensoleillé",
                    }),
                      setDisabled(false);
                    handleBtnClick("button1");
                  }}
                >
                  ☀️ Un endroit ensoleillé
                </IonButton>
                <IonButton
                  color={activeButton === "button2" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice1({ data: "tempéré", text: "un endroit tempéré" }),
                      setDisabled(false);
                    handleBtnClick("button2");
                  }}
                >
                  ☁️ Un endroit tempéré
                </IonButton>
                <IonButton
                  color={activeButton === "button3" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice1({ data: "froid", text: "un endroit froid" });
                    setDisabled(false);
                    handleBtnClick("button3");
                  }}
                >
                  ❄️ Une destination froide
                </IonButton>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <div className="stepperHeader">
              <IonButton
                fill="clear"
                className="btn-icon"
                onClick={handlePreviousStep}
              >
                <IonIcon
                  slot="icon-only"
                  aria-hidden="true"
                  icon={chevronBackOutline}
                />
              </IonButton>
              <div>
                <h1 className="stepperHeaderTitle">2 / 7</h1>
                <h2 className="stepperHeaderSubtitle">
                  1 seule réponse est attendue
                </h2>
              </div>
            </div>
            <div>
              <h1 className="stepperQuestionTitle">Je voudrais...</h1>
              <div className="questionsButtons">
                <IonButton
                  color={activeButton2 === "button1" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice2({
                      data: "campagne",
                      text: "être dans la nature",
                    }),
                      setDisabled(false);
                    handleBtnClick2("button1");
                  }}
                >
                  🌱 Etre dans la nature
                </IonButton>
                <IonButton
                  color={activeButton2 === "button2" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice2({ data: "urbain", text: "être en ville" }),
                      setDisabled(false);
                    handleBtnClick2("button2");
                  }}
                >
                  🌆 Etre en ville
                </IonButton>
                <IonButton
                  color={activeButton2 === "button3" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice2({
                      data: "touristique",
                      text: "visiter des lieux",
                    }),
                      setDisabled(false);
                    handleBtnClick2("button3");
                  }}
                >
                  🏛️ Visiter des lieux
                </IonButton>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="stepperHeader">
              <IonButton
                fill="clear"
                className="btn-icon"
                onClick={handlePreviousStep}
              >
                <IonIcon
                  slot="icon-only"
                  aria-hidden="true"
                  icon={chevronBackOutline}
                />
              </IonButton>
              <div>
                <h1 className="stepperHeaderTitle">3 / 7</h1>
                <h2 className="stepperHeaderSubtitle">
                  1 seule réponse est attendue
                </h2>
              </div>
            </div>
            <div>
              <h1 className="stepperQuestionTitle">J'aimerais...</h1>
              <div className="questionsButtons">
                <IonButton
                  color={activeButton3 === "button1" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice3({
                      data: "calme",
                      text: "un lieu calme et isolé",
                    }),
                      setDisabled(false);
                    handleBtnClick3("button1");
                  }}
                >
                  🤫 Un lieu calme et isolé
                </IonButton>
                <p className="choiceInformations">
                  Préférez-vous des destinations peu peuplées, avec des espaces
                  naturels préservés, afin de profiter d'une atmosphère
                  relaxante ?
                </p>
                <IonButton
                  color={activeButton3 === "button2" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice3({
                      data: "",
                      text: "un équilibre entre nature et ville",
                    }),
                      setDisabled(false);
                    handleBtnClick3("button2");
                  }}
                >
                  🌳 Un équilibre entre nature et ville
                </IonButton>
                <p className="choiceInformations">
                  Souhaitez-vous visiter des endroits qui offrent un mélange
                  d'espaces naturels, où vous pouvez apprécier à la fois la
                  sérénité de la nature et l'animation des villes ?
                </p>
                <IonButton
                  color={activeButton3 === "button3" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice3({
                      data: "festif",
                      text: "une vie urbaine animée",
                    }),
                      setDisabled(false);
                    handleBtnClick3("button3");
                  }}
                >
                  🥳 Une vie urbaine animée
                </IonButton>
                <p className="choiceInformations">
                  Êtes-vous attiré(e) par des destinations dynamiques, avec une
                  densité de population élevée, offrant une multitude
                  d'attractions ?
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div className="stepperHeader">
              <IonButton
                fill="clear"
                className="btn-icon"
                onClick={handlePreviousStep}
              >
                <IonIcon
                  slot="icon-only"
                  aria-hidden="true"
                  icon={chevronBackOutline}
                />
              </IonButton>
              <div>
                <h1 className="stepperHeaderTitle">4 / 7</h1>
                <h2 className="stepperHeaderSubtitle">
                  1 seule réponse est attendue
                </h2>
              </div>
            </div>
            <div>
              <h1 className="stepperQuestionTitle">J'aimerais...</h1>
              <div className="questionsButtons">
                <IonButton
                  color={activeButton4 === "button1" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice4({ data: "court", text: "d'une durée courte" }),
                      setDisabled(false);
                    handleBtnClick4("button1");
                  }}
                >
                  🕐 Rester un court séjour
                </IonButton>
                <p className="choiceInformations">
                  Quelques jours seulement, profiter d'une pause rapide.{" "}
                </p>
                <IonButton
                  color={activeButton4 === "button2" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice4({ data: "moyen", text: "d'une durée moyenne" }),
                      setDisabled(false);
                    handleBtnClick4("button2");
                  }}
                >
                  🕒 Rester une durée moyenne
                </IonButton>
                <p className="choiceInformations">
                  Voyage d'une à deux semaines pour explorer davantage la
                  destination.
                </p>
                <IonButton
                  color={activeButton4 === "button3" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice4({ data: "moyen", text: "d'une longue durée" }),
                      setDisabled(false);
                    handleBtnClick4("button3");
                  }}
                >
                  🕕 Avoir un long séjour
                </IonButton>
                <p className="choiceInformations">
                  Plusieurs semaines ou même plusieurs mois, pour découvrir de
                  nombreux aspects du pays.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <div className="stepperHeader">
              <IonButton
                fill="clear"
                className="btn-icon"
                onClick={handlePreviousStep}
              >
                <IonIcon
                  slot="icon-only"
                  aria-hidden="true"
                  icon={chevronBackOutline}
                />
              </IonButton>
              <div>
                <h1 className="stepperHeaderTitle">5 / 7</h1>
                <h2 className="stepperHeaderSubtitle">
                  1 seule réponse est attendue
                </h2>
              </div>
            </div>
            <div>
              <h1 className="stepperQuestionTitle">Je voyage...</h1>
              <div className="questionsButtons">
                <IonButton
                  color={activeButton5 === "button1" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice5({ data: "solitaire", text: "seul" }),
                      setDisabled(false);
                    handleBtnClick5("button1");
                  }}
                >
                  👤 En solitaire
                </IonButton>
                <IonButton
                  color={activeButton5 === "button2" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice5({ data: "couple", text: "en couple" }),
                      setDisabled(false);
                    handleBtnClick5("button2");
                  }}
                >
                  👥 En couple
                </IonButton>
                <IonButton
                  color={activeButton5 === "button3" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice5({ data: "groupe", text: "entre amis" }),
                      setDisabled(false);
                    handleBtnClick5("button3");
                  }}
                >
                  👥 En groupe
                </IonButton>
                <p className="choiceInformations">
                  Préférez-vous rejoindre un groupe de voyage organisé, où vous
                  pourrez rencontrer de nouvelles personnes et partager des
                  expériences avec d'autres voyageurs ?
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <div className="stepperHeader">
              <IonButton
                fill="clear"
                className="btn-icon"
                onClick={handlePreviousStep}
              >
                <IonIcon
                  slot="icon-only"
                  aria-hidden="true"
                  icon={chevronBackOutline}
                />
              </IonButton>
              <div>
                <h1 className="stepperHeaderTitle">6 / 7</h1>
                <h2 className="stepperHeaderSubtitle">
                  1 seule réponse est attendue
                </h2>
              </div>
            </div>
            <div>
              <h1 className="stepperQuestionTitle">Je voudrais faire...</h1>
              <div className="questionsButtons">
                <IonButton
                  color={activeButton6 === "button1" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice6({
                      data: "aventure",
                      text: "aventures sportives",
                    }),
                      setDisabled(false);
                    handleBtnClick6("button1");
                  }}
                >
                  ⚽️ Des aventures sportives
                </IonButton>
                <p className="choiceInformations">
                  Êtes-vous intéressé(e) par des activités sportives telles que
                  la plongée sous-marine, le ski ou d'autres activités fortes ?
                </p>
                <IonButton
                  color={activeButton6 === "button2" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice6({
                      data: "detente",
                      text: "activités relaxantes",
                    }),
                      setDisabled(false);
                    handleBtnClick6("button2");
                  }}
                >
                  🛏️ Des activités relaxantes
                </IonButton>
                <p className="choiceInformations">
                  Préférez-vous des activités relaxantes telles que les spas,
                  les massages ou simplement profiter de la tranquillité des
                  lieux ?
                </p>
                <IonButton
                  color={activeButton6 === "button3" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice6({
                      data: "historique",
                      text: "des explorations culturelles",
                    }),
                      setDisabled(false);
                    handleBtnClick6("button3");
                  }}
                >
                  🗽 Des explorations culturelles
                </IonButton>
                <p className="choiceInformations">
                  Êtes-vous attiré(e) par des activités axées sur la découverte
                  culturelle, comme les visites de monuments ou l'exploration
                  des traditions locales ?
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <div className="stepperHeader">
              <IonButton
                fill="clear"
                className="btn-icon"
                onClick={handlePreviousStep}
              >
                <IonIcon
                  slot="icon-only"
                  aria-hidden="true"
                  icon={chevronBackOutline}
                />
              </IonButton>
              <div>
                <h1 className="stepperHeaderTitle">7 / 7</h1>
                <h2 className="stepperHeaderSubtitle">
                  1 seule réponse est attendue
                </h2>
              </div>
            </div>
            <div>
              <h1 className="stepperQuestionTitle">J'ai un budget...</h1>
              <div className="questionsButtons">
                <IonButton
                  color={activeButton7 === "button1" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice7({
                      data: "économique",
                      text: "budget économique",
                    }),
                      setDisabled(false);
                    handleBtnClick7("button1");
                  }}
                >
                  💵 Economique
                </IonButton>
                <IonButton
                  color={activeButton7 === "button2" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice7({ data: "budgetMoyen", text: "budget moyen" }),
                      setDisabled(false);
                    handleBtnClick7("button2");
                  }}
                >
                  💸 Moyen
                </IonButton>
                <IonButton
                  color={activeButton7 === "button3" ? "primary" : "secondary"}
                  className="questionsButton"
                  onClick={() => {
                    setChoice7({ data: "élevé", text: "budget élevé" }),
                      setDisabled(false);
                    handleBtnClick7("button3");
                  }}
                >
                  💰 Elevé
                </IonButton>
              </div>
            </div>
          </div>
        )}

        <div className="btn-next">
          {currentStep < 6 ? (
            <IonButton onClick={handleNextStep} disabled={disabled}>
              Suivant
            </IonButton>
          ) : (
            <div>
              <IonButton
                onClick={() => {
                  handleRecap();
                }}
                disabled={disabled}
              >
                Passer au récapitulatif
              </IonButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
