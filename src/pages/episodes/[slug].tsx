import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router'
import React from 'react';
import { api } from '../../services/api';
import { convertedDurationToString } from '../../util/ConverterDuracao';


import styles from './episodes.module.scss';


type Episode = {
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
   
    durationString: string;
  
    url: string;
    publishedAt: string;
    description: string;
}
type EpisodeProps = {
    episode: Episode;
}

// função que vai fazer pegar cada epsódio e virar uma pagina.
export default function Episode({episode}:EpisodeProps){
  
    return(
        <div className={styles.episode}> 
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                <button type="button">
                    <img src="/arrow-left.svg" alt="voltar" />
                </button>
                </Link> 
                
                
                    <Image width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                    />
                

                <button type="button">
                    <img src="/play.svg" alt="Tocar Próximo Epsódio" />
                </button>
            </div> 

            <header>
                <h1> {episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationString}</span>
            </header>
            <div 
            className={styles.Description} 
            dangerouslySetInnerHTML= {{__html:episode.description}} 
            />
           

        </div>
        
        )
}

export const getStaticPaths: GetStaticPaths = async () =>  {
    return{
        paths: [],
        fallback: 'blocking'

}
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {slug} = ctx.params;
    const {data} = await api.get(`/episodes/${slug}`);


    const episode = {
          id: data.id,
          title: data.title,
          thumbnail: data.thumbnail,
          members: data.members,
          publishedAt: format(parseISO(data.published_at),'d MMM yy',{locale: ptBR}),
          duration: Number(data.file.duration),
          durationString: convertedDurationToString(Number(data.file.duration )),
          description: data.description,
          url: data.file.url,
    
    
        };

    return {
        props: {
            episode,
        },
            revalidate: 60 * 60 * 24, // 24hs
    }
}

