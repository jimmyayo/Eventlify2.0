import { makeAutoObservable } from 'mobx';
import { ServerError } from './../models/serverError';
export default class CommonStore {
   error: ServerError | null;

   constructor() {
      makeAutoObservable(this);
      this.error = null;
   }

   setServerError = (error: ServerError) => {
      this.error = error;
   }
}