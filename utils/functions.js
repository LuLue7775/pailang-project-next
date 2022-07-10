

export async function fetchData( route ){
    const DIRECTUS_API = process.env.DIRECTUS

    const res = await fetch(`${ DIRECTUS_API + route }`, {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }
    })
    const resJson = await res.json()
    
    if ( resJson.errors ) throw resJson.errors
    return resJson
}