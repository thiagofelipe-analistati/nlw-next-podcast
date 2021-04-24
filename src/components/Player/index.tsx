import { useContext } from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image';


export function Player(){
    const {episodeList, currentEpisodeIndex} = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex]

    return (
        <div className={styles.PlayerContainer}> 
        
            <header>
                <img src="/playing.svg" alt="Tocando Agora" />
                <strong> Tocando Agora </strong>
            </header>
            {episode ? (
                   
                <div className={styles.currentEpisode}>
                    <Image 
                    width={592} 
                    height={592} 
                    src={episode.thumbnail}
                    objectFit="cover"
                     />

                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                    
                </div>

            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                
                </div>
            )}

            <footer className={styles.empty}>
                <div className={styles.progresso}> 
                    <span> 00:00</span>
                    <div className={styles.slider}> 
                        <div className={styles.emptySlider}/>
                    </div>
                    <span> 00:00</span>
                </div>
                <div className={styles.botao}>
                    <button type="button">
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>   
                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>     
                    <button type="button" className={styles.playButton}>
                    <img src="/play.svg" alt="tocar" />
                    </button>   
                    <button type="button">
                        <img src="/play-next.svg" alt="tocar Próxima" />
                    </button>    
                    <button type="button">
                        <img src="/repeat.svg" alt="Repetir " />
                    </button>    
                </div>

            </footer>
        </div>
    )
} 