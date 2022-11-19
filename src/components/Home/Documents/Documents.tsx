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
    documentLock as DocumentLockIcon,
    document as DocumentIcon,
    walletOutline as WalletIcon,
} from "ionicons/icons";

import "./Document.css";
import { ConnectWallet } from "../../Login/ConnectWallet";

interface DocumentsProps {}
interface DocumentCardProps {
    title: string;
    locked: boolean;
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
                        <DocumentCard title={document} locked={true} />
                    </IonItemDivider>
                ))}
        </div>
    );
};

const DocumentCard: FC<DocumentCardProps> = (props) => {
    return (
        <IonCard className={"document-container"}>
            {props.locked ? (
                <IonIcon icon={DocumentLockIcon} className={"document-icon"} />
            ) : (
                <IonIcon icon={DocumentIcon} className={"document-icon"} />
            )}
            <IonTitle>{props.title}</IonTitle>
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
                        <IonButton onClick={() => onDismiss()}>
                            Cancel
                        </IonButton>
                        <IonButton onClick={() => onDismiss()}>Mint</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

DocumentCard.defaultProps = {
    title: "Default Name",
    locked: true,
};
