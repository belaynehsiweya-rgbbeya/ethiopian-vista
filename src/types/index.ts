export interface Place {
  id: string;
  title: string;
  location: string;
  description: string;
  longDescription: string;
  image: string;
  category: 'History' | 'Nature' | 'Culture' | 'Ancient';
  rating: number;
  duration: string;
}

export type Category = 'All' | 'History' | 'Nature' | 'Culture' | 'Ancient';