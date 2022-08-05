/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const HEADERS_KEY = 'auth-headers';
const USER_CAMPAIGN_ID = 'user-campaign-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    await this._storage.set(key, value);
  }

  public async get(key: string){
    return await this._storage.get(key);
  }

  public async remove(key: string){
    await this._storage.remove(key);
  }

  public async clear() {
    await this._storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  public async signOut() {
    await this.clear();
  }

  public async saveToken(token: string): Promise<void> {
    await this.remove(TOKEN_KEY);
    await this.set(TOKEN_KEY,token);
  }

  public async getToken(): Promise<any> {
    return this.get(TOKEN_KEY);
  }

  public async saveUser(user: any): Promise<void> {
    await this.remove(USER_KEY);
    //await this.set(USER_KEY, user);
    await this.set(USER_KEY, JSON.stringify(user));
  }

  public async getUser(): Promise<any> {
    const user = await this.get(USER_KEY);
    if (user) {
      return JSON.parse(await user);
    }

    return null;
  }

  public async saveCampaignId(campaignId: any): Promise<void> {
    await this.remove(USER_CAMPAIGN_ID);
    //await this.set(USER_KEY, user);
    await this.set(USER_CAMPAIGN_ID, campaignId);
  }

  public async getCampaignId(): Promise<any> {
        await this.get(USER_CAMPAIGN_ID);
  }
}
