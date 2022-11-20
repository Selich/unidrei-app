import {
    IonGrid,
    IonTitle,
    IonButton,
    IonText,
    useIonModal,
    IonContent,
    IonIcon,
} from "@ionic/react";
import MyAlgo from "@randlabs/myalgo-connect";
import { FC, useEffect } from "react";
import { ConnectModal } from "./ConnectModal";
import { wallet as WalletIcon } from "ionicons/icons";

export const ConnectWallet: FC<any> = (props) => {
    const myAlgoWallet = new MyAlgo();

    const connectToMyAlgo = async () => {
        try {
            const accounts = await myAlgoWallet.connect();

            props.setAddresses(accounts.map((account) => account.address));
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className={"ion-text-center"}>
            <h3>Please connect your wallet</h3>
            <IonButton onClick={connectToMyAlgo}>
                <IonIcon icon={WalletIcon} style={{ marginRight: "10px" }} />
                Algorand
            </IonButton>
        </div>
    );
};
