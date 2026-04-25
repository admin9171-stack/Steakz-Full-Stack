import { createContext, useContext, useState, ReactNode } from "react";

export type SteakType = "Strip" | "T-bone" | "Filet" | "RibEye" | "Sirloin" | "Porterhouse";
export type SubType = "Fries" | "Salad" | "Grilled Potatoes";
export type DrinkType = "Soda" | "Water";

export const STEAK_PRICES: Record<SteakType, number> = {
  Strip: 4.5,
  "T-bone": 5.0,
  Filet: 7.0,
  RibEye: 8.0,
  Sirloin: 6.0,
  Porterhouse: 9.0,
};
export const SUB_PRICES: Record<SubType, number> = {
  Fries: 2.0,
  Salad: 3.0,
  "Grilled Potatoes": 2.5,
};
export const DRINK_PRICES: Record<DrinkType, number> = {
  Soda: 1.25,
  Water: 0.9,
};

export interface Order {
  orderNumber: string;
  customerName: string;
  phone: string;
  steak: SteakType;
  steakQty: number;
  sub: SubType;
  subQty: number;
  drink: DrinkType;
  drinkQty: number;
  total: number;
}

export interface Employee {
  id: string;
  name: string;
  points: number;
}

const SEED_ORDERS: Order[] = [
  { orderNumber: "001", customerName: "Jhon", phone: "+09090900", steak: "T-bone", steakQty: 2, sub: "Fries", subQty: 2, drink: "Water", drinkQty: 1, total: 9.9 },
  { orderNumber: "002", customerName: "Martin", phone: "+09090700", steak: "Filet", steakQty: 2, sub: "Salad", subQty: 3, drink: "Water", drinkQty: 1, total: 23.3 },
  { orderNumber: "003", customerName: "Tina", phone: "+09090901", steak: "Strip", steakQty: 2, sub: "Fries", subQty: 2, drink: "Water", drinkQty: 1, total: 15.3 },
  { orderNumber: "004", customerName: "Priyanka", phone: "+09090965", steak: "Strip", steakQty: 2, sub: "Fries", subQty: 2, drink: "Soda", drinkQty: 1, total: 13.25 },
  { orderNumber: "005", customerName: "Sabrin Ahmed", phone: "+09090998", steak: "Strip", steakQty: 2, sub: "Fries", subQty: 2, drink: "Soda", drinkQty: 1, total: 21.3 },
  { orderNumber: "006", customerName: "Sumon Ahmed", phone: "+090909034", steak: "T-bone", steakQty: 2, sub: "Salad", subQty: 2, drink: "Water", drinkQty: 1, total: 21.3 },
  { orderNumber: "007", customerName: "Peter", phone: "+09090923", steak: "RibEye", steakQty: 2, sub: "Fries", subQty: 2, drink: "Water", drinkQty: 1, total: 21.78 },
  { orderNumber: "008", customerName: "Dinald", phone: "+09090929", steak: "Filet", steakQty: 2, sub: "Fries", subQty: 2, drink: "Soda", drinkQty: 1, total: 26.3 },
];

const SEED_EMPLOYEES: Employee[] = [
  { id: "0956", name: "Mark Wood", points: 432 },
  { id: "0946", name: "Peter", points: 382 },
  { id: "0821", name: "Martin Colins", points: 347 },
  { id: "1672", name: "Petric Lu", points: 281 },
  { id: "1920", name: "Jhonathan", points: 264 },
];

interface StoreContextValue {
  orders: Order[];
  employees: Employee[];
  isLoggedIn: boolean;
  addOrder: (o: Omit<Order, "orderNumber">) => void;
  addEmployee: (e: Omit<Employee, "id">) => void;
  deleteEmployee: (id: string) => void;
  login: () => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [employees, setEmployees] = useState<Employee[]>(SEED_EMPLOYEES);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const addOrder = (o: Omit<Order, "orderNumber">) => {
    setOrders((prev) => {
      const next = prev.length + 1;
      const orderNumber = String(next).padStart(3, "0");
      return [...prev, { ...o, orderNumber }];
    });
  };

  const addEmployee = (e: Omit<Employee, "id">) => {
    setEmployees((prev) => {
      const id = String(Math.floor(1000 + Math.random() * 9000));
      return [...prev, { ...e, id }];
    });
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <StoreContext.Provider value={{ orders, employees, isLoggedIn, addOrder, addEmployee, deleteEmployee, login, logout }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
