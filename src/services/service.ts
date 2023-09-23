import {type iResult, type iPokemon} from '../types/api';

const urlDefault = "https://pokeapi.co/api/v2/pokemon?limit=110&offset=0"

export const PokeAPI = async () => {
    return await fetch(urlDefault)
}

export const PokeDataAPI = async (url: string) => {
    return await fetch(url)
}

export const PokeDataPromises = async () => {
    const data = await PokeAPI().then(res => res.json()).then(response => response.results as iResult[])
    return data.map(async (poke: iResult) => {
        return await PokeDataAPI(poke.url).then(res => res.json()).then(response => response as iPokemon)
    })
}

export async function getPokeData() {
    const res = await PokeDataPromises()
    return await Promise.all(res)
        .then(response => {
            return response
        })
}
