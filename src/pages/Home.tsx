import {
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter, withIonLifeCycle
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {useState} from "react";

interface Rick_MortyAPI{
    results: Episode[],
    next?: string
}


interface Episode{
    count: number,
    pages: number,
    next: string,
    prev: string
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string
}

// interface  Episode_info{
//     count: number,
//     pages: number,
//     next?: string,
//     prev?: string
// }
//
// interface Episode_result{
//     id: number,
//     name: string,
//     air_date: string,
//     episode: string,
//     characters: string[],
//     url: string,
//     created: string
// }

const Home: React.FC = () => {
    const [episodes, setEpisodes] = useState<Rick_MortyAPI>({results:[]})
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);

    async function getEpisode(url: string){
        setIsInfiniteDisabled(true);

        try {
            let response = await fetch(url);
            let answer = await response.json();

            let final = {
                next: answer.info.next,
                results:[...episodes.results, ...answer.results]
            }

            setEpisodes(final);
        } catch (error){
            console.error(error);
        }

        setIsInfiniteDisabled(false);
    }

    useIonViewDidEnter(async () => await getEpisode('https://rickandmortyapi.com/api/episode/?page=1'));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>All Episodes</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {episodes.next}
                    {episodes.results.map(value =>
                        <IonItem>
                            <IonLabel>
                                {/*<div>{value.name}</div>*/}
                                {value.name}
                                <br></br>
                                <div className={"ep_infos"}>{value.episode} - {value.air_date}</div>
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>
                <IonInfiniteScroll
                    onIonInfinite={async () => await getEpisode(episodes.next as string)}
                    threshold="100px"
                    disabled={isInfiniteDisabled}
                >
                    <IonInfiniteScrollContent
                        loadingSpinner="bubbles"
                        loadingText="Loading more data..."
                    ></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
};

export default withIonLifeCycle(Home);