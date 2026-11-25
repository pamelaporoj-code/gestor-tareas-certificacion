import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  titulo: "",
  descripcion: "",
  fecha: "2026-11-26",
  estado: "por-hacer",
};

export default function TaskForm({ initialTask = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialTask || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialTask || EMPTY_FORM);
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
    if (!formData.titulo.trim()) {
      nextErrors.titulo = "El título es obligatorio.";
    }
    if (!formData.fecha) {
      nextErrors.fecha = "La fecha es obligatoria.";
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
          <Text as="label" htmlFor="descripcion" display="block" fontWeight="medium" mb={1}>
            Descripción
          </Text>
          <Box
            as="textarea"
            id="descripcion"
            name="descripcion"
            rows={3}
            w="100%"
            px={3}
            py={2}
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.300"
            placeholder="Detalles o pasos clave de la tarea..."
            value={formData.descripcion}
            onChange={handleChange}
          />
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