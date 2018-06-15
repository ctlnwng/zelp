import { Restaurant } from "./restaurant.model.client";

export class Response {
  postId: string;
  userId: string;
  restaurant: Restaurant;
  description: string;
  upvotes: number;
  downvotes: number;
}
