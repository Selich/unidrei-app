import { Redirect, Route } from "react-router-dom";
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
    home as HomeIcon,
    wallet as WalletIcon,
    shareSocial as ShareIcon,
} from "ionicons/icons";
import HomeTab from "./pages/HomeTab/HomeTab";
import PayTab from "./pages/PayTab/PayTab";
import ShareTab from "./pages/ShareTab/ShareTab";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// import { createUploadLink } from "apollo-upload-client";
import React, { createContext } from "react";
import { setContext } from "@apollo/client/link/context";

/* Theme variables */
import "./theme/variables.css";
import {
    ApolloClient,
    ApolloProvider,
    from,
    InMemoryCache,
} from "@apollo/client";
import { HOME_SLUG, PAY_SLUG, SHARE_SLUG } from "./constants/router.constants";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path={HOME_SLUG}>
                        <HomeTab />
                    </Route>
                    <Route exact path={PAY_SLUG}>
                        <PayTab />
                    </Route>
                    <Route path={SHARE_SLUG}>
                        <ShareTab />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/tab1" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="home-tab" href={HOME_SLUG}>
                        <IonIcon icon={HomeIcon} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="pay-tab" href={PAY_SLUG}>
                        <IonIcon icon={WalletIcon} />
                        <IonLabel>Pay</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="share-tab" href={SHARE_SLUG}>
                        <IonIcon icon={ShareIcon} />
                        <IonLabel>Share</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
