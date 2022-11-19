import React, { FC, useRef } from "react";
import {
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonIcon,
    IonItemDivider,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonModal,
} from "@ionic/react";
import {
    documentLock as DocumentLockIcon,
    document as DocumentIcon,
} from "ionicons/icons";
import "./Document.css";

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

    return (
        <div data-testid="Documents">
            {documentsList.map((document, index) => (
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
