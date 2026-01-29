import { Box, Typography, Modal, IconButton } from "@mui/material";
import TaskColumn from "../Task/TaskColumn";
import { useState } from "react";
import AddTodo from "./AddTodo/AddTodo";
import CloseIcon from "@mui/icons-material/Close";
import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { moveTask } from "../../../store/tasksSlice";
import { DragOverlay } from "@dnd-kit/core";
import type { DragStartEvent } from "@dnd-kit/core";



const TaskBoard = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const [openAdd, setOpenAdd] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks);

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    done: tasks.filter((t) => t.status === "done"),
  };
  const dispatch = useDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over) return;

  const activeId = String(active.id);
  const overId = String(over.id);

  const activeTask = tasks.find((t) => t.id === activeId);
  const overTask = tasks.find((t) => t.id === overId);

  if (!activeTask) return;

  const targetStatus = overTask
    ? overTask.status
    : (overId as "todo" | "inprogress" | "done");

  const targetList = tasksByStatus[targetStatus];
  const targetIndex = overTask
    ? targetList.findIndex((t) => t.id === overId)
    : targetList.length;

  dispatch(
    moveTask({
      taskId: activeId,
      targetStatus,
      targetIndex,
    })
  );
  setActiveId(null);

 

};
const handleDragStart = (event: DragStartEvent) => {
  setActiveId(String(event.active.id));
};
const activeTask = tasks.find((t) => t.id === activeId);
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <Box>
        <Typography variant="h5" fontWeight={700} sx={{ display:"flex",justifyContent:"center", }}>
          İş Takip Sayfası
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TaskColumn
            status="todo"
            boardtitle="Yapılacak"
            addButton
            onAddClick={() => setOpenAdd(true)}
          />
          <TaskColumn boardtitle="Yapım Aşamasında" status="inprogress" />
          <TaskColumn boardtitle="Yapıldı" status="done" />
        </Box>
        <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 2,
              borderRadius: 2,
              minWidth: 800,
              outline: "none",
            }}
          >
            <IconButton
              size="small"
              onClick={() => setOpenAdd(false)}
              aria-label="close"
              sx={{ position: "absolute", top: 2, right: 2 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4">{"İş Kayıt"}</Typography>
            </Box>

            <AddTodo onSuccess={() => setOpenAdd(false)} />
          </Box>
        </Modal>
      </Box>
      <DragOverlay>
  {activeTask ? (
    <Box
      sx={{
        pointerEvents: "none",
        p: 1,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 3,
        minWidth: 250,
      }}
    >
      <Typography fontWeight={700}>{`İş: ${activeTask.taskType}`}</Typography>
      <Typography variant="body2">{`Müşteri: ${activeTask.customerName}`}</Typography>
      <Typography variant="body2">
            {`Adres: ${activeTask.address.city}/${activeTask.address.district} ${activeTask.address.quarter} mah. ${activeTask.address.detail}`}
          </Typography>
          <Typography variant="body2">
            {`Yapılacak İşlem: ${activeTask.work}`}
          </Typography>
          <Typography variant="body2">
            {`Servis Ücreti: ${activeTask.price} ₺`}
          </Typography>
    </Box>
  ) : null}
</DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
