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
            <IonHeader className={"ion-text-center"}>
                <h1>Documents</h1>
            </IonHeader>
            <IonContent fullscreen>
                <Home />
            </IonContent>
        </IonPage>
    );
};

export default HomeTab;
