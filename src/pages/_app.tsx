import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContext } from '../Contexts/PlayerContext';
import { useState } from 'react';



function MyApp({ Component, pageProps }) {
  const [episodeList, SetEpisodeList] = useState([])
  const [currentEpisodeIndex, SetCurrentEpisodeIndex] = useState(0)
  
  function play (episode){
    SetEpisodeList([episode]);
    SetCurrentEpisodeIndex(0);
  }
  return (

      <PlayerContext.Provider value={{episodeList, currentEpisodeIndex, play}}>
      <div className = {styles.Wrapper}>


      <main> 
        <Header /> 
        <Component {...pageProps} />
      </main>
      <Player /> 

      </div>
      </PlayerContext.Provider>
      
  )
}

export default MyApp
