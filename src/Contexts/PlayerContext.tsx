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
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrev: () => void;
    hasPrev: boolean;
    hasNext: boolean;
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
    
    function playList(list: Episode[], index: number){
        SetEpisodeList(list);
        SetCurrentEpisodeIndex(index);
        SetIsPlaying(true)
    }
    function togglePlay (){
      SetIsPlaying(!isPlaying);
    }
    function setIsPlayingState (state: boolean){
      SetIsPlaying(state);
    }

    const hasPrev = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
    function playNext(){
      const nextEpisodeIndex = currentEpisodeIndex +1;
      
      if(hasNext){
        SetCurrentEpisodeIndex(currentEpisodeIndex + 1 );    
        }
      }

      function playPrev(){
        if(hasPrev){
          SetCurrentEpisodeIndex(currentEpisodeIndex - 1 ); 
        }
      }
    return (
  
        <PlayerContext.Provider 
        value={{
            episodeList, 
            currentEpisodeIndex, 
            play, 
            isPlaying, 
            togglePlay, 
            setIsPlayingState,
            playList,
            playNext,
            playPrev,
            hasPrev,
            hasNext
            }}>
            {children}
        </PlayerContext.Provider>
        )
}