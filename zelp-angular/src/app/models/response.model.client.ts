import { Restaurant } from "./restaurant.model.client";

export class Response {
  postId: string;
  userId: string;
  restaurant: Restaurant;
  description: string;
  upVotes: number;
  downVotes: number;
  restaurantURL: string;
  descriptions: string;
  restaurantImageURL: string;
  restaurantName: string;
}
