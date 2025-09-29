export type CacheEntry<T> { //Holds objects to be cached
    createdAt: [number], //Date.now() - when the entry was created
    val: T, //Cached object
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();

  constructor(cache: Map<string,CacheEntry<any>>){
    this.#cache = cache;
  };

  add<T>(key: string, val: T): void {
    this.#cache.set(key, val);
  }


};

