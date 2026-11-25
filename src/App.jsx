import { BrowserRouter, Routes, Route, Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Flex, Heading, VStack, Button, Text, HStack } from "@chakra-ui/react";
import { TaskProvider, useTasks } from "./context/TaskContext";
import imagesosImg from "./assets/imagesos.jpg";
import TaskListPage from "./pages/TaskListPage";
import TaskFormPage from "./pages/TaskFormPage";
import CalendarPage from "./pages/CalendarPage";

function PlannerSidebar() {
  const { pathname } = useLocation();
  const { tasks } = useTasks();

  const pendingCount = tasks.filter((t) => t.estado === "por-hacer").length;
  const progressCount = tasks.filter((t) => t.estado === "en-progreso").length;
  const doneCount = tasks.filter((t) => t.estado === "completada").length;

  return (
    <Box
      as="aside"
      w={{ base: "100%", lg: "275px" }}
      flexShrink={0}
      bg="#f2e9fa"
      borderRightWidth={{ base: 0, lg: "1px" }}
      borderBottomWidth={{ base: "1px", lg: 0 }}
      borderColor="#dfd0ec"
      p={5}
    >
      <VStack align="stretch" gap={4}>
        <Box
          bg="#fffdf9"
          borderRadius="2xl"
          p={4}
          borderWidth="1px"
          borderColor="#e5d6f3"
          textAlign="center"
          boxShadow="xs"
        >
          <Text fontSize="11px" color="#b06b94" fontWeight="semibold" letterSpacing="wide">
            ✿ MI ORGANIZADOR ✿
          </Text>
          <Heading size="md" color="#47345c" fontFamily="Georgia, serif" mt={0.5}>
            Agenda de Tareas
          </Heading>
          <Text fontSize="xs" color="#86719c" mt={0.5}>
            TaskFlow · React
          </Text>
        </Box>

        <Box
          bg="#fffdf9"
          borderRadius="2xl"
          p={3}
          borderWidth="1px"
          borderColor="#e5d6f3"
          boxShadow="xs"
        >
          <Text
            fontSize="11px"
            fontWeight="bold"
            color="#8e77a6"
            px={2}
            mb={2}
            letterSpacing="wider"
          >
            MENÚ PRINCIPAL
          </Text>
          <VStack align="stretch" gap={1.5}>
            <Button
              as={RouterLink}
              to="/"
              justifyContent="flex-start"
              borderRadius="xl"
              px={3.5}
              py={4}
              size="sm"
              variant={pathname === "/" ? "solid" : "ghost"}
              bg={pathname === "/" ? "#c4a7e7" : "transparent"}
              color={pathname === "/" ? "#2b1c3b" : "#4f3d63"}
              fontWeight={pathname === "/" ? "bold" : "medium"}
              _hover={{ bg: pathname === "/" ? "#b896e0" : "#f3e9fc" }}
            >
              Lista de Tareas
            </Button>

            <Button
              as={RouterLink}
              to="/calendario"
              justifyContent="flex-start"
              borderRadius="xl"
              px={3.5}
              py={4}
              size="sm"
              variant={pathname === "/calendario" ? "solid" : "ghost"}
              bg={pathname === "/calendario" ? "#c4a7e7" : "transparent"}
              color={pathname === "/calendario" ? "#2b1c3b" : "#4f3d63"}
              fontWeight={pathname === "/calendario" ? "bold" : "medium"}
              _hover={{ bg: pathname === "/calendario" ? "#b896e0" : "#f3e9fc" }}
            >
              Calendario
            </Button>

            <Button
              as={RouterLink}
              to="/nueva"
              justifyContent="flex-start"
              borderRadius="xl"
              px={3.5}
              py={4}
              size="sm"
              bg="#f8d8e8"
              color="#4d243b"
              borderWidth="1px"
              borderColor="#eab7d0"
              fontWeight="semibold"
              _hover={{ bg: "#f3c4dc" }}
            >
              + Nueva Tarea
            </Button>
          </VStack>
        </Box>

        <Box
          bg="#fffdf9"
          borderRadius="2xl"
          p={3.5}
          borderWidth="1px"
          borderColor="#e5d6f3"
          boxShadow="xs"
        >
          <Text
            fontSize="11px"
            fontWeight="bold"
            color="#8e77a6"
            mb={2.5}
            letterSpacing="wider"
          >
            RESUMEN DEL DÍA
          </Text>
          <VStack align="stretch" gap={2} fontSize="xs">
            <Flex justify="space-between" align="center" bg="#fff7ed" px={3} py={1.5} borderRadius="lg">
              <Text color="#7c4a1d" fontWeight="medium">Por hacer</Text>
              <Text fontWeight="bold" color="#9c4221">{pendingCount}</Text>
            </Flex>
            <Flex justify="space-between" align="center" bg="#f5efff" px={3} py={1.5} borderRadius="lg">
              <Text color="#553c9a" fontWeight="medium">En progreso</Text>
              <Text fontWeight="bold" color="#6b46c1">{progressCount}</Text>
            </Flex>
            <Flex justify="space-between" align="center" bg="#f0fff4" px={3} py={1.5} borderRadius="lg">
              <Text color="#22543d" fontWeight="medium">Completadas</Text>
              <Text fontWeight="bold" color="#2f855a">{doneCount}</Text>
            </Flex>
          </VStack>
        </Box>

        <Box
          bg="#fffdf9"
          borderRadius="2xl"
          p={3.5}
          borderWidth="1px"
          borderColor="#e5d6f3"
          boxShadow="xs"
          textAlign="center"
        >
          <Box
            borderRadius="xl"
            overflow="hidden"
            borderWidth="1px"
            borderColor="#eadcf5"
            mb={2.5}
          >
            <img
              src={imagesosImg}
              alt="Widget decorativo para el organizador"
              style={{
                width: "100%",
                height: "155px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
          <Text fontSize="xs" fontWeight="bold" color="#55406b">
            ✿ ¡Tú puedes con todo! ✿
          </Text>
          <Text fontSize="11px" color="#88739e" mt={0.5}>
            Un paso a la vez cada día
          </Text>
          <HStack justify="center" gap={1.5} mt={2}>
            <Box w="8px" h="8px" borderRadius="full" bg="#e9d5ff" />
            <Box w="8px" h="8px" borderRadius="full" bg="#fbcfe8" />
            <Box w="8px" h="8px" borderRadius="full" bg="#fde68a" />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Flex minH="100vh" direction={{ base: "column", lg: "row" }} bg="#faf5f2" color="#3f334d">
          <PlannerSidebar />
          <Box flex="1" minW={0}>
            <Routes>
              <Route path="/" element={<TaskListPage />} />
              <Route path="/nueva" element={<TaskFormPage />} />
              <Route path="/editar/:id" element={<TaskFormPage />} />
              <Route path="/calendario" element={<CalendarPage />} />
            </Routes>
          </Box>
        </Flex>
      </BrowserRouter>
    </TaskProvider>
  );
}