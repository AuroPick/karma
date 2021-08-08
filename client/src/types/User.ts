export interface User {
  id: string;
  username: string;
  birthDay: { day: string; month: string; year: string };
  image: string;
  likes: { _id: string; username: string; birthDay: { day: string; month: string; year: string }; image: string }[];
  liked: { _id: string }[];
}
