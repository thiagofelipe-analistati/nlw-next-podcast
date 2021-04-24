import {createContext, useState, ReactNode} from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;

}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    togglePlay: ( ) => void;
    setIsPlayingState: ( state: boolean ) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);


type PlayerContextProviderProps = {
     children: ReactNode;
}
export function PlayerContextProvider({children}: PlayerContextProviderProps){
    const [episodeList, SetEpisodeList] = useState([]);
    const [currentEpisodeIndex, SetCurrentEpisodeIndex] = useState(0);
    const [isPlaying, SetIsPlaying] = useState(false);
    
    function play (episode: Episode){ 
      SetEpisodeList([episode]);
      SetCurrentEpisodeIndex(0);
      SetIsPlaying(true)
    }
    function togglePlay (){
      SetIsPlaying(!isPlaying);
    }
    function setIsPlayingState (state: boolean){
      SetIsPlaying(state);
    }
    return (
  
        <PlayerContext.Provider 
        value={{
            episodeList, 
            currentEpisodeIndex, 
            play, 
            isPlaying, 
            togglePlay, 
            setIsPlayingState
            }}>
            {children}
        </PlayerContext.Provider>
        )
}