import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer/ExploreContainer";
import "./HomeTab.css";
import Home from "../../components/Home/Home";

const HomeTab: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <ExploreContainer name="Tab 1 page" />
                <Home />
            </IonContent>
        </IonPage>
    );
};

export default HomeTab;
