import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import {useRouter} from 'next/router'
import { api } from '../../services/api';
import { convertedDurationToString } from '../../util/ConverterDuracao';


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
        <h1> {episode.title} </h1>
        
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

