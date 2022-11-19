import React, {useEffect, useState} from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { IonButton } from "@ionic/react";
import { checkBalance, createAccount, createNFT } from "../utils/algoConfig";


export const AlgoConnect = () => {

    const [address, setAddress] = useState<string>('');
    const [products, setProducts] = useState([]);

    const connectWallet = async () => {
        new MyAlgoConnect().connect()
            .then(accounts => {
                const _account = accounts[0];
                setAddress(_account.address);
            }).catch(error => {
            console.log('Could not connect to MyAlgo wallet');
            console.error(error);
        })
    };

    useEffect(() => {
        // getProductsAction().then(products => {
        //     setProducts(products)
        // });
    }, []);


    return (
        <div>
            <IonButton onClick={connectWallet}>CONNECT WALLET</IonButton>
            <IonButton onClick={createAccount}>CREATE ACCOUNT</IonButton>
            <IonButton onClick={createNFT}>CREATE NFT</IonButton>
            <IonButton onClick={checkBalance}>CHECK BALANCE</IonButton>
        </div>
    )
}