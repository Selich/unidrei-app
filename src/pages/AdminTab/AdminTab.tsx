import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer/ExploreContainer";
import "./AdminTab.css";
import Admin from "../../components/Admin/Admin";

const AdminTab: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Admin />
            </IonContent>
        </IonPage>
    );
};

export default AdminTab;
