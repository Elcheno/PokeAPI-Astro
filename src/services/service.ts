import {type iResult, type iPokemon, type iPokeTypeData, type iPokemonData} from '../types/api';

const limitURL:number = 890;

const PokeAPI = async (url: string) => {
    return await fetch(url)
}

const PokeDataAPI = async (url: string) => {
    return await fetch(url)
}

const PokeDataPromises = async (url: string) => {
    const data = await PokeAPI(url).then(res => res.json()).then(response => response.results as iResult[])
    return data.map(async (poke: iResult) => {
        return await PokeDataAPI(poke.url).then(res => res.json()).then(response => response as iPokemon)
    })
}

export async function getPokeData(url: string) {
    const res = await PokeDataPromises(url)
    return await Promise.all(res)
        .then(response => {
            return response
        })
}

export async function getOnePokeData(url: string) {
    return await PokeAPI(url).then(res => res.json()) as iPokemon
}

export function getLimitURL():number {
    return limitURL;
}

export function getTypes(){
    return ['grass', 'water', 'fire', 'poison', 'flying', 'bug', 
    'normal', 'dark', 'dragon', 'electric', 'fairy', 'fighting',
     'ghost', 'ground', 'ice', 'psychic', 'rock', 'steel'];
}