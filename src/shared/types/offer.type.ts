import { City } from './city.type.js';
import { User } from './user.type.js';
import { Location } from './location.type.js';
import { OfferType } from '../const.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  facilities: string[];
  user: User;
  location: Location;
}
