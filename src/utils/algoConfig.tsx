import algosdk from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";
// import crypto from 'crypto'
export const minRound = 21540981;
export const config = {
    algodToken: "",
    algodServer: "https://node.testnet.algoexplorerapi.io",
    algodPort: "",
    indexerToken: "",
    indexerServer: "https://algoindexer.testnet.algoexplorerapi.io",
    indexerPort: "",
};

// https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0002.md
export const marketplaceNote = "tutorial-marketplace:uv1";

// Maximum local storage allocation, immutable
export const numLocalInts = 0;
export const numLocalBytes = 0;
// Maximum global storage allocation, immutable
export const numGlobalInts = 2; // Global variables stored as Int: count, sold
export const numGlobalBytes = 3; // Global variables stored as Bytes: name, description, image

export const base64ToUTF8String = (base64String: string) => {
    return Buffer.from(base64String, "base64").toString("utf-8");
};

export const utf8ToBase64String = (utf8String: string) => {
    return Buffer.from(utf8String, "utf8").toString("base64");
};
export const algodClient = new algosdk.Algodv2(
    config.algodToken,
    config.algodServer,
    config.algodPort,
);

export const indexerClient = new algosdk.Indexer(
    config.indexerToken,
    config.indexerServer,
    config.indexerPort,
);

export const myAlgoConnect = new MyAlgoConnect();

// TUM Wallet
export const accountAddress =
    "YBBY6H7QHRYSAFI47WM7OYO2SSPWOKYVCZRKSZS2XACWYZDOKAK3QSLZWI";
export const accountSK =
    "113,39,235,189,185,21,217,193,83,185,143,127,93,170,135,211,246,205,134,227,9,219,229,12,22,192,123,214,15,90,138,254,192,67,143,31,240,60,113,32,21,28,253,153,247,97,218,148,159,103,43,21,22,98,169,102,90,184,5,108,100,110,80,21";
export const accountMnemonic =
    "until prosper ten fortune rate vacant skin moral quiz practice sense honey orbit ticket excuse swallow original flag theme guilt cabbage notable violin abstract soul";

export const createAccount = function () {
    try {
        const myaccount = algosdk.generateAccount();
        console.log("Account Address = " + myaccount.addr);
        console.log("Account Passphrase = " + myaccount.sk);
        const account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
        console.log("Account Mnemonic = " + account_mnemonic);
        console.log("Account created. Save off Mnemonic and address");
        console.log("Add funds to account using the TestNet Dispenser: ");
        console.log("https://dispenser.testnet.aws.algodev.network/ ");
        return myaccount;
    } catch (err) {
        console.log("err", err);
    }
};

export async function createAsset(algodClient: any, alice: any) {
    console.log("");
    console.log("==> CREATE ASSET");
    //Check account balance
    const accountInfo = await algodClient.accountInformation(alice.addr).do();
    const startingAmount = accountInfo.amount;
    console.log("Alice account balance: %d microAlgos", startingAmount);

    const params = await algodClient.getTransactionParams().do();
    const defaultFrozen = false;
    const unitName = "ALICEART";
    const assetName = "Alice's Artwork@arc3";
    const url = "";
    const managerAddr = alice.addr; // OPTIONAL: FOR DEMO ONLY, USED TO DESTROY ASSET WITHIN
    const reserveAddr = undefined;
    const freezeAddr = undefined;
    const clawbackAddr = undefined;

    const decimals = 0;
    const total = 1; // how many of this asset there will be

    const fullPath = __dirname + "/NFT/metadata.json";
    // const metadatafile = (await fs.readFile(fullPath));
    // const hash = crypto.createHash('sha256');
    // hash.update(metadatafile);

    // const metadata = new Uint8Array(hash.digest()); // use this in your code

    // const fullPathImage = __dirname + '/NFT/alice-nft.png';
    // const metadatafileImage = (await fs.readFile(fullPathImage));
    // const hashImage = crypto.createHash('sha256');
    // hashImage.update(metadatafileImage);
    // const hashImageBase64 = hashImage.digest("base64");
    // const imageIntegrity = "sha256-" + hashImageBase64;
    const imageIntegrity = "";
    const metadata = "";

    console.log("image_integrity : " + imageIntegrity);

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: alice.addr,
        total,
        decimals,
        assetName,
        unitName,
        assetURL: url,
        assetMetadataHash: metadata,
        defaultFrozen,
        freeze: freezeAddr,
        manager: managerAddr,
        clawback: clawbackAddr,
        reserve: reserveAddr,
        suggestedParams: params,
    });

    const rawSignedTxn = txn.signTxn(alice.sk);
    const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
    let assetID = null;
    const confirmedTxn = await algosdk.waitForConfirmation(
        algodClient,
        tx.txId,
        4,
    );
    console.log(
        "Transaction " +
            tx.txId +
            " confirmed in round " +
            confirmedTxn["confirmed-round"],
    );
    assetID = confirmedTxn["asset-index"];

    return { assetID };
}

export async function checkBalance() {
    const algodToken =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const algodServer = "http://localhost";
    const algodPort = 4001;

    const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    const passphrase = accountMnemonic;

    const myAccount = algosdk.mnemonicToSecretKey(passphrase);
    console.log("My address: %s", myAccount.addr);

    const accountInfo = await algodClient
        .accountInformation(myAccount.addr)
        .do();
    console.log("Account balance: %d microAlgos", accountInfo.amount);
    return accountInfo;
}

export async function createNFT() {
    try {
        const algodToken =
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        const algodServer = "http://localhost";
        const algodPort = 4001;
        const alice = {
            addr: accountAddress,
            sk: accountSK,
        };
        const algodClient = new algosdk.Algodv2(
            algodToken,
            algodServer,
            algodPort,
        );

        // CREATE ASSET
        const { assetID } = await createAsset(algodClient, alice);
        // // DESTROY ASSET
        // await destroyAsset(algodClient, alice, assetID);
        // // CLOSEOUT ALGOS - Alice closes out Alogs to dispenser
        // await closeoutAliceAlgos(algodClient, alice);
        console.log(assetID);
    } catch (err) {
        console.log("err", err);
    }
    process.exit();
}

async function destroyAsset(algodClient: any, alice: any, assetID: any) {
    const params = await algodClient.getTransactionParams().do();
    const addr = alice.addr;
    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
        from: addr,
        note: undefined,
        assetIndex: assetID,
        suggestedParams: params,
    });
    const rawSignedTxn = txn.signTxn(alice.sk);
    const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
    const confirmedTxn = await algosdk.waitForConfirmation(
        algodClient,
        tx.txId,
        4,
    );
    console.log(
        "Transaction " +
            tx.txId +
            " confirmed in round " +
            confirmedTxn["confirmed-round"],
    );
    console.log("Asset ID: " + assetID);
    console.log("Alice = " + alice.addr);

    return;
}
