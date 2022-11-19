import React, { FC, useEffect, useState } from "react";
import { AlgoConnect } from "../AlgoConnect";
import { checkBalance, createAccount, createNFT } from "../../utils/algoConfig";
import { IonButton } from "@ionic/react";
import { useFileUploadMutation } from "../../generated/graphql-types";


interface AdminProps {}



const Admin: FC<AdminProps> = () => {

    const [fileUpload] = useFileUploadMutation();

    // const { data } = useQuery(allFilmsWithVariablesQueryDocument, { variables: { first: 10 } })
    const [list, setList] = useState([]);


    return (
        <div data-testid="Admin">
            <h1>Admin page</h1>
            <IonButton onClick={checkBalance}>CHECK BALANCE</IonButton>
            <IonButton onClick={() => fileUpload({
                variables: {
                    input: {
                        name: "test",
                        description: "test",
                        link: "test",
                    }
                }
            }).then(res => 
                alert(JSON.stringify(res.data?.fileUpload))
            )}>CREATE NFT</IonButton>
        </div>

    )
};

export default Admin;
