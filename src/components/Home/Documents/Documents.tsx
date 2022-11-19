import React, { FC } from "react";
import { IonCard, IonIcon, IonItemDivider, IonTitle } from "@ionic/react";
import { documentLock as DocumentLockIcon } from "ionicons/icons";
import "./Document.css";

interface DocumentsProps {}
interface DocumentCardProps {
    title: string;
}

export const Documents: FC<DocumentsProps> = () => (
    <div data-testid="Documents">
        <DocumentCard title={"Enrollment Certificate"} />
        <DocumentCard title={"Transcript Semester 1"} />
        <DocumentCard title={"Transcript Semester 2"} />
        <DocumentCard title={"Transcript Semester 3"} />
        <DocumentCard title={"Overall Performance"} />
    </div>
);

const DocumentCard: FC<DocumentCardProps> = (props) => {
    return (
        <IonCard className={"document-container"}>
            <IonIcon icon={DocumentLockIcon} className={"document-icon"} />
            <IonTitle>{props.title}</IonTitle>
        </IonCard>
    );
};
