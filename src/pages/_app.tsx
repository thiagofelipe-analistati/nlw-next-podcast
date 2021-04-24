import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContext } from '../Contexts/PlayerContext';



function MyApp({ Component, pageProps }) {
  return (

      <PlayerContext.Provider value={'diego'}>
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
