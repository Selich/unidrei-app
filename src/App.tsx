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
import { MainAppRouter } from "./pages/routes";
// import { createUploadLink } from "apollo-upload-client";

const nestJSClient = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
            <ApolloProvider client={nestJSClient}>
        <MainAppRouter />
            </ApolloProvider>
    </IonApp>
);

export default App;
