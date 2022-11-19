import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import "./HomeTab.css";
import Home from "../../components/Home/Home";

const HomeTab: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Home />
            </IonContent>
        </IonPage>
    );
};

export default HomeTab;
