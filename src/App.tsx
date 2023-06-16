import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonToolbar, 
  IonHeader,
  IonTitle
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import User from './pages/User/User';
import Login from './pages/Auth/Login';
import ResetPassword from "./pages/Auth/ResetPassword";
import HistoryPage from './pages/User/HistoryPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useCurrentUser } from './hooks/UserHook';
import Register from './pages/Auth/Register';
import { VerifyEmail } from './pages/Auth/VerifyEmail';
import Search from './pages/Search';
import Onboarding from './pages/Onboarding';

setupIonicReact();

const App: React.FC = () => {
  const user = useCurrentUser();
  if(user === null){
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              <Onboarding />
            </Route>
             <Route path="/home">
              <Login />
            </Route>
             <Route path="/register">
              <Register />
            </Route>
            <Route path="/resetPassword">
              <ResetPassword />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
  return (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>TripNow</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/verifyEmail">
            <VerifyEmail />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/historyPage">
            <HistoryPage />
          </Route>
          <Route exact path="/home">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Recherche</IonLabel>
          </IonTabButton>
          <IonTabButton tab="user" href="/user">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>User</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
