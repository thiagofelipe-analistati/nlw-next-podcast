
import { GetStaticProps } from 'next'



import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { api } from '../services/api';

// cria o obejto epsodio
type Episodes = {
  id: string;
  title: string;
  members: string;
  // ...

}
//cria a lista de obejtos
type homeProps = {
   episodes: Episodes[]
}
export default function Home(props: homeProps) {


  return (
    <div> 
     <h1>Index</h1>
     <p> {JSON.stringify(props.episodes)}</p>
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
        _order: 'desc',
      }
  })
  

  return { 
    props: {
      episodes: data,
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
