
// ssr
// SSG



import React, { useEffect } from "react";
import { Header } from "../components/Header";


export default function Home(props) {


  return (
    <div> 
     <h1>Index</h1>
     <p> {JSON.stringify(props.episodes)}</p>
    </div>
  )
}
 
export async function getServerSideProps() {
    const response = await fetch('http://localhost:3333/episodes')
    const data = await response.json()

    return { 
      props: {
        episodes: data,
      }
    }
}

  /*
  // SPA ---> não fica indexável pelo google.
  useEffect(() =>{

    fetch('http://localhost:3333/episodes')
      .then (response => response.json())
      .then(data => console.log(data))
     

  }, [])

  */
