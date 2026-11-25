import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";

const STATUS_LABELS = {
  "por-hacer": "Por hacer",
  "en-progreso": "En progreso",
  completada: "Completada",
};

const STATUS_COLORS = {
  "por-hacer": "orange",
  "en-progreso": "purple",
  completada: "green",
};

const STATUS_BORDER = {
  "por-hacer": "#f6ad55",
  "en-progreso": "#b794f4",
  completada: "#68d391",
};

export default function TaskList({ tasks, onStatusChange, onDelete }) {
  if (tasks.length === 0) {
    return (
      <Box
        bg="#fffdf9"
        p={10}
        borderRadius="2xl"
        boxShadow="xs"
        borderWidth="1px"
        borderColor="#eadcf5"
        textAlign="center"
      >
        <Text color="#736087" fontSize="md" fontWeight="medium">
          No hay tareas que coincidan con el filtro seleccionado.
        </Text>
      </Box>
    );
  }

  return (
    <VStack gap={4} align="stretch">
      {tasks.map((task) => (
        <Box
          key={task.id}
          bg="#fffdf9"
          p={5}
          borderRadius="2xl"
          boxShadow="xs"
          borderWidth="1px"
          borderColor="#eadcf5"
          borderLeftWidth="6px"
          borderLeftColor={STATUS_BORDER[task.estado] || "#c4a7e7"}
          transition="all 0.2s ease"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "md",
            borderColor: "#d7c0eb",
          }}
        >
          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={4}
          >
            <HStack gap={3.5} align="flex-start" flex="1">
              <Box
                w="36px"
                h="36px"
                borderRadius="xl"
                bg="#f5ecfc"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                mt={0.5}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {task.estado === "completada" ? (
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="#38a169"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <circle
                      cx="12"
                      cy="12"
                      r="6"
                      stroke="#9f7aea"
                      strokeWidth="2.2"
                      fill="#ede9fe"
                    />
                  )}
                </svg>
              </Box>

              <Box flex="1">
                <HStack gap={2.5} mb={1} wrap="wrap">
                  <Text fontWeight="bold" fontSize="lg" color="#3c2d4a">
                    {task.titulo}
                  </Text>
                  <Badge
                    borderRadius="full"
                    px={3}
                    py={0.5}
                    colorPalette={STATUS_COLORS[task.estado] || "purple"}
                  >
                    {STATUS_LABELS[task.estado] || task.estado}
                  </Badge>
                </HStack>

                {task.descripcion && (
                  <Text color="#736087" fontSize="sm" mb={2} lineHeight="tall">
                    {task.descripcion}
                  </Text>
                )}

                <Text fontSize="xs" color="#8c73a6" fontWeight="medium">
                  Fecha: {task.fecha}
                </Text>
              </Box>
            </HStack>

            <HStack gap={2} wrap="wrap">
              <Box
                as="select"
                aria-label={`Cambiar estado de ${task.titulo}`}
                px={3}
                py={1.5}
                fontSize="sm"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="#dfd0ec"
                bg="#faf5f2"
                color="#3c2d4a"
                cursor="pointer"
                value={task.estado}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
              >
                <option value="por-hacer">Por hacer</option>
                <option value="en-progreso">En progreso</option>
                <option value="completada">Completada</option>
              </Box>

              <Button
                as={RouterLink}
                to={`/editar/${task.id}`}
                size="sm"
                borderRadius="xl"
                variant="outline"
                borderColor="#d5c1ea"
                color="#55426b"
                _hover={{ bg: "#f4ebfc" }}
              >
                Editar
              </Button>

              <Button
                size="sm"
                borderRadius="xl"
                colorPalette="red"
                variant="ghost"
                _hover={{ bg: "#fff0f3" }}
                onClick={() => onDelete(task.id)}
              >
                Eliminar
              </Button>
            </HStack>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
}