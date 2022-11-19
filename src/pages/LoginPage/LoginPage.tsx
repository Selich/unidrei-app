import { IonContent, IonPage } from "@ionic/react";
import "./LoginPage.css";
import Login from "../../components/Login/Login";

const LoginPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Login />
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
