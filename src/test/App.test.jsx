import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "../App";

function renderApp() {
  window.history.pushState({}, "", "/");
  return render(
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  );
}

describe("Aplicación de Gestión de Tareas", () => {
  test("renderiza la vista principal y las tareas iniciales", () => {
    renderApp();
    expect(screen.getByText(/Mis Tareas/i)).toBeInTheDocument();
    expect(
      screen.getByText("Diseñar arquitectura de componentes")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Implementar vistas y formularios")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ejecutar pruebas unitarias con Jest")
    ).toBeInTheDocument();
  });

  test("filtra tareas por estado", () => {
    renderApp();

    fireEvent.click(screen.getByRole("button", { name: /^Completadas$/i }));
    expect(
      screen.getByText("Diseñar arquitectura de componentes")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Ejecutar pruebas unitarias con Jest")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Todas$/i }));
    expect(
      screen.getByText("Ejecutar pruebas unitarias con Jest")
    ).toBeInTheDocument();
  });

  test("crea una nueva tarea desde el formulario y la muestra en la lista", () => {
    renderApp();

    const newTaskLinks = screen.getAllByRole("link", { name: /\+ Nueva Tarea/i });
    fireEvent.click(newTaskLinks[0]);
    expect(screen.getByText(/Crear Nueva Tarea/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Título de la tarea/i), {
      target: { value: "Practicar exposición en vivo" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Repasar flujo de datos y pruebas" },
    });
    fireEvent.change(screen.getByLabelText(/Fecha límite/i), {
      target: { value: "2026-11-29" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Crear tarea/i }));

    expect(screen.getByText("Practicar exposición en vivo")).toBeInTheDocument();
  });

  test("navega a la vista de calendario", () => {
    renderApp();

    fireEvent.click(screen.getByRole("link", { name: /Calendario/i }));
    expect(screen.getByText(/Vista de Calendario/i)).toBeInTheDocument();
  });

  test("elimina una tarea existente", () => {
    renderApp();

    const deleteButtons = screen.getAllByRole("button", { name: /Eliminar/i });
    fireEvent.click(deleteButtons[0]);

    expect(
      screen.queryByText("Diseñar arquitectura de componentes")
    ).not.toBeInTheDocument();
  });
});