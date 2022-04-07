import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSearchbar,
    useIonViewDidEnter, withIonLifeCycle
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {useState} from "react";

export interface Rick_MortyAPI{
    results: Episode[],
    next?: string
}

export interface Episode{
    count: number,
    pages: number,
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
    const [list_state, setListState] = useState<Rick_MortyAPI>({results:[]})
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);

    // const [searchText, setSearchText] = useState('');

    const [Test, setTest] = useState('');

    async function getEpisode(url: string){
        setIsInfiniteDisabled(true);

        try {
            let request = await fetch(url);
            let answer = await request.json();

            let final = {
                next: answer.info.next,
                results:[...episodes.results, ...answer.results]
            }

            setEpisodes(final);
            setListState(final);
        } catch (error){
            console.error(error);
        }

        setIsInfiniteDisabled(false);
    }

    async function getSearched(episode_name: string){
        if(episode_name === ''){
            setEpisodes(list_state);
        }
        else{
            let request = await fetch(`https://rickandmortyapi.com/api/episode/?name=${episode_name}`);
            let answer = await request.json();

            if(answer.error){
                let empty = {next: "", results: []}
                setEpisodes(empty);
                // setTest("Not found");
            }
            else{
                setEpisodes(answer);
                // setTest("https://rickandmortyapi.com/api/episode/?name=" + url);
            }
        }
    }

    useIonViewDidEnter(async () => await getEpisode('https://rickandmortyapi.com/api/episode/?page=1'));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/*<IonTitle>All Episodes</IonTitle>*/}
                    <IonSearchbar onIonChange={e => {getSearched(e.detail.value!)}}></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {episodes.results.map(value =>
                        <IonItem routerLink={"detail/"+value.id}>
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