import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
} from "@ionic/react";
import React, { FC } from "react";
import "./Profile.css";

interface ProfileProps {}

export const Profile: FC<ProfileProps> = () => (
    <div data-testid="Profile">
        <IonCard style={{ margin: 0, padding: 0 }}>
            <IonCardContent className={"profile-card-container"}>
                <img
                    src={"https://picsum.photos/200"}
                    className={"profile-img"}
                />
                <div>
                    <IonCardTitle className={"profile-content"}>
                        Nikola Sikdar
                    </IonCardTitle>
                    <IonCardSubtitle className={"profile-content"}>
                        M.Sc. Informatik
                    </IonCardSubtitle>
                    <IonCardSubtitle className={"profile-content"}>
                        ID: kalsdjf92-23948723891
                    </IonCardSubtitle>
                </div>
            </IonCardContent>
        </IonCard>
    </div>
);
