import {State} from "./state.js";
import {Pokemon} from "./apitypes/pokemon.js";

export async function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
    process.exit(0);
};

export async function commandHelp(state: State) {

    console.log("Welcome to the Pokedex!\nUsage:\n")

    for (let eachCommand of state.commands) {
        console.log(`${eachCommand.name}: ${eachCommand.description}`);
    };
};

export async function commandMap(state: State) {
    let fetchURL = "";

    try{
    if (state.nextLocationsURL){//If we have already searched, lets go to the next url
        fetchURL = state.nextLocationsURL;
    };

    const locations = await state.api.fetchLocations(fetchURL);

    for (let place of locations.results){ //For each place, print its name to the console
        console.log(place.name);
    };
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    }catch(error){
        console.log(`Error fetching locations in commandMap: ${error}`);
    };

};

export async function commandMapBack(state: State) {
    try{
    const locations = await state.api.fetchLocations(state.prevLocationsURL);

    for (let place of locations.results){ //For each place, print its name to the console
        console.log(place.name);
    };
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    }catch(error){
        console.log(`Error fetching locations in commandMap: ${error}`);
    };
};

export async function commandExplore(state: State, areaToExplore: string) {
    try{
        const exploredData = await state.api.exploreArea(areaToExplore);

        for (let pokemonInfo of exploredData.pokemon_encounters){
            console.log(pokemonInfo.pokemon.name);
        };
    }catch(error){
        console.log(`failed exploring area in commandExplore: ${error}`);
    };
};

export async function commandCatch(state: State, pokemonToCatch: string) {
    if (state.caughtPokemon){
        Object.values(state.caughtPokemon).forEach((value: Pokemon) => { //Search the state object, if the pokemon has been captured
            if (value.name == pokemonToCatch){
                const xpDifficulty = value.base_experience;
                attempToCatch(xpDifficulty,pokemonToCatch);
                return;
            }
        });
    };

    try{
        const pokemonData = await state.api.catchPokemon(pokemonToCatch);
        
        const xpDifficulty = pokemonData.base_experience;

        attempToCatch(xpDifficulty, pokemonToCatch);

        addToPokedex(state, pokemonData); //Adds to cache in the State object

        return;
       
        }catch(error){
        console.log(`failed fetching information in commandCatch: ${error}`);
    };
};

export async function commandInfo(state: State, pokemonToCatch: string){
    let found = false;
     if (state.caughtPokemon){
        Object.values(state.caughtPokemon).forEach((value: Pokemon) => { //Search the state object, if the pokemon has been captured
            if (value.name == pokemonToCatch){
                found = true;
                console.log("Here's the information you requested, trainer:\n");
                console.log(`Name: ${value.name}`);
                console.log(`Height: ${value.height}`);
                console.log(`Weight: ${value.weight}`);
                for (let eachStat of value.stats){
                    console.log(`${eachStat.stat.name}: ${eachStat.base_stat}`);
                };
                for (let eachType of value.types){
                    console.log(`${eachType.type.name}`);
                };
            };
        });
     };
    if (found === false){
    console.log("You have not caught that one yet!");
    };
};

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

function attempToCatch(xpDifficulty: number, pokemonToCatch: string) { //Pokemon capture logic
    const catchPower = getRandomInt(1, 401) - xpDifficulty;

    console.log(`Throwing a Pokeball at ${pokemonToCatch}...`);

     if (catchPower <= 0){
            console.log(`${pokemonToCatch} escaped!`);
        }else{
            console.log(`${pokemonToCatch} was caught!`)
            };
    return;
};

function addToPokedex(state: State, pokemonData: Pokemon): void{
    state.caughtPokemon[pokemonData.name] = pokemonData;
};