import styles from './styles.module.scss'


export function Player(){

    return (
        <div className={styles.PlayerContainer}> 
        
            <header>
                <img src="/playing.svg" alt="Tocando Agora" />
                <strong> Tocando Agora</strong>
            </header>
            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
                
            </div>
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