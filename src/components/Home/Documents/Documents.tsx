import React, { FC } from "react";
import { IonCard, IonIcon, IonItemDivider, IonTitle } from "@ionic/react";
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

export const Documents: FC<DocumentsProps> = () => (
    <div data-testid="Documents">
        {documentsList.map((document, index) => (
            <IonItemDivider key={index} style={{ padding: 0 }}>
                <DocumentCard title={document} locked={true} />
            </IonItemDivider>
        ))}
    </div>
);

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

DocumentCard.defaultProps = {
    title: "Default Name",
    locked: true,
};
