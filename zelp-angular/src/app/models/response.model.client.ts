import { Restaurant } from "./restaurant.model.client";

export class Response {
  _id: string;
  postId: string;
  userId: string;
  restaurant: Restaurant;
  description: string;
  restaurantURL: string;
  descriptions: string;
  restaurantImageURL: string;
  restaurantName: string;
  votes: any[];
  voteCounts: number;

}
