import { useLayoutEffect } from "react";
import styled from "styled-components";
import NodesContainer from '../../components/NodesContainer';
import ArticlesHeader from '../../components/ArticlesHeader';
import { UpChevronSVG } from "../../components/Svgs";
import { useSpring } from "framer-motion";


export default function Scenography({ data }) {

    const spring = useSpring(0, { damping: 100, stiffness: 1000    });

    function slideTo(to) {
      spring.set(window.pageYOffset, false);
      setTimeout(() => {
        spring.set(to);
      }, 50);
    }
    
    useLayoutEffect(() => {
        spring.onChange(latest => {
          window.scrollTo(0, latest);
        });
      }, [spring]);

  return (
    <StyledContainer>
        <ArticlesHeader data={data} slideTo={slideTo}/>
        <div>
            <StyledChevron onClick={() => slideTo(0)}> 
                <UpChevronSVG/>
            </StyledChevron>

            <NodesContainer data={data} slideTo={slideTo}/>
        </div>
    </StyledContainer>
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

    const data = await fetchData(`/article-scenography/${id}`).catch(err => console.error(err) ) 

    return {
      props: { 
          data: data?.data || {},
      },
    };
  }

export async function getStaticPaths() {

    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }, 
            { params: { id: '3' } }, 
            { params: { id: '4' } }, 
            { params: { id: '5' } }, 
            { params: { id: '6' } }, 
          ],
        fallback: false
    };
  }


const StyledContainer = styled.div`
    height: 200vh;
    width: 100%;
    overflow: hidden;
`

const StyledChevron = styled.div`
  position: sticky;
  top:0;
  width:100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
`;
