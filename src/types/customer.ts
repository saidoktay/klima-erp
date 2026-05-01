import type { StockDropItem } from "./task";

export type CustomerJobRecord = {
  taskId: string;
  completedAt: string;
  taskType: string;
  work: string;
  price: string;
  assignedPersonnelId: string;
  stockDrops: StockDropItem[];
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  addressText: string;
  jobs: CustomerJobRecord[];
};
