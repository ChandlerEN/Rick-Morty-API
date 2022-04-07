import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage, IonTitle, IonToolbar,
    useIonViewWillEnter,
    IonBackButton, IonGrid, IonRow, IonCol, IonImg, IonLabel, IonItem, IonList
} from "@ionic/react";
import {RouteComponentProps, useHistory} from "react-router";
import React, {useState} from "react";

import {Episode} from "../pages/Home";
import {Rick_MortyAPI} from "../pages/Home";
import {concatenate} from "workbox-streams";
import './Detail.css';

interface DetailPageProps extends RouteComponentProps<{ id: string; }> {}

interface CharacterAPI {
    results: Character[]
}

// interface Characters {
//     url: string[]
// }

interface Character{
    id: number,
    name: string,
    status: string,
    species: string,
    gender: string,
    image: string
}

const Detail: React.FC<DetailPageProps> = ({match}) => {
    const [episodes, setEpisodes] = useState<Episode>()
    const [characters, setCharacters] = useState<CharacterAPI>({results:[]})
    // const [characters, setCharacters] = useState<Characters>()

    const [Test, setTest] = useState('');

    async function getEpisodebyID(id: string){
        const request = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        const answer = await request.json() as Episode;

        setEpisodes(answer);

        console.log(answer)

        let num: string = "";

        for (let i = 0; i < answer.characters.length; i++){
            let temp = getnumber(answer.characters[i])

            num = num + temp + ","

            // console.log(num)

            // const request2 = await fetch(answer.characters[i]);
            // const answer2 = await request2.json();
            //
            // console.log(answer2);
            // let temp = getnumber(answer2);
            // let final = {
            //     results: [...characters, ...answer2]
            // }
            //
            // getCharacter(final);
        }

        console.log(num)

        const request2 = await fetch(`https://rickandmortyapi.com/api/character/${num}`);
        const answer2 = await request2.json();

        let final = {
            results:[...answer2]
        }

        setCharacters(final);

        console.log(final)
        console.log(characters)

        // getCharacter(final);
    }

    function getnumber(string: string) {
        let toto = string.split("/",7)

        return toto[toto.length-1];
    }

    // async function getCharacter(url: string | undefined){
    //     console.log(url)
    //     const request = await fetch(url);
    //     const answer = await request.json();
    //
    //     setCharacters(answer);
    //
    //     setTest("test");
    // }

    useIonViewWillEnter(async () => {
        await getEpisodebyID(match.params.id);
        // await getCharacter(characters);
    });

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot={"start"}>
                    <IonBackButton defaultHref={"/"}></IonBackButton>
                </IonButtons>
                <IonTitle>{episodes?.episode} - {episodes?.name}</IonTitle>
            </IonToolbar>
            <IonContent>
                {/*<IonList>*/}
                {/*    {characters.results.map(value =>*/}
                {/*        <IonItem>*/}
                {/*            <IonImg src={value.image}></IonImg>*/}
                {/*            {value.name}*/}
                {/*            <br/>*/}
                {/*            Status : {value.status}*/}
                {/*            <br/>*/}
                {/*            Species : {value.species}*/}
                {/*            <br/>*/}
                {/*            Gender : {value.gender}*/}
                {/*        </IonItem>*/}
                {/*    )}*/}
                {/*</IonList>*/}

                <IonRow>
                    Date de sortie : {episodes?.air_date}
                    <br/>
                    Personnages :
                </IonRow>
                <IonList>
                    {characters.results.map(value =>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size={"6"}>
                                        <IonImg src={value.image}></IonImg>
                                    </IonCol>

                                    <IonCol size={"6"}>
                                        <IonRow className={"chara"}>
                                            <strong>{value.name}</strong>
                                        </IonRow>
                                        <IonRow className={"chara"}>
                                            <strong>Status : </strong> <IonLabel>{value.status}</IonLabel>
                                        </IonRow>
                                        <IonRow className={"chara"}>
                                            <strong>Species : </strong> <IonLabel>{value.species}</IonLabel>
                                        </IonRow>
                                        <IonRow className={"chara"}>
                                            <strong>Gender : </strong>{value.gender}
                                        </IonRow>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                            <br/>
                            <br/>
                            <br/>
                        </IonItem>
                    )}
                </IonList>


                {/*{episodes?.characters.map(value =>*/}
                {/*    <IonItem>*/}
                {/*        /!*{async () => await getCharacter({value})}*!/*/}
                {/*        {value}*/}
                {/*    </IonItem>*/}
                {/*)}*/}
            </IonContent>
        </IonPage>
    );
};

export default Detail;
