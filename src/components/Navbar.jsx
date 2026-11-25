import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Flex, Heading, Button, HStack, Text } from "@chakra-ui/react";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <Box
      as="nav"
      bg="#efe7f5"
      borderBottomWidth="1px"
      borderBottomColor="#dfd0ec"
      color="#3f334d"
      px={{ base: 4, md: 8 }}
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="xs"
    >
      <Flex
        maxW="1100px"
        mx="auto"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={3}
      >
        <HStack gap={3} align="center">
          <Box
            w="42px"
            h="42px"
            borderRadius="xl"
            bg="#fffdf9"
            borderWidth="1px"
            borderColor="#dfd0ec"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21C12 21 6 16.5 6 11C6 7.5 8.5 5 12 5C15.5 5 18 7.5 18 11C18 16.5 12 21 12 21Z"
                fill="#e9d5ff"
                stroke="#8b5cf6"
                strokeWidth="1.6"
              />
              <path
                d="M12 11L9.5 7.5M12 11L14.5 7.5M12 11V17"
                stroke="#7c3aed"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </Box>
          <Box>
            <Heading size="md" color="#3b2d4a" letterSpacing="tight">
              TaskFlow · Gestor de Tareas
            </Heading>
            <Text fontSize="xs" color="#7c6990">
              Study & Task Planner · Pastel Edition
            </Text>
          </Box>
        </HStack>

        <HStack gap={2} wrap="wrap">
          <Button
            as={RouterLink}
            to="/"
            size="sm"
            borderRadius="full"
            px={4}
            variant={pathname === "/" ? "solid" : "outline"}
            colorPalette="purple"
            bg={pathname === "/" ? "#8b5cf6" : "#fffdf9"}
            color={pathname === "/" ? "white" : "#5b4673"}
            borderColor="#d5c1ea"
            transition="all 0.2s"
            _hover={{
              bg: pathname === "/" ? "#7c3aed" : "#f5ecfc",
              transform: "translateY(-1px)",
            }}
          >
            Lista de Tareas
          </Button>

          <Button
            as={RouterLink}
            to="/calendario"
            size="sm"
            borderRadius="full"
            px={4}
            variant={pathname === "/calendario" ? "solid" : "outline"}
            colorPalette="purple"
            bg={pathname === "/calendario" ? "#8b5cf6" : "#fffdf9"}
            color={pathname === "/calendario" ? "white" : "#5b4673"}
            borderColor="#d5c1ea"
            transition="all 0.2s"
            _hover={{
              bg: pathname === "/calendario" ? "#7c3aed" : "#f5ecfc",
              transform: "translateY(-1px)",
            }}
          >
            Calendario
          </Button>

          <Button
            as={RouterLink}
            to="/nueva"
            size="sm"
            borderRadius="full"
            px={4}
            bg="#f3d5e6"
            color="#4a253d"
            borderWidth="1px"
            borderColor="#e5b8d2"
            fontWeight="semibold"
            transition="all 0.2s"
            _hover={{
              bg: "#ecc2da",
              transform: "translateY(-1px)",
            }}
          >
            + Nueva Tarea
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}