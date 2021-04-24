import { useContext } from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image';

import Slider from 'rc-slider';
 import 'rc-slider/assets/index.css';


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

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progresso}> 
                    <span> 00:00</span>
                    <div className={styles.slider}> 
                        { episode ? (
                            <Slider
                                trackStyle = {{ backgroundColor:' #04d361'}} //pega o que já foi reproduzido
                                railStyle ={{ backgroundColor: '#9f75ff'}}//pega o que ainda não foi reproduzido
                                handleStyle ={{ borderColor: '#04d361', borderWidth: 4}}
                            
                            />
                        ) : (
                            
                            <div className={styles.emptySlider}/>
                        )}
                    </div>
                    <span> 00:00</span>
                </div>
                {episode && (
                    <audio 
                    src={episode.url}
                    autoPlay

                    />

                   
                )}
                <div className={styles.botao}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>   
                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>     
                    <button type="button" className={styles.playButton} disabled={!episode}>
                    <img src="/play.svg" alt="tocar" />
                    </button>   
                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="tocar Próxima" />
                    </button>    
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir " />
                    </button>    
                </div>

            </footer>
        </div>
    )
} 