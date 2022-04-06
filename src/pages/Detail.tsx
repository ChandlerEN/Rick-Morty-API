import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonSearchbar, IonTitle, IonToolbar,
    SearchbarChangeEventDetail,
    useIonViewWillEnter,
    IonBackButton, IonGrid, IonRow, IonCol, IonImg, IonLabel, IonItem
} from "@ionic/react";
import {RouteComponentProps, useHistory} from "react-router";
import React, {useState} from "react";

import {Episode} from "../pages/Home";
import {Rick_MortyAPI} from "../pages/Home";

interface DetailPageProps extends RouteComponentProps<{ id: string; }> {}

const Detail: React.FC<DetailPageProps> = ({match}) => {
    const [episodes, setEpisodes] = useState<Episode>()

    const [Test, setTest] = useState('');

    async function getEpisodebyID(id: string) {
        const request = await fetch(`https://rickandmortyapi.com/api/episode/?id=${id}`);
        const answer = await request.json() as Episode;

        console.log(`https://rickandmortyapi.com/api/episode/?id=${id}`);

        setEpisodes(answer);
        setTest(answer.episode);
    }

    useIonViewWillEnter(async () => {await getEpisodebyID(match.params.id)});

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot={"start"}>
                    <IonBackButton defaultHref={"/"}></IonBackButton>
                </IonButtons>
                <IonTitle>{episodes?.episode} - {episodes?.name}</IonTitle>
            </IonToolbar>
            <IonContent>
                {Test}
                <IonItem>Sup</IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Detail;
