import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import "./ShareTab.css";
import QRCodeGenerator from "../../components/QRCodeGenerator/QRCodeGenerator";
import { Profile } from "../../components/Home/Profile/Profile";

const ShareTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className={"ion-text-center"}>
                <h1>Share your profile</h1>
                <Profile />
            </IonHeader>
            <IonContent fullscreen>
                <div className={"share-tab-qr-img"}>
                    <QRCodeGenerator
                        content={"This is my wallet address yay!!!"}
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ShareTab;
