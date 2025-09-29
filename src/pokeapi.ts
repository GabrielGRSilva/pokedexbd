import {LocationIDless} from "./apitypes/locationidless.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<LocationIDless> {
    if (!pageURL) {
        pageURL = PokeAPI.baseURL + "/location-area/";
    };
    try{
    const response = await fetch(pageURL, {
        method: "GET",
        mode: "cors",    
    });
    const data = await response.json();

    let obj: LocationIDless = JSON.parse(JSON.stringify(data));

   return obj;
    }catch(error){
        throw new Error(`failed fetching and parsing in fetchLocations: ${error}`);
    }
  };

  async fetchLocation(locationName: string): Promise<LocationIDless> {
    const fullURL = PokeAPI.baseURL + "/location/" + locationName;

    try {const response = await fetch(fullURL, {
        method: "GET",
        mode: "cors",    
    });
    
    const data = await response.json();

    let obj: LocationIDless = JSON.parse(data);

   return obj;
    }catch(error){
        throw new Error(`failed fetching and parsing in fetchLocation: ${error}`);
    }
  }
};