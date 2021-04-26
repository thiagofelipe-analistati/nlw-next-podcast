import { useRef, useEffect, useState} from 'react'
import { usePlayer } from '../../Contexts/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image';

import Slider from 'rc-slider';
 import 'rc-slider/assets/index.css';
import { convertedDurationToString } from '../../util/ConverterDuracao';


export function Player(){
    const audioRef = useRef <HTMLAudioElement> (null);
    const [progress, setProgress] = useState(0);
    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying,
        togglePlay,
        isLooping,
        toggleLoop,
        isShuffle,
        toggleShuflle,        
        setIsPlayingState,
        playNext,
        playPrev,
        cleanPlayerState,
        hasNext,
        hasPrev,
    } = usePlayer();

    useEffect (()=> {
        if(!audioRef.current){
            return;
        }
        if(isPlaying){
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])


    function setupProgressListener(){
        audioRef.current.currentTime = 0;
        audioRef.current.addEventListener('timeupdate' , () =>{
            setProgress(Math.floor(audioRef.current.currentTime))
        });
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);

    }

    
    function handleEpisodeEnded (){
        if(hasNext){
            playNext()
        }else {
            cleanPlayerState();
        }
    }
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
                    <span>{convertedDurationToString(progress)} </span>
                    <div className={styles.slider}> 
                        { episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle = {{ backgroundColor:' #04d361'}} //pega o que já foi reproduzido
                                railStyle ={{ backgroundColor: '#9f75ff'}}//pega o que ainda não foi reproduzido
                                handleStyle ={{ borderColor: '#04d361', borderWidth: 4}}
                            
                            />
                        ) : (
                            
                            <div className={styles.emptySlider}/>
                        )}
                    </div>
                    <span>{convertedDurationToString(episode?.duration ?? 0)} </span>
                </div>
                {episode && (
                    <audio 
                    src={episode.url}
                    autoPlay
                    loop={isLooping}
                    ref={audioRef}
                    onEnded ={handleEpisodeEnded }
                    onPlay={() => setIsPlayingState(true)}
                    onPause={() => setIsPlayingState(false)}
                    onLoadedData={setupProgressListener}

                    />

                   
                )}
                <div className={styles.botao}>
                    <button 
                    type="button" 
                    disabled={!episode || episodeList.length ==1}
                    onClick={toggleShuflle}
                    className={isShuffle ? styles.isActive : ''}
                    >
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>   
                    <button type="button" onClick={playPrev} disabled={!episode || !hasPrev}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>     
                    <button 
                    type="button" 
                    className={styles.playButton} 
                    disabled={!episode}
                    onClick={togglePlay}>
                    { isPlaying ? 
                      <img src="/pause.svg" alt="tocar " /> 
                      : <img src="/play.svg" alt="tocar" />}
                    </button>   
                    <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
                        <img src="/play-next.svg" alt="tocar Próxima" />   
                    </button>    
                    <button type="button" disabled={!episode} onClick={toggleLoop} className={ isLooping ?  styles.isActive : ''}>
                        <img src="/repeat.svg" alt="Repetir " />
                    </button>    
                </div>

            </footer>
        </div>
    )
} 