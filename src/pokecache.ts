export type CacheEntry<T> = { //Holds objects to be cached
    createdAt: number, //Date.now() - when the entry was created
    val: T, //Cached object
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #interval: number;
  #reapIntervalID: NodeJS.Timeout | undefined = undefined;

  constructor(interval: number){
    this.#cache = new Map<string, CacheEntry<any>>();
    this.#interval = interval;
    this.#reapIntervalID = undefined;

    this.#startReapLoop(); //Starts the loop
  };

  get cache() {
    return this.#cache;
  };

  get interval(): number {
    return this.#interval;
  };

  get reapIntervalID() {
    return this.#reapIntervalID;
  };

  add<T>(key: string, val: T): void { //Adds new entry to the cache
    this.#cache.set(key, val as CacheEntry<any>);
  };

  get<T>(key: string): CacheEntry<any> | undefined {
    return this.#cache.get(key);
  };

  #reap(): void {
    const maxTime = Date.now() - this.interval;

    if (this.cache){
    for (const [key, entry] of this.cache.entries()) {
      if (entry.createdAt < maxTime) {
        this.#cache.delete(key);
      };
    };
    };
  };

  #startReapLoop(): void {
    this.#reapIntervalID = setInterval(this.#reap, this.#interval);
  };

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalID);
    this.#reapIntervalID = undefined;
  };
};

