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

    function playNext(){
      const nextEpisodeIndex = currentEpisodeIndex +1;
      
      if(nextEpisodeIndex < episodeList.length){
        SetCurrentEpisodeIndex(currentEpisodeIndex + 1 );    
        }
      }

      function playPrev(){
        if(currentEpisodeIndex > 0){
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
            playPrev
            }}>
            {children}
        </PlayerContext.Provider>
        )
}