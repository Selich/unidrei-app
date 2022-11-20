import React, { FC, useEffect, useRef, useState } from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
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
import { useRequestDocumentMutation } from "../../../generated/graphql-types";

interface DocumentsProps {}
interface DocumentCardProps {
    title: string;
    state: "STATE_REQUEST" | "STATE_PRIVATE" | "STATE_MINTED";
}

const documentsList = [
    { id: 0, name: "Enrollment Certificate", url: "" },
    { id: 1, name: "Transcript Semester", url: "" },
    { id: 2, name: "Overall Performance", url: "" },
];

export const Documents: FC<DocumentsProps> = () => {
    const [present, dismiss] = useIonModal(DocumentModal, {
        onDismiss: () => dismiss(),
    });
    const [addresses, setAddresses] = useState<any>(null);

    return (
        <div data-testid="Documents">
            {!addresses && (
                <ConnectWallet
                    addresses={addresses}
                    setAddresses={setAddresses}
                />
            )}
            {addresses &&
                documentsList.map((document, index) => (
                    <IonItemDivider key={index} style={{ padding: 0 }}>
                        <DocumentCard
                            addresses={addresses}
                            title={document.name}
                            id={document.id}
                            state={"STATE_REQUEST"}
                        />
                    </IonItemDivider>
                ))}
        </div>
    );
};

const DocumentCard: FC<any> = (props) => {
    const myAlgoWallet = new MyAlgoConnect();
    const algodClient = new algosdk.Algodv2(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "http://localhost",
        4001,
    );
    const tumAddress =
        "YBBY6H7QHRYSAFI47WM7OYO2SSPWOKYVCZRKSZS2XACWYZDOKAK3QSLZWI";

    const [requestDocument] = useRequestDocumentMutation({});
    async function signTransaction() {
        console.log(props.addresses);
        try {
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makePaymentTxnWithSuggestedParams(
                props.addresses[0],
                tumAddress,
                10,
                tumAddress,
                new Uint8Array([1, 2, 2]),
                params,
            );
            console.log("works");
            const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
            const response = await algodClient
                .sendRawTransaction(signedTxn.blob)
                .do();
            console.log(response);
            return signedTxn;
        } catch (err) {
            console.error(err);
        }
    }

    const reqDoc = async () => {
        const signage = await signTransaction();
        console.log(signage);
        // requestDocument({
        //     variables: {
        //         input: {
        //             name: props.id,
        //             sign: signage,
        //         },
        //     },
        // }).then((res) => {});
    };
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
                <IonButton onClick={reqDoc}>Request Document</IonButton>
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
