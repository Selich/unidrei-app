import React, { FC, useEffect, useState } from "react";
import { AlgoConnect } from "../AlgoConnect";
import { checkBalance, createAccount, createNFT } from "../../utils/algoConfig";
import {
    IonButton,
    IonCard,
    IonIcon,
    IonImg,
    IonItemDivider,
    IonTitle,
} from "@ionic/react";
import { useFileUploadMutation } from "../../generated/graphql-types";
import { makeAssetConfigTxnWithSuggestedParamsFromObject } from "algosdk";
import axios from "axios";
import {
    documentLock as DocumentLockIcon,
    document as DocumentIcon,
} from "ionicons/icons";

interface AdminProps {}

const DocumentCard: FC<any> = (props) => {
    return (
        <IonCard className={"document-container"}>
            <img
                src={
                    props.info.transaction["asset-config-transaction"]?.params
                        ?.url
                }
            />
            <div>{JSON.stringify(props.info)}</div>
            <IonTitle>{props.title}</IonTitle>
        </IonCard>
    );
};
const Admin: FC<AdminProps> = () => {
    const [fileUpload] = useFileUploadMutation();

    // const { data } = useQuery(allFilmsWithVariablesQueryDocument, { variables: { first: 10 } })
    const [list, setList] = useState([]);
    const [info, setInfo] = useState<any>({});

    useEffect(() => {}, [info]);
    return (
        <div data-testid="Admin">
            <h1>Admin page</h1>
            <IonButton onClick={checkBalance}>CHECK BALANCE</IonButton>
            <IonButton
                onClick={() =>
                    fileUpload({
                        variables: {
                            input: {
                                name: "test",
                                description: "test",
                                link: "test",
                            },
                        },
                    }).then((res) => {
                        alert(JSON.stringify(res.data?.fileUpload));
                        axios
                            .get(
                                "http://localhost:8980/v2/transactions/" +
                                    res.data?.fileUpload,
                            )
                            .then((res) => {
                                console.log(res.data);
                                setInfo(res.data);
                            });
                    })
                }
            >
                CREATE NFT
            </IonButton>
            <div>
                {info.transaction && (
                    <IonItemDivider
                        key={0}
                        style={{ padding: 0 }}
                        onClick={() => console.log("test")}
                    >
                        <DocumentCard
                            info={info}
                            title={"test"}
                            locked={true}
                        />
                    </IonItemDivider>
                )}
            </div>
        </div>
    );
};

export default Admin;
