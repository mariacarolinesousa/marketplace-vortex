export interface Ad {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  location: string;
  price: number | null;
  imageUrl: string;
  isDonation: boolean;
  user: {
    id: string;
    name: string;
  };
}