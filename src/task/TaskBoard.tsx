import { Box } from "@mui/material";
import { useState } from "react";
import type { Task, TaskStatus } from "../types/task";
import { AddTodo } from "./AddTodo";
import TaskColumn from "./TaskColumn";
import {
  closestCenter,
  DragOverlay,
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

type BoardState = {
  tasksById: Record<number, Task>;
  columns: Record<TaskStatus, number[]>;
};

const initialTasks: Task[] = [
  {
    id: 1,
    status: "todo",
    jobType: "Montaj",
    customerName: "Ali",
    phone: "05886889898",
    address: {
      city: "Antalya",
      district: "Gazipaşa",
      quarter: "Gazi mahallesi",
      detail: "Bülent Ecevit Cad.",
    },
    process: "Klima montajı",
    price: "4000",
  },
];

const TaskBoard = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [board, setBoard] = useState<BoardState>(() => {
    const tasksById: Record<number, Task> = {};
    const columns: Record<TaskStatus, number[]> = {
      todo: [],
      "in-progress": [],
      done: [],
    };

    for (const task of initialTasks) {
      tasksById[task.id] = task;
      columns[task.status].push(task.id);
    }

    return { tasksById, columns };
  });

  const [show, setShow] = useState(false);

  const onAddClick = () => setShow(true);

  const findContainer = (
    id: string | number,
    columns: BoardState["columns"]
  ) => {
    if (id === "todo" || id === "in-progress" || id === "done") return id;
    const taskId = Number(id);
    for (const key of Object.keys(columns) as TaskStatus[]) {
      if (columns[key].includes(taskId)) return key;
    }
    return null;
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    setBoard((prev) => {
      const activeId = Number(active.id);
      const overId = over.id;

      const activeContainer = findContainer(activeId, prev.columns);
      const overContainer = findContainer(overId, prev.columns);

      if (!activeContainer || !overContainer) return prev;

      // Aynı kolonda sıralama
      if (activeContainer === overContainer) {
        const items = prev.columns[activeContainer];
        const oldIndex = items.indexOf(activeId);

        // over bir kolon id'si ise (string) -> sona at
        const newIndex =
          typeof overId === "string"
            ? items.length - 1
            : items.indexOf(Number(overId));

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex)
          return prev;

        return {
          ...prev,
          columns: {
            ...prev.columns,
            [activeContainer]: arrayMove(items, oldIndex, newIndex),
          },
        };
      }

      // Kolonlar arası taşıma
      const fromItems = prev.columns[activeContainer];
      const toItems = prev.columns[overContainer];

      const fromIndex = fromItems.indexOf(activeId);
      if (fromIndex === -1) return prev;

      const nextFrom = fromItems.filter((id) => id !== activeId);

      // over bir kart ise: o kartın index'ine, kolonsa: sona
      const toIndex =
        typeof overId === "string"
          ? toItems.length
          : toItems.indexOf(Number(overId));

      const insertIndex = toIndex === -1 ? toItems.length : toIndex;
      const nextTo = [...toItems];
      nextTo.splice(insertIndex, 0, activeId);

      return {
        tasksById: {
          ...prev.tasksById,
          [activeId]: { ...prev.tasksById[activeId], status: overContainer },
        },
        columns: {
          ...prev.columns,
          [activeContainer]: nextFrom,
          [overContainer]: nextTo,
        },
      };
    });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveId(Number(active.id))}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={(e) => {
        setActiveId(null);
        handleDragEnd(e);
      }}
    >
      <Box sx={{ height: "100%" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TaskColumn
            title="Todo"
            status="todo"
            taskIds={board.columns.todo}
            tasksById={board.tasksById}
            onAddClick={onAddClick}
          />
          <TaskColumn
            title="In Progress"
            status="in-progress"
            taskIds={board.columns["in-progress"]}
            tasksById={board.tasksById}
          />
          <TaskColumn
            title="Done"
            status="done"
            taskIds={board.columns.done}
            tasksById={board.tasksById}
          />
        </Box>

        {show && (
          <AddTodo
            onClose={() => setShow(false)}
            onSave={(data) => {
              const id = Date.now();
              const newTask: Task = { id, status: "todo", ...data };

              setBoard((prev) => ({
                tasksById: { ...prev.tasksById, [id]: newTask },
                columns: { ...prev.columns, todo: [...prev.columns.todo, id] },
              }));
              setShow(false);
            }}
          />
        )}
      </Box>
      <DragOverlay>
        {activeId != null ? (
          <TaskCard task={board.tasksById[activeId]} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
