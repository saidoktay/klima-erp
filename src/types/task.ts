export type Task = {
  id: string;
  status: "todo" | "inprogress" | "done";
  taskType: string;
  customerName: string;
  customerNumber: string;
  address: {
    city: string;
    district: string;
    quarter: string;
    detail: string;
  };
  work: string;
  price: string;
};
