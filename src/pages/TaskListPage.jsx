import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { useTasks } from "../context/TaskContext";

const STATUS_LABELS = {
  "por-hacer": "Por hacer",
  "en-progreso": "En progreso",
  completada: "Completada",
};

const STATUS_STYLES = {
  "por-hacer": { bg: "#fff7ed", color: "#9c4221", border: "#fbd38d" },
  "en-progreso": { bg: "#f5efff", color: "#6b46c1", border: "#d6bcfa" },
  completada: { bg: "#f0fff4", color: "#2f855a", border: "#9ae6b4" },
};

function getDaysUntil(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
  const diffMs = targetDate - startOfToday;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function getSoonLabel(daysUntil, estado) {
  if (estado === "completada" || daysUntil === null) return null;
  if (daysUntil < 0) return "¡Ya venció!";
  if (daysUntil === 0) return "¡Vence hoy!";
  if (daysUntil === 1) return "¡Vence mañana!";
  if (daysUntil <= 3) return `Vence en ${daysUntil} días`;
  return null;
}

export default function TaskListPage() {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [filterStatus, setFilterStatus] = useState("todas");
  const [sortOrder, setSortOrder] = useState("asc");

  const completedCount = tasks.filter((t) => t.estado === "completada").length;
  const totalCount = tasks.length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const dueSoonTasks = useMemo(() => {
    return tasks
      .map((task) => ({
        ...task,
        daysUntil: getDaysUntil(task.fecha),
      }))
      .filter(
        (task) =>
          task.estado !== "completada" &&
          task.daysUntil !== null &&
          task.daysUntil <= 3
      )
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const filtered =
      filterStatus === "todas"
        ? [...tasks]
        : tasks.filter((t) => t.estado === filterStatus);

    filtered.sort((a, b) => {
      const dateA = a.fecha || "";
      const dateB = b.fecha || "";
      if (dateA === dateB) return 0;
      if (sortOrder === "asc") {
        return dateA.localeCompare(dateB);
      }
      return dateB.localeCompare(dateA);
    });

    return filtered;
  }, [tasks, filterStatus, sortOrder]);

  return (
    <Box maxW="1100px" mx="auto" p={{ base: 4, md: 7 }}>
      {/* Encabezado */}
      <Flex
        justify="space-between"
        align={{ base: "stretch", sm: "center" }}
        direction={{ base: "column", sm: "row" }}
        gap={4}
        mb={6}
      >
        <Box>
          <Heading size="xl" color="#3f2e52" fontFamily="Georgia, serif">
            Mis Tareas
          </Heading>
          <Text fontSize="sm" color="#7d6894" mt={1}>
            Mostrando {visibleTasks.length} de {totalCount} tareas · Avanza con calma cada día
          </Text>
        </Box>

        <Button
          as={RouterLink}
          to="/nueva"
          bg="#b794f4"
          color="#241636"
          fontWeight="bold"
          borderRadius="xl"
          px={5}
          _hover={{ bg: "#a37cf0" }}
        >
          + Nueva Tarea
        </Button>
      </Flex>

      {/* Tarjetas superiores: Progreso + Nota del día con tulipán */}
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={5}
        mb={6}
      >
        <Flex
          flex="1"
          justify="space-between"
          align="center"
          gap={4}
          bg="#fffdf9"
          borderRadius="2xl"
          p={5}
          borderWidth="1px"
          borderColor="#e5d6f3"
          boxShadow="xs"
        >
          <Box>
            <Text
              fontSize="11px"
              fontWeight="bold"
              color="#8e77a6"
              letterSpacing="wider"
              mb={1}
            >
              PROGRESO DE HOY
            </Text>
            <Heading size="lg" color="#3f2e52">
              {progressPercent}% Completado
            </Heading>
            <Text fontSize="xs" color="#86719c" mt={1}>
              {completedCount} de {totalCount} tareas listas
            </Text>
          </Box>

          {/* Anillo de progreso dinámico */}
          <Flex
            w="76px"
            h="76px"
            borderRadius="full"
            align="center"
            justify="center"
            flexShrink={0}
            style={{
              background: `conic-gradient(#9f7aea ${progressPercent * 3.6}deg, #ede3fa ${progressPercent * 3.6}deg 360deg)`,
            }}
          >
            <Flex
              w="58px"
              h="58px"
              borderRadius="full"
              bg="#fffdf9"
              align="center"
              justify="center"
              boxShadow="inset 0 0 0 1px #efe6fb"
            >
              <Text fontSize="xs" fontWeight="bold" color="#553c9a">
                {progressPercent}%
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          flex="1"
          justify="space-between"
          align="center"
          gap={4}
          bg="#fffdf9"
          borderRadius="2xl"
          p={5}
          borderWidth="1px"
          borderColor="#e5d6f3"
          boxShadow="xs"
        >
          <Box flex="1" minW={0}>
            <Text
              fontSize="11px"
              fontWeight="bold"
              color="#b5658d"
              letterSpacing="wider"
              mb={1.5}
            >
              NOTA DEL DÍA
            </Text>
            <Text
              fontStyle="italic"
              color="#5a4b6b"
              fontSize="sm"
              lineHeight="tall"
            >
              “Un día todo tu esfuerzo valdrá la pena. Avanza con calma y constancia.”
            </Text>
          </Box>

          <Flex
            w="78px"
            h="78px"
            flexShrink={0}
            bg="#fce8f1"
            borderRadius="2xl"
            align="center"
            justify="center"
            borderWidth="1px"
            borderColor="#f5cfe0"
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Tulipán decorativo"
            >
              <circle cx="11" cy="13" r="1.8" fill="#e6a8c7" />
              <circle cx="38" cy="15" r="1.6" fill="#c7a4e8" />
              <circle cx="36" cy="27" r="1.4" fill="#f2b880" />

              <path
                d="M24 26V40"
                stroke="#78a68a"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M24 34C19.5 33.5 16.5 30.5 16.5 27.5C19.8 27.5 22.8 30 24 34Z"
                fill="#95c4a7"
              />
              <path
                d="M24 36C28.5 35.5 31.5 32.5 31.5 29.5C28.2 29.5 25.2 32 24 36Z"
                fill="#7eb393"
              />

              <path
                d="M15 17C15 12.5 18.2 9.5 20.5 9.5C22.2 9.5 23.5 11.5 24 14V26.5H19.5C16.8 26.5 15 22.5 15 17Z"
                fill="#f7b7d2"
              />
              <path
                d="M33 17C33 12.5 29.8 9.5 27.5 9.5C25.8 9.5 24.5 11.5 24 14V26.5H28.5C31.2 26.5 33 22.5 33 17Z"
                fill="#e3b6f2"
              />

              <path
                d="M19 15.5C20.5 10.5 22.5 8 24 8C25.5 8 27.5 10.5 29 15.5C30 19 28.5 26.5 24 26.5C19.5 26.5 18 19 19 15.5Z"
                fill="#f99ec4"
              />

              <path
                d="M24 12.5V22.5"
                stroke="#fff5f9"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>
          </Flex>
        </Flex>
      </Flex>

      {/* Aviso directo de tareas que vencen pronto */}
      {dueSoonTasks.length > 0 && (
        <Box
          bg="#fff7ed"
          borderRadius="2xl"
          p={4}
          mb={6}
          borderWidth="1px"
          borderColor="#fbd38d"
          boxShadow="xs"
        >
          <Text fontSize="sm" fontWeight="bold" color="#9c4221" mb={2}>
            Tienes {dueSoonTasks.length}{" "}
            {dueSoonTasks.length === 1
              ? "tarea que vence pronto:"
              : "tareas que vencen pronto:"}
          </Text>
          <VStack align="stretch" gap={2}>
            {dueSoonTasks.map((task) => {
              const soonText = getSoonLabel(task.daysUntil, task.estado);
              return (
                <Flex
                  key={task.id}
                  justify="space-between"
                  align={{ base: "flex-start", sm: "center" }}
                  direction={{ base: "column", sm: "row" }}
                  gap={2}
                  bg="#fffdf9"
                  px={3.5}
                  py={2.5}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="#feebc8"
                >
                  <Box>
                    <HStack gap={2} wrap="wrap">
                      <Text fontSize="sm" fontWeight="bold" color="#3f2e52">
                        {task.titulo}
                      </Text>
                      {soonText && (
                        <Badge
                          bg="#fed7aa"
                          color="#9c4221"
                          borderRadius="full"
                          px={2.5}
                          fontSize="11px"
                        >
                          {soonText}
                        </Badge>
                      )}
                    </HStack>
                    {task.recordatorio && (
                      <Text fontSize="xs" color="#6b46c1" mt={0.5}>
                        Recordatorio: {task.recordatorio}
                      </Text>
                    )}
                  </Box>
                  <Text fontSize="xs" color="#7c4a1d" fontWeight="medium" flexShrink={0}>
                    Fecha: {task.fecha}
                  </Text>
                </Flex>
              );
            })}
          </VStack>
        </Box>
      )}

      {/* Filtros y orden */}
      <Flex
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={3}
        mb={5}
      >
        <HStack wrap="wrap" gap={2}>
          {[
            { key: "todas", label: "Todas" },
            { key: "por-hacer", label: "Por hacer" },
            { key: "en-progreso", label: "En progreso" },
            { key: "completada", label: "Completadas" },
          ].map((item) => {
            const active = filterStatus === item.key;
            return (
              <Button
                key={item.key}
                size="sm"
                borderRadius="full"
                onClick={() => setFilterStatus(item.key)}
                bg={active ? "#b794f4" : "#fffdf9"}
                color={active ? "#241636" : "#5a4b6b"}
                borderWidth="1px"
                borderColor={active ? "#b794f4" : "#e5d6f3"}
                _hover={{ bg: active ? "#a37cf0" : "#f5ecfc" }}
              >
                {item.label}
              </Button>
            );
          })}
        </HStack>

        <HStack gap={2}>
          <Text fontSize="xs" color="#7d6894" fontWeight="medium">
            Ordenar por fecha:
          </Text>
          <select
            aria-label="Ordenar por fecha"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              backgroundColor: "#fffdf9",
              color: "#47345c",
              border: "1px solid #e5d6f3",
              borderRadius: "12px",
              padding: "6px 12px",
              fontSize: "13px",
            }}
          >
            <option value="asc">Más próximas primero</option>
            <option value="desc">Más lejanas primero</option>
          </select>
        </HStack>
      </Flex>

      {/* Listado de tareas */}
      <VStack align="stretch" gap={4}>
        {visibleTasks.length === 0 ? (
          <Box
            bg="#fffdf9"
            borderRadius="2xl"
            p={8}
            textAlign="center"
            borderWidth="1px"
            borderColor="#e5d6f3"
          >
            <Text color="#7d6894" fontSize="sm">
              No hay tareas en este filtro por ahora.
            </Text>
          </Box>
        ) : (
          visibleTasks.map((task) => {
            const style = STATUS_STYLES[task.estado] || STATUS_STYLES["por-hacer"];
            const soonText = getSoonLabel(getDaysUntil(task.fecha), task.estado);

            return (
              <Flex
                key={task.id}
                justify="space-between"
                align={{ base: "stretch", md: "center" }}
                direction={{ base: "column", md: "row" }}
                gap={4}
                bg="#fffdf9"
                borderRadius="2xl"
                p={5}
                borderWidth="1px"
                borderColor="#e5d6f3"
                borderLeftWidth="5px"
                borderLeftColor={style.border}
                boxShadow="xs"
              >
                <Box flex="1" minW={0}>
                  <Heading size="md" color="#3f2e52">
                    {task.titulo}
                  </Heading>

                  <HStack mt={2} gap={2} wrap="wrap">
                    <Badge
                      px={2.5}
                      py={0.5}
                      borderRadius="full"
                      bg={style.bg}
                      color={style.color}
                      fontSize="xs"
                    >
                      {STATUS_LABELS[task.estado] || "Por hacer"}
                    </Badge>

                    {soonText && (
                      <Badge
                        px={2.5}
                        py={0.5}
                        borderRadius="full"
                        bg="#fed7aa"
                        color="#9c4221"
                        fontSize="xs"
                      >
                        {soonText}
                      </Badge>
                    )}
                  </HStack>

                  {task.descripcion && (
                    <Text fontSize="sm" color="#6b5880" mt={2}>
                      {task.descripcion}
                    </Text>
                  )}

                  {task.recordatorio && (
                    <Text fontSize="xs" color="#6b46c1" fontWeight="medium" mt={2}>
                      Recordatorio: {task.recordatorio}
                    </Text>
                  )}

                  {task.fecha && (
                    <Text fontSize="xs" color="#8e77a6" mt={2}>
                      Fecha: {task.fecha}
                    </Text>
                  )}
                </Box>

                <HStack gap={2} flexShrink={0} wrap="wrap">
                  <select
                    aria-label={`Estado de ${task.titulo}`}
                    value={task.estado}
                    onChange={(e) =>
                      updateTask({ ...task, estado: e.target.value })
                    }
                    style={{
                      backgroundColor: "#fffdf9",
                      color: "#47345c",
                      border: "1px solid #e5d6f3",
                      borderRadius: "10px",
                      padding: "6px 10px",
                      fontSize: "13px",
                    }}
                  >
                    <option value="por-hacer">Por hacer</option>
                    <option value="en-progreso">En progreso</option>
                    <option value="completada">Completada</option>
                  </select>

                  <Button
                    as={RouterLink}
                    to={`/editar/${task.id}`}
                    size="sm"
                    variant="outline"
                    borderColor="#d6bcfa"
                    color="#553c9a"
                    borderRadius="xl"
                  >
                    Editar
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    color="#c53030"
                    borderRadius="xl"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </Button>
                </HStack>
              </Flex>
            );
          })
        )}
      </VStack>
    </Box>
  );
}