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
                <IonToolbar>
                    <h1>Share Profile</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Profile />
                <div className={"share-tab-content"}>
                    <h3>An Authentic Way to Present Yourself</h3>
                    <h6>
                        This QR-Code leads to your currently connected wallet
                        address. Anybody who scans this, would be able to see
                        your publicly shared, i.e., minted documents.
                    </h6>
                </div>
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
