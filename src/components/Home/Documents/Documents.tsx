import React, { FC, useEffect, useRef, useState } from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItemDivider,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    useIonModal,
} from "@ionic/react";
import {
    walletOutline as WalletIcon,
    warning as WarningIcon,
    shieldCheckmark as ShieldCheckMarkIcon,
    globe as GlobeIcon,
} from "ionicons/icons";

import "./Document.css";
import { ConnectWallet } from "../../Login/ConnectWallet";

interface DocumentsProps {}
interface DocumentCardProps {
    title: string;
    state: "STATE_REQUEST" | "STATE_PRIVATE" | "STATE_MINTED";
}

const documentsList = [
    "Enrollment Certificate",
    "Transcript Semester 1",
    "Transcript Semester 2",
    "Transcript Semester 3",
    "Overall Performance",
];

export const Documents: FC<DocumentsProps> = () => {
    const [present, dismiss] = useIonModal(DocumentModal, {
        onDismiss: () => dismiss(),
    });
    const [wallet, setWallet] = useState<{
        address: string;
        sk: string;
    }>({
        address: "as",
        sk: "",
    });

    useEffect(() => {
        alert(JSON.stringify(wallet));
    }, [wallet]);

    return (
        <div data-testid="Documents">
            {!wallet.address && (
                <ConnectWallet wallet={wallet} setWallet={setWallet} />
            )}
            {wallet.address &&
                documentsList.map((document, index) => (
                    <IonItemDivider
                        key={index}
                        style={{ padding: 0 }}
                        onClick={() => present()}
                    >
                    <DocumentCard title={document} state={"STATE_REQUEST"} />
                    </IonItemDivider>
                ))}
        </div>
    );
};

const DocumentCard: FC<DocumentCardProps> = (props) => {
    return (
        <IonCard className={"document-container"}>
            {props.state === "STATE_REQUEST" ? (
                <IonIcon icon={WarningIcon} className={"document-icon"} />
            ) : props.state === "STATE_PRIVATE" ? (
                <IonIcon
                    icon={ShieldCheckMarkIcon}
                    className={"document-icon"}
                />
            ) : (
                <IonIcon icon={GlobeIcon} className={"document-icon"} />
            )}
            <IonTitle>{props.title}</IonTitle>
            {props.state === "STATE_REQUEST" ? (
                <IonButton>Request Document</IonButton>
            ) : props.state === "STATE_PRIVATE" ? (
                <IonButton>Mint</IonButton>
            ) : (
                <IonButton>Share</IonButton>
            )}
        </IonCard>
    );
};

const DocumentModal: FC<any> = ({ onDismiss }: { onDismiss: () => void }) => {
    return (
        <IonPage style={{ textAlign: "center" }}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Action Required</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="document-modal-content">
                    <h4>The selected document is locked. Mint it to unlock.</h4>
                    <div className={"document-modal-container-btn"}>
                        <IonButton
                            onClick={() => onDismiss()}
                            className={"document-modal-btn"}
                        >
                            Cancel
                        </IonButton>
                        <IonButton
                            onClick={() => onDismiss()}
                            className={"document-modal-btn"}
                        >
                            Mint
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

DocumentCard.defaultProps = {
    title: "Default Name",
    state: "STATE_REQUEST",
};
