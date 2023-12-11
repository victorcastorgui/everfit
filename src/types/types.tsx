export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  image: string;
  password: string;
  membership?: string;
  balance?: number;
  bookmarks?: [];
}

export interface Merch {
  id: number;
  stock: number;
  price: number;
  name: string;
  image: string[];
  eventId: number;
}

export interface Purchase {
  id: number;
  userId: number;
  eventId: number;
  purchaseDate: string;
  merchList: Merch[];
  paymentStatus: boolean;
}

export interface Event {
  id: number;
  name: string;
  startTime: string;
  duration: number;
  category: string;
  price: number;
  image: string;
  description: string;
  capacity: number;
}
