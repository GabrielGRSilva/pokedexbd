import {LocationIDless} from "./apitypes/locationidless.js";
import {Cache} from "./pokecache.js"

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  #cache = new Cache(5000);

  constructor(cache: Cache) {
    this.#cache = cache;
  };

  async fetchLocations(pageURL?: string): Promise<LocationIDless> {
    
    if (!pageURL) {
        pageURL = PokeAPI.baseURL + "/location-area/";

        const cachedEntry = this.#cache.get(pageURL); //If the obj is already in cache
        if (cachedEntry) {
            return cachedEntry.val;
        };
    };

    try{
    const response = await fetch(pageURL, {
        method: "GET",
        mode: "cors",    
    });
    const data = await response.json();

    let obj: LocationIDless = JSON.parse(JSON.stringify(data));

    if (!this.#cache.get(pageURL)){
    this.#cache.add(pageURL, obj); //Check and add to cache
    };

   return obj;

    }catch(error){
        throw new Error(`failed fetching and parsing in fetchLocations: ${error}`);
    }
  };

  async fetchLocation(locationName: string): Promise<LocationIDless> {
    const fullURL = PokeAPI.baseURL + "/location/" + locationName;

    const cachedEntry = this.#cache.get(fullURL); //If the obj is already in cache
    if (cachedEntry) {
        return cachedEntry.val;
    };

    try {
        const response = await fetch(fullURL, {
        method: "GET",
        mode: "cors",    
    });
    
    const data = await response.json();

    let obj: LocationIDless = JSON.parse(data);

    if (!this.#cache.get(fullURL)){
    this.#cache.add(fullURL, obj); //Check and add to cache
    };

   return obj;

    }catch(error){
        throw new Error(`failed fetching and parsing in fetchLocation: ${error}`);
    }
  }
};