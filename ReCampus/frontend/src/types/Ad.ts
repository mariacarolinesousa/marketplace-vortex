export interface Ad {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  location: string;
  price: number;
  imageUrl: string;
  isDonation: boolean;
  views: number;
  user: {
    id: string;
    name: string;
  };
}