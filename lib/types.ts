export interface Rate {
    weight: string;
    price: string;
    priceLocal: string;
  }
  
  export interface Order {
    id: string;
    description: string;
    total: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
  }
  