import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";

const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EMPTY_FORM = {
  titulo: "",
  descripcion: "",
  fecha: getTodayString(),
  estado: "por-hacer",
  recordatorio: "",
};

export default function TaskForm({ initialTask = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    ...EMPTY_FORM,
    ...(initialTask || {}),
    recordatorio: initialTask?.recordatorio || "",
  });
  const [errors, setErrors] = useState({});
  const today = getTodayString();

  useEffect(() => {
    setFormData({
      ...EMPTY_FORM,
      fecha: getTodayString(),
      ...(initialTask || {}),
      recordatorio: initialTask?.recordatorio || "",
    });
    setErrors({});
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const currentToday = getTodayString();

    if (!formData.titulo.trim()) {
      nextErrors.titulo = "El título es obligatorio.";
    }

    if (formData.descripcion.length > 150) {
      nextErrors.descripcion = "La descripción no puede superar los 150 caracteres.";
    }

    if (formData.recordatorio.length > 100) {
      nextErrors.recordatorio = "El recordatorio no puede superar los 100 caracteres.";
    }

    if (!formData.fecha) {
      nextErrors.fecha = "La fecha es obligatoria.";
    } else if (formData.fecha < currentToday) {
      nextErrors.fecha = "No puedes guardar una tarea con una fecha pasada.";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      recordatorio: formData.recordatorio.trim(),
    });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
      noValidate
    >
      <VStack gap={4} align="stretch">
        <Box>
          <Text as="label" htmlFor="titulo" display="block" fontWeight="medium" mb={1}>
            Título de la tarea *
          </Text>
          <Box
            as="input"
            id="titulo"
            name="titulo"
            w="100%"
            px={3}
            py={2}
            borderRadius="md"
            borderWidth="1px"
            borderColor={errors.titulo ? "red.500" : "gray.300"}
            placeholder="Ej. Preparar presentación de certificación"
            value={formData.titulo}
            onChange={handleChange}
          />
          {errors.titulo && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {errors.titulo}
            </Text>
          )}
        </Box>

        <Box>
          <Flex justify="space-between" align="center" mb={1}>
            <Text as="label" htmlFor="descripcion" fontWeight="medium">
              Descripción
            </Text>
            <Text
              fontSize="xs"
              color={formData.descripcion.length >= 150 ? "red.500" : "gray.500"}
            >
              {formData.descripcion.length}/150
            </Text>
          </Flex>
          <Box
            as="textarea"
            id="descripcion"
            name="descripcion"
            rows={3}
            maxLength={150}
            w="100%"
            px={3}
            py={2}
            borderRadius="md"
            borderWidth="1px"
            borderColor={errors.descripcion ? "red.500" : "gray.300"}
            placeholder="Detalles o pasos clave de la tarea..."
            value={formData.descripcion}
            onChange={handleChange}
          />
          {errors.descripcion && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {errors.descripcion}
            </Text>
          )}
        </Box>

        <HStack gap={4} direction={{ base: "column", sm: "row" }} align="flex-start">
          <Box flex="1" w="100%">
            <Text as="label" htmlFor="fecha" display="block" fontWeight="medium" mb={1}>
              Fecha límite *
            </Text>
            <Box
              as="input"
              id="fecha"
              name="fecha"
              type="date"
              min={today}
              w="100%"
              px={3}
              py={2}
              borderRadius="md"
              borderWidth="1px"
              borderColor={errors.fecha ? "red.500" : "gray.300"}
              value={formData.fecha}
              onChange={handleChange}
            />
            {errors.fecha && (
              <Text color="red.500" fontSize="xs" mt={1}>
                {errors.fecha}
              </Text>
            )}
          </Box>

          <Box flex="1" w="100%">
            <Text as="label" htmlFor="estado" display="block" fontWeight="medium" mb={1}>
              Estado
            </Text>
            <Box
              as="select"
              id="estado"
              name="estado"
              w="100%"
              px={3}
              py={2}
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.300"
              bg="white"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="por-hacer">Por hacer</option>
              <option value="en-progreso">En progreso</option>
              <option value="completada">Completada</option>
            </Box>
          </Box>
        </HStack>

        <Box>
          <Text as="label" htmlFor="recordatorio" display="block" fontWeight="medium" mb={1}>
            Recordatorio (opcional)
          </Text>
          <Box
            as="input"
            id="recordatorio"
            name="recordatorio"
            w="100%"
            px={3}
            py={2}
            borderRadius="md"
            borderWidth="1px"
            borderColor={errors.recordatorio ? "red.500" : "gray.300"}
            placeholder="Ej. Repasar puntos clave 20 minutos antes"
            value={formData.recordatorio}
            onChange={handleChange}
          />
          {errors.recordatorio && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {errors.recordatorio}
            </Text>
          )}
        </Box>

        <HStack justify="flex-end" pt={2} gap={3}>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button type="submit" colorPalette="purple">
            {initialTask ? "Guardar cambios" : "Crear tarea"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}