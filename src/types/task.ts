export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: number;
  status: TaskStatus;

  jobType: string;
  customerName: string;
  phone: string;

  address: {
    city: string;
    district: string;
    quarter: string;
    detail: string;
  };

  process: string;
  price: string;
};
