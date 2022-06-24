import React, {useState, useCallback, useEffect} from 'react'
import dataJson from '../../dataset.json';

export default function Journal({ data, query }) {
  console.log(data)
// const [d, setData] = useState();

  // const getFetchUrl = useCallback(async () => {
  //     const data = await fetch('https://hn.algolia.com/api/v1/search?query=');
  //     const res = await data.json();
  //     setData(res);
  //   },
  //   [],
  // )

  // useEffect(() => {
  //   const res =  getFetchUrl("react").catch(console.error);
  //   }, [getFetchUrl]);
  // // useEffect(() => {
  // //   const res = getFetchUrl("next").catch(console.error);
  // // }, [getFetchUrl]);
  // useEffect(() => {
  //   console.log("d:",d)
  // }, [d]);

  // console.log(data.nodes)


  return (
    <div style={{ color: "#FFF"}} >{'postData'} </div>
  )
}

export async function getStaticProps({ params }) {
    const id = params.id;

    const DIRECTUS_API = process.env.DIRECTUS
    
    const fetchData = async( route ) => {
        const res = await fetch(`${ DIRECTUS_API + route }`, {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' }
        })
        const resJson = await res.json()
        
        if ( resJson.errors ) throw resJson.errors
        return resJson
    }

    const data = await fetchData(`/article-journal/${id}`).catch(err => console.error(err) ) 
console.log(data)
    return {
      props: { 
          data: 'data',
      },
    };
  }

export async function getStaticPaths() {


    // const id = dataJson.pages.first;
    // console.log(id)
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }, 
            { params: { id: '3' } } 
          ],
        fallback: true
    };
  }