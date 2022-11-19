import React, { FC } from "react";
import MyAlgo from "@randlabs/myalgo-connect";

const myAlgoWallet = new MyAlgo();

const connectToMyAlgo = async () => {
    try {
        const accounts = await myAlgoWallet.connect();

        const addresses = accounts.map((account) => account.address);
    } catch (err) {
        console.error(err);
    }
};

const Login: FC<any> = () => <div data-testid="Login">Login</div>;

export default Login;
