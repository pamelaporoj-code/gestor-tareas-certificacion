import { useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Input,
  Button,
  SimpleGrid,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useTasks } from "../context/TaskContext";

const STATUS_LABELS = {
  "por-hacer": "Por hacer",
  "en-progreso": "En progreso",
  completada: "Completada",
};

const STATUS_COLORS = {
  "por-hacer": "orange",
  "en-progreso": "blue",
  completada: "green",
};

export default function CalendarPage() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState("");

  const groupedByDate = useMemo(() => {
    const visibleTasks = selectedDate
      ? tasks.filter((task) => task.fecha === selectedDate)
      : tasks;

    const sorted = [...visibleTasks].sort((a, b) =>
      a.fecha.localeCompare(b.fecha)
    );

    return sorted.reduce((acc, task) => {
      if (!acc[task.fecha]) {
        acc[task.fecha] = [];
      }
      acc[task.fecha].push(task);
      return acc;
    }, {});
  }, [tasks, selectedDate]);

  const dates = Object.keys(groupedByDate);

  return (
    <Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }} py={8}>
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={6}
      >
        <Box>
          <Heading size="lg" color="gray.800">
            Vista de Calendario
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Consulta tus tareas organizadas por fecha programada.
          </Text>
        </Box>

        <HStack spacing={2} wrap="wrap">
          <Input
            aria-label="Filtrar por fecha"
            type="date"
            bg="white"
            w="auto"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedDate("")}
            >
              Ver todas las fechas
            </Button>
          )}
        </HStack>
      </Flex>

      {dates.length === 0 ? (
        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          textAlign="center"
        >
          <Text color="gray.600">
            No hay tareas programadas para la fecha seleccionada.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {dates.map((date) => (
            <Box
              key={date}
              bg="white"
              p={5}
              borderRadius="lg"
              boxShadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Heading size="sm" color="purple.700" mb={3}>
                Fecha: {date}
              </Heading>

              <VStack spacing={3} align="stretch">
                {groupedByDate[date].map((task) => (
                  <Box
                    key={task.id}
                    p={3}
                    borderRadius="md"
                    bg="gray.50"
                    borderWidth="1px"
                    borderColor="gray.100"
                  >
                    <Flex justify="space-between" align="start" gap={2} mb={1}>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.800">
                        {task.titulo}
                      </Text>
                      <Badge
                        fontSize="0.7em"
                        colorScheme={STATUS_COLORS[task.estado] || "gray"}
                      >
                        {STATUS_LABELS[task.estado] || task.estado}
                      </Badge>
                    </Flex>
                    <Button
                      as={RouterLink}
                      to={`/editar/${task.id}`}
                      size="xs"
                      variant="link"
                      colorScheme="purple"
                    >
                      Editar tarea
                    </Button>
                  </Box>
                ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}