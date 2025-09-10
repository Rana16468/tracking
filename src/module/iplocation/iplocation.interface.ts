import { Model } from 'mongoose';

export interface TIplocation {
  visitorId: String;
   ipLocation:string;
  isDelete: Boolean;
}

export interface IplocationModal extends Model<TIplocation> {
  // eslint-disable-next-line no-unused-vars
  IsIplocationExist(id: string): Promise<TIplocation>;
}

export interface IplocationResponse {
  status: Boolean;
  message: string;
}
