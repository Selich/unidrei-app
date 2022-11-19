import { Redirect, Route } from "react-router-dom";
import { HOME_SLUG, PAY_SLUG, SHARE_SLUG } from "../constants/router.constants";
import HomeTab from "./HomeTab/HomeTab";
import PayTab from "./PayTab/PayTab";
import ShareTab from "./ShareTab/ShareTab";
import {
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
} from "@ionic/react";
import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import {
    home as HomeIcon,
    wallet as WalletIcon,
    shareSocial as ShareIcon,
} from "ionicons/icons";

export const MainAppRouter: React.FC = () => (
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
                    <Redirect to={HOME_SLUG} />
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
);
