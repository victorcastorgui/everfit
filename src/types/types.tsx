export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  image: string;
  password: string;
  membership?: string;
  balance?: number;
}

export interface Bookmarks {
  userId: number;
  eventId: number;
  id: number;
}

export interface Merch {
  id: number;
  name: string;
  desc: string;
  price: number;
  stock?: number;
  image: string;
  eventId: number;
  qty: number;
}

export interface Purchase {
  userId: number;
  eventId: number;
  purchaseDate: Date;
  merchs: Merch[];
  paymentStatus: boolean;
  paymentTotal: number;
  discount: number;
}

export interface Event {
  id: number;
  name: string;
  startTime: string;
  duration: string;
  category: string;
  price: number;
  image: string;
  description: string;
  capacity: number;
}
