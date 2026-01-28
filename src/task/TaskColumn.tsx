import { Container, Paper, Stack, Typography, IconButton } from "@mui/material";
import TaskCard from "./TaskCard";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

type TaskColumnProps = {
  boardtitle: string;
  status: "todo" | "inprogress" | "done";
  addButton?: boolean;
  onAddClick?: () => void;
};
const TaskColumn = ({
  boardtitle,
  status,
  addButton,
  onAddClick,
}: TaskColumnProps) => {
  const tasks = useSelector((state: RootState) =>
    state.tasks.filter((t) => t.status === status)
  );
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Container ref={setNodeRef} maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        sx={{
          height: "auto",
          borderRadius: 3,
          minHeight: 700,
          p: 2,
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" fontWeight={700}>
            {boardtitle}
          </Typography>
          {addButton ? (
            <IconButton onClick={onAddClick}>
              <AddIcon
                fontSize="small"
                sx={{
                  background: "black",
                  color: "white",
                  borderRadius: "3px",
                }}
              />
            </IconButton>
          ) : null}
        </Stack>

         <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <Stack spacing={1.5}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Stack>
        </SortableContext>
      </Paper>
    </Container>
  );
};

export default TaskColumn;
