import React, { FC } from "react";
import { Profile } from "./Profile/Profile";
import { Documents } from "./Documents/Documents";

interface HomeProps {}

const Home: FC<HomeProps> = () => (
    <div data-testid="Home">
        <Profile />
        <Documents />
    </div>
);

export default Home;
