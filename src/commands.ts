import {State} from "./state.js"

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