
import { format, parseISO } from 'date-fns'; 
import ptBR from 'date-fns/locale/pt-BR'; 
import { GetStaticProps } from 'next'

import styles from './home.module.scss';
import Image from 'next/image';
import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { api } from '../services/api';
import { convertedDurationToString } from '../util/ConverterDuracao';
import Link from 'next/link'
import { PlayerContext } from '../Contexts/PlayerContext';

// cria o obejto epsodio
type Episodes = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
 
  durationString: string;

  url: string;
  publishedAt: string;

}
//cria a lista de obejtos
type homeProps = {
  latesEpisodes: Episodes[]
  allEpisodes: Episodes[]
}
export default function Home({latesEpisodes, allEpisodes}: homeProps) {
  const {play} = useContext(PlayerContext)

  return (
    <div className={styles.homePage}> 
      <section className={styles.latesEpisodes}> 
          <h2>Últimos Lançamentos</h2>

          <ul> 
              {latesEpisodes.map( episode => {
                return (
                  //key --> ajuda a identificar os itens da lista
                  <li key={episode.id}> 
                    <Image
                    width = {192}
                    height ={192}
                    src={episode.thumbnail} 
                    alt={episode.title}
                    objectFit="cover"
                    />
                    <div className={styles.episodeDetalhes}> 
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                      </Link>
                      <p>{episode.members}</p>
                      <span >{episode.publishedAt}</span>
                      <span>{episode.durationString} </span>
                    </div>

                    <button type="button" onClick={()=> play(episode)}>
                      <img src="/play-green.svg" alt="Tocar Epsisódio" />
                    </button>
                    
                  </li>
                );
              })}
          </ul>
      </section>
  <section className={styles.allEpisodes}> 
              <h2> Todos os Epsisódios</h2>
              <table cellSpacing={0}>
                <thead>
                  <tr>
                    <th style={{ width: 72}}></th>
                    <th>PodCast</th>
                    <th>Integrantes</th>
                    <th style={{ width: 100}}>Data</th>
                    <th>Duarção</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {allEpisodes.map( episode =>{
                      return( <tr key={episode.id}>
                      <td>
                        <Image
                          width={120}
                          height={120}
                          src={episode.thumbnail}
                          alt={episode.title}
                          objectFit="cover"
                        />
                      </td>
                      <td>
                      <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                      </Link></td>
                      <td>{episode.members}</td>
                      <td>{episode.publishedAt}</td>
                      <td>{episode.durationString}</td>
                      <td>
                        <button type="button">
                          <img src="/play-green.svg" alt="Tocar Epsisódio" />
                        </button>
                      </td>
                    </tr>
                    )})}
                  </tbody>
              </table>
      </section>
    </div>
  )
}
//ssG -- criação de uma pagina estatica.
export const  getStaticProps: GetStaticProps = async () =>  {
  //parametros para definição de quantidade
  const {data}  = await api.get('episodes',{
      params: {
        _limit: 12,
        _sort: 'published_at',
        _order: 'desc'
      }
  })
  
  const episodes = data.map( episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at),'d MMM yy',{locale: ptBR}),
      duration: Number(episode.file.duration),
      durationString: convertedDurationToString(Number(episode.file.duration )),
  
      url: episode.file.url,


    };
  })
    // retornar os epsodisos que vão ficar em destaque
    const latesEpisodes =episodes.slice(0,2,);
    // retornar os epsodisos restantes 
    const allEpisodes =episodes.slice(2, episodes.length); 
  return { 
    props: {
      latesEpisodes,
      allEpisodes,
    },
    revalidate: 60*60*8, //conversão para quando vai ser atualizada. só funciona em prdução.
  }
}

 /*
 ssr --> executa toda vez que alguem acessar a aplicação
export async function getServerSideProps() {
    const response = await fetch('http://localhost:3333/episodes')
    const data = await response.json()

    return { 
      props: {
        episodes: data,
      }
    }
}
*/

  /*
  // SPA ---> não fica indexável pelo google.
  useEffect(() =>{

    fetch('http://localhost:3333/episodes')
      .then (response => response.json())
      .then(data => console.log(data))
     

  }, [])

  */
