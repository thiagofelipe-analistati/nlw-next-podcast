import {useContext, createContext, useState, ReactNode} from 'react'

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
    isLooping: boolean;  
    play: (episode: Episode) => void;
    togglePlay: ( ) => void;
    toggleLoop: ( ) => void;
    toggleShuflle: ( ) => void;
    cleanPlayerState: ( ) => void;
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
    const [isLooping, SetIsLooping] = useState(false);
    const [isShuffle, SetIsShuffle] = useState(false);
    
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
    function toggleLoop (){
      SetIsLooping(!isLooping);
    }
    function toggleShuflle (){
      SetIsShuffle(!isShuffle);
    }
    function setIsPlayingState (state: boolean){
      SetIsPlaying(state);
    }
    function cleanPlayerState(){
      SetEpisodeList([]);
      SetCurrentEpisodeIndex(0);
  }

    const hasPrev = currentEpisodeIndex > 0;
    const hasNext = isShuffle || (currentEpisodeIndex + 1) < episodeList.length;
    function playNext(){
      
      if(isShuffle){
        const nextRandomEpisodeIndex =Math.floor(Math.random() * episodeList.length);
        SetCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if(hasNext){
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
            isLooping,
            toggleLoop,
            isShuffle,
            toggleShuflle,
            setIsPlayingState,
            playList,
            playNext,
            playPrev,
            hasPrev,
           cleanPlayerState,
            hasNext
            }}>
            {children}
        </PlayerContext.Provider>
        )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}