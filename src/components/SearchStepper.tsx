import React, { useState } from "react";
import { IonButton, IonIcon, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { chevronBackOutline, star, sunny } from "ionicons/icons";
import * as data from "../data/villes-france.json";

export const SearchStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const history = useHistory();
  const [categoriesChecked, setCategoriesChecked] = useState<string[]>([]);
  const [result, setResult] = useState<any[]>([]);
  const [choice1, setChoice1] = useState<string[]>([]);
  const [choice2, setChoice2] = useState<string[]>([]);
  const [choice3, setChoice3] = useState<string[]>([]);
  const [choice4, setChoice4] = useState<string[]>([]);
  const [choice5, setChoice5] = useState<string[]>([]);
  const [choice6, setChoice6] = useState<string[]>([]);
  const [choice7, setChoice7] = useState<string[]>([]);

  // convert JSON data to an array
  const allCitiesInfomations = JSON.parse(JSON.stringify(data)).default;

  const handleNextStep = () => {
    if (currentStep === 0) {
      let tmpResult = [];
      let choicesTmp: string[] = [];
      categoriesChecked.includes("chaud") &&
        (tmpResult.push(
          ...allCitiesInfomations.filter((city: any) => city.chaud === true)
        ),
        choicesTmp.push(...choicesTmp, "un endroit ensoleillé"));

      categoriesChecked.includes("froid") &&
        (tmpResult.push(
          ...allCitiesInfomations.filter((city: any) => city.froid === true)
        ),
        choicesTmp.push(...choicesTmp, "un endroit froid"));

      categoriesChecked.includes("tempéré") &&
        (tmpResult.push(
          ...allCitiesInfomations.filter((city: any) => city.tempéré === true)
        ),
        choicesTmp.push(...choicesTmp, "un endroit tempéré"));

      setResult(Array.from(new Set(tmpResult)));
      setChoice1(Array.from(new Set(choicesTmp)));
    }

    if (currentStep === 1) {
      let tmpResult = [];
      let choicesTmp: string[] = [];
      categoriesChecked.includes("campagne") &&
        (tmpResult.push(
          ...result.filter((city: any) => city.campagne === true)
        ),
        choicesTmp.push(...choicesTmp, "être dans la nature"));

      categoriesChecked.includes("urbain") &&
        (tmpResult.push(...result.filter((city: any) => city.urbain === true)),
        choicesTmp.push(...choicesTmp, "visiter des lieux"));

      // TODO ajouter la 3eme option
      setResult(Array.from(new Set(tmpResult)));
      setChoice2(Array.from(new Set(choicesTmp)));
    }

    if (currentStep === 2) {
      let tmpResult = [];
      let choicesTmp: string[] = [];
      categoriesChecked.includes("calme") &&
        (tmpResult.push(...result.filter((city: any) => city.calme === true)),
        choicesTmp.push(...choicesTmp, "un lieu calme et isolé"));

      categoriesChecked.includes("festif") &&
        (tmpResult.push(...result.filter((city: any) => city.festif === true)),
        choicesTmp.push(...choicesTmp, "une vie urbaine animée"));

      // TODO ajouter la 3eme option
      setResult(tmpResult);
      setChoice3(Array.from(new Set(choicesTmp)));
    }

    if (currentStep === 3) {
      let choicesTmp: string[] = [];
      categoriesChecked.includes("court") &&
        choicesTmp.push(...choicesTmp, "d'une durée courte");
      categoriesChecked.includes("moyen") &&
        choicesTmp.push(...choicesTmp, "d'une durée moyenne");
      categoriesChecked.includes("long") &&
        choicesTmp.push(...choicesTmp, "d'une longue durée");
      setChoice4(Array.from(new Set(choicesTmp)));
    }

    if (currentStep === 4) {
      let choicesTmp: string[] = [];
      let tmpResult = [];
      categoriesChecked.includes("solitaire") &&
        (tmpResult.push(...result.filter((city: any) => city.seul === true)),
        choicesTmp.push(...choicesTmp, "seul"));

      categoriesChecked.includes("couple") &&
        (tmpResult.push(
          ...result.filter((city: any) => city.plusieur === true)
        ),
        choicesTmp.push(...choicesTmp, "en couple"));

      categoriesChecked.includes("groupe") &&
        (tmpResult.push(
          ...result.filter((city: any) => city.plusieur === true)
        ),
        choicesTmp.push(...choicesTmp, "entre amis"));

      setResult(tmpResult);
      setChoice5(Array.from(new Set(choicesTmp)));
    }

    if (currentStep === 5) {
      let choicesTmp: string[] = [];
      let tmpResult = [];
      categoriesChecked.includes("aventure") &&
        (tmpResult.push(
          ...result.filter((city: any) => city.aventure === true)
        ),
        choicesTmp.push(...choicesTmp, "aventures sportives"));

      categoriesChecked.includes("detente") &&
        (tmpResult.push(...result.filter((city: any) => city.detente === true)),
        choicesTmp.push(...choicesTmp, "activités relaxantes"));

      categoriesChecked.includes("historique") &&
        (tmpResult.push(
          ...result.filter((city: any) => city.historique === true)
        ),
        choicesTmp.push(...choicesTmp, "des explorations culturelles"));

      setResult(tmpResult);
      setChoice6(Array.from(new Set(choicesTmp)));
    }

    if (currentStep === 6) {
      let choicesTmp: string[] = [];
      categoriesChecked.includes("économique") &&
        choicesTmp.push(...choicesTmp, "budget économique");
      categoriesChecked.includes("budgetMoyen") &&
        choicesTmp.push(...choicesTmp, "budget moyen");
      categoriesChecked.includes("élevé") &&
        choicesTmp.push(...choicesTmp, "budget élevé");

      setChoice7(Array.from(new Set(choicesTmp)));
    }

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleRecap = () => {
    handlePreviousStep();
    history.push("/recap", {
      params: {
        choice1: choice1,
        choice2: choice2,
        choice3: choice3,
        choice4: choice4,
        choice5: choice5,
        choice6: choice6,
        choice7: choice7,
      },
    });
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClickCategory = (category: string) => {
    categoriesChecked.includes(category)
      ? setCategoriesChecked(categoriesChecked.filter((c) => c !== category))
      : setCategoriesChecked([...categoriesChecked, category]);
  };

  return (
    <div className="h-100">
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
            <h1 className="stepperHeaderTitle">1 / 7</h1>
          </div>
          <div>
            <h1 className="stepperQuestionTitle">Je recherche...</h1>
            <div className="questionsButtons">
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("chaud")}
              >
                ☀️ Un endroit ensoleillé
              </IonButton>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("tempéré")}
              >
                ☁️ Un endroit tempéré
              </IonButton>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("froid")}
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
            <h1 className="stepperHeaderTitle">2 / 7</h1>
          </div>
          <div>
            <h1 className="stepperQuestionTitle">Je voudrais...</h1>
            <div className="questionsButtons">
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("campagne")}
              >
                🌱 Etre dans la nature
              </IonButton>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("urbain")}
              >
                🌆 Etre en ville
              </IonButton>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("")}
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
            <h1 className="stepperHeaderTitle">3 / 7</h1>
          </div>
          <div>
            <h1 className="stepperQuestionTitle">J'aimerais...</h1>
            <div className="questionsButtons">
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("calme")}
              >
                🤫 Un lieu calme et isolé
              </IonButton>
              <p className="choiceInformations">
                Préférez-vous des destinations peu peuplées, avec des espaces
                naturels préservés, afin de profiter d'une atmosphère relaxante
                ?
              </p>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("")}
              >
                🌳 Un équilibre entre nature et ville
              </IonButton>
              <p className="choiceInformations">
                Souhaitez-vous visiter des endroits qui offrent un mélange
                d'espaces naturels, où vous pouvez apprécier à la fois la
                sérénité de la nature et l'animation des villes ?
              </p>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("festif")}
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
            <h1 className="stepperHeaderTitle">4 / 7</h1>
          </div>
          <div>
            <h1 className="stepperQuestionTitle">J'aimerais...</h1>
            <div className="questionsButtons">
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("court")}
              >
                🕐 Rester un court séjour
              </IonButton>
              <p className="choiceInformations">
                Quelques jours seulement, profiter d'une pause rapide.{" "}
              </p>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("moyen")}
              >
                🕒 Rester une durée moyenne
              </IonButton>
              <p className="choiceInformations">
                Voyage d'une à deux semaines pour explorer davantage la
                destination.
              </p>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("long")}
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
            <h1 className="stepperHeaderTitle">5 / 7</h1>
          </div>
          <div>
            <h1 className="stepperQuestionTitle">Je voyage...</h1>
            <div className="questionsButtons">
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("solitaire")}
              >
                👤 En solitaire
              </IonButton>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("couple")}
              >
                👥 En couple
              </IonButton>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("groupe")}
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
            <h1 className="stepperHeaderTitle">6 / 7</h1>
          </div>
          <div>
            <h1 className="stepperQuestionTitle">Je voudrais faire...</h1>
            <div className="questionsButtons">
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("aventure")}
              >
                ⚽️ Des aventures sportives
              </IonButton>
              <p className="choiceInformations">
                Êtes-vous intéressé(e) par des activités sportives telles que la
                plongée sous-marine, le ski ou d'autres activités fortes ?
              </p>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("detente")}
              >
                🛏️ Des activités relaxantes
              </IonButton>
              <p className="choiceInformations">
                Préférez-vous des activités relaxantes telles que les spas, les
                massages ou simplement profiter de la tranquillité des lieux ?
              </p>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("historique")}
              >
                🗽 Des explorations culturelles
              </IonButton>
              <p className="choiceInformations">
                Êtes-vous attiré(e) par des activités axées sur la découverte
                culturelle, comme les visites de monuments ou l'exploration des
                traditions locales ?
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
            <h1 className="stepperHeaderTitle">7 / 7</h1>
          </div>
          <div>
            <h1 className="stepperQuestionTitle">J'ai un budget...</h1>
            <div className="questionsButtons">
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("économique")}
              >
                💵 Economique
              </IonButton>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("budgetMoyen")}
              >
                💸 Moyen
              </IonButton>
              <IonButton
                color="secondary"
                className="questionsButton"
                onClick={() => handleClickCategory("élevé")}
              >
                💰 Elevé
              </IonButton>
            </div>
          </div>
        </div>
      )}

      <div className="btn-next">
        {currentStep < 6 ? (
          <IonButton onClick={handleNextStep}>Suivant</IonButton>
        ) : (
          <div>
            <IonButton
              onClick={() => {
                handleRecap();
              }}
            >
              Passer au récapitulatif
            </IonButton>
          </div>
        )}
      </div>
    </div>
  );
};
