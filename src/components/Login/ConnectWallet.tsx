import {
    IonGrid,
    IonTitle,
    IonButton,
    IonText,
    useIonModal,
} from "@ionic/react";
import MyAlgo from "@randlabs/myalgo-connect";
import { FC, useEffect } from "react";
import { ConnectModal } from "./ConnectModal";

export const ConnectWallet: FC<any> = (props) => {
    const myAlgoWallet = new MyAlgo();

    const [present, dismiss] = useIonModal(ConnectModal, {
        onDismiss: () => dismiss(),
        wallet: props.wallet,
        setWallet: props.setWallet,
    });
    useEffect(() => {}, [props.wallet]);

    const connectToMyAlgo = async () => {
        try {
            const accounts = await myAlgoWallet.connect();

            const addresses = accounts.map((account) => account.address);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <IonGrid>
            <IonTitle>Please connect your wallet</IonTitle>
            <IonButton onClick={connectToMyAlgo}>My Algo</IonButton>
            <IonText>or</IonText>
            <IonButton onClick={() => present()}>Private Wallet</IonButton>
        </IonGrid>
    );
};
