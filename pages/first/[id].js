import React, {useState, useCallback, useEffect} from 'react'
import dataJson from '../../dataset.json';

export default function First({ postData, query }) {
const [d, setData] = useState();

  const getFetchUrl = useCallback(async () => {
      const data = await fetch('https://hn.algolia.com/api/v1/search?query=');
      const res = await data.json();
      setData(res);
    },
    [],
  )

  useEffect(() => {
    const res =  getFetchUrl("react").catch(console.error);
    }, [getFetchUrl]);
  // useEffect(() => {
  //   const res = getFetchUrl("next").catch(console.error);
  // }, [getFetchUrl]);
  useEffect(() => {
    console.log("d:",d)
  }, [d]);




  return (
    <div style={{ color: "#FFF"}} >{postData} </div>
  )
}

export async function getStaticProps({params}) {
    const postData = params.id;
    console.log(postData)

    return {
      props: { 
          postData: postData,
          query: 'react'
      },
    };
  }

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()

    const id = dataJson.pages.first;
    console.log(id)
    return {
        paths: [
            { params: { id: '0' } },
            { params: { id: '1' } }, 
            { params: { id: '2' } } 
          ],
        fallback: false
    };
  }