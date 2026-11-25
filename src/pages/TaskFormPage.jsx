import { useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

export default function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useTasks();

  const taskToEdit = id ? tasks.find((task) => task.id === id) : null;

  const handleSubmit = (formData) => {
    if (taskToEdit) {
      updateTask({ ...formData, id: taskToEdit.id });
    } else {
      addTask(formData);
    }
    navigate("/");
  };

  return (
    <Box maxW="720px" mx="auto" px={{ base: 4, md: 8 }} py={8}>
      <Heading size="lg" color="gray.800" mb={1}>
        {taskToEdit ? "Editar Tarea" : "Crear Nueva Tarea"}
      </Heading>
      <Text color="gray.600" fontSize="sm" mb={6}>
        {taskToEdit
          ? "Modifica los datos de tu tarea y guarda los cambios."
          : "Completa los campos para añadir una tarea a tu lista."}
      </Text>

      <TaskForm
        initialTask={taskToEdit}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </Box>
  );
}