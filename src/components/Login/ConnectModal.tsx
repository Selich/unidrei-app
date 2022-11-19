import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";

export const ConnectModal: FC<any> = ({
    onDismiss,
    wallet,
    setWallet,
}: {
    onDismiss: () => void;
    wallet: any;
    setWallet: any;
}) => {
    const [address, setAddress] = useState("");
    const [sk, setSk] = useState("");
    useEffect(() => {
        alert(address);
    }, [address, sk]);
    return (
        <IonPage style={{ textAlign: "center" }}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Wallet Information Needed</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="document-modal-content">
                    <h4>Insert your wallet address and your private key</h4>
                    <IonList>
                        <IonItem>
                            <IonLabel>Wallet Address</IonLabel>
                            <IonInput
                                value={address}
                                placeholder="Enter your wallet address"
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel>Private Key</IonLabel>
                            <IonInput
                                type="password"
                                value={sk}
                                placeholder="Enter your private key"
                            ></IonInput>
                        </IonItem>
                    </IonList>

                    <div className={"document-modal-container-btn"}>
                        <IonButton onClick={() => onDismiss()}>
                            Cancel
                        </IonButton>
                        <IonButton
                            onClick={() => {
                                setWallet({ address, sk });
                            }}
                        >
                            Confirm
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
