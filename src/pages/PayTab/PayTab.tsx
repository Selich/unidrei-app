import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import "./PayTab.css";

const PayTab: React.FC = () => {
    return (
        <IonPage className={"ion-text-center"}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Pay via web3</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h3>Coming soon!</h3>
            </IonContent>
        </IonPage>
    );
};

export default PayTab;
