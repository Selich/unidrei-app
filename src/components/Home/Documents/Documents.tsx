import React, { FC, useEffect, useRef, useState } from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import axios from "axios";
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
    IonPopover,
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
    eye as EyeIcon,
} from "ionicons/icons";

import "./Document.css";
import { ConnectWallet } from "../../Login/ConnectWallet";
import {
    useFileUploadMutation,
    useRequestDocumentMutation,
    useSignMutation,
} from "../../../generated/graphql-types";

interface DocumentsProps {}
interface DocumentCardProps {
    title: string;
    state: "STATE_REQUEST" | "STATE_PRIVATE" | "STATE_MINTED";
}

export const Documents: FC<DocumentsProps> = () => {
    const [present, dismiss] = useIonModal(DocumentModal, {
        onDismiss: () => dismiss(),
    });
    const [addresses, setAddresses] = useState<any>(null);
    const [documentsList, setDocumentsList] = useState<
        { id: number; name: string; url: string }[]
    >([
        { id: 0, name: "Enrollment Certificate", url: "" },
        { id: 1, name: "Transcript Semester", url: "" },
        { id: 2, name: "Overall Performance", url: "" },
    ]);

    useEffect(() => {}, [documentsList]);

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
                            present={present}
                            url={document.url}
                            documentList={documentsList}
                            setDocumentList={setDocumentsList}
                            state={
                                document.url === ""
                                    ? "STATE_REQUEST"
                                    : "STATE_PRIVATE"
                            }
                        />
                    </IonItemDivider>
                ))}
        </div>
    );
};

const DocumentCard: FC<any> = (props) => {
    const [state, setState] = React.useState<
        "STATE_REQUEST" | "STATE_PRIVATE" | "STATE_MINTED"
    >(props.state);

    const myAlgoWallet = new MyAlgoConnect();
    const tumAddress =
        "MHRESQQ66SAY7IA524HER46UIDNEP6AFLREBGRJSLLLKZ7DWF6D5QOYYUA";

    const [requestDocument] = useRequestDocumentMutation({});
    const [sign] = useSignMutation({});
    const [fileUpload] = useFileUploadMutation();
    const [info, setInfo] = useState<string | null>(null);
    const [mintBtn, setMintBtn] = useState<string>("Mint");

    useEffect(() => {}, [props.document, props.documentsList, info, mintBtn]);

    async function signTransaction() {
        const mparams = {
            version: 1,
            threshold: 2,
            addrs: [props.addresses[0], tumAddress],
        };
        const multsigaddr = algosdk.multisigAddress(mparams);
        try {
            const algodClient = new algosdk.Algodv2(
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "http://localhost",
                4001,
            );
            const params = await algodClient.getTransactionParams().do();

            const names = '{"firstName":"Amritanshu", "lastName":"Selic"}';
            const enc = new TextEncoder();
            const note = enc.encode(names);

            const txn = algosdk.makePaymentTxnWithSuggestedParams(
                props.addresses[0],
                tumAddress,
                3 * 1000,
                undefined,
                note,
                params,
            );
            const txId = txn.txID().toString();

            const signedTxn = await myAlgoWallet.signTransaction(
                algosdk.encodeUnsignedTransaction(txn),
            );

            console.log("test");
            const res = await sign({
                variables: {
                    input: {
                        txId: txId,
                        signedTxn: signedTxn.blob.toString(),
                        address: props.addresses[0],
                    },
                },
            });

            return res.data?.sign;
        } catch (err) {
            console.error(err);
        }
    }

    const reqDoc = async () => {
        const docUrl = await signTransaction();
        console.log(docUrl);
        const temp = props.documentList;
        temp.forEach((doc: { id: number; name: string; url: string }) => {
            if (doc.id === props.id) {
                if (docUrl) doc.url = docUrl;
            }
        });
        console.log({ temp });
        props.setDocumentList(temp);
        setState("STATE_PRIVATE");
    };

    const mint = async () => {
        fileUpload({
            variables: {
                input: {
                    name: "test",
                    description: "test",
                    link: "test",
                },
            },
        }).then((res) => {
            alert("TransactionID: " + JSON.stringify(res.data?.fileUpload));
            setInfo(res.data?.fileUpload as string);

            setMintBtn("Minted");
        });
    };

    return (
        <IonCard className={"document-container"}>
            {state === "STATE_REQUEST" ? (
                <IonIcon icon={WarningIcon} className={"document-icon"} />
            ) : state === "STATE_PRIVATE" ? (
                <IonIcon
                    icon={ShieldCheckMarkIcon}
                    className={"document-icon"}
                />
            ) : (
                <IonIcon icon={GlobeIcon} className={"document-icon"} />
            )}
            <IonTitle>{props.title}</IonTitle>
            {info && (
                <>
                    <IonButton
                        id="click-trigger"
                        className={"document-btn"}
                        fill="clear"
                        expand="block"
                    >
                        {info.slice(0, 14)}...
                    </IonButton>
                    <IonPopover trigger="click-trigger" triggerAction="click">
                        <IonContent class="ion-padding">
                            Transaction ID: {info}
                        </IonContent>
                    </IonPopover>
                </>
            )}
            {state === "STATE_REQUEST" ? (
                <IonButton
                    onClick={reqDoc}
                    expand="block"
                    className={"document-btn"}
                    fill="outline"
                >
                    Request Document
                </IonButton>
            ) : state === "STATE_PRIVATE" ? (
                <>
                    <IonButton
                        disabled={mintBtn !== "Mint"}
                        expand="block"
                        fill="solid"
                        className={"document-btn"}
                        onClick={() => {
                            setMintBtn("Minting...");
                            mint();
                        }}
                    >
                        {mintBtn}
                    </IonButton>
                    <IonButton
                        fill="solid"
                        expand="block"
                        className={"document-btn"}
                        onClick={() => {
                            window.open(
                                props.url,
                                "_blank",
                                "noopener,noreferrer",
                            );
                        }}
                    >
                        Read
                    </IonButton>
                </>
            ) : (
                <IonButton className={"document-btn"}>Share</IonButton>
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
                    <h4>
                        The selected document is not sharable. Mint it to share
                        it.
                    </h4>
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
