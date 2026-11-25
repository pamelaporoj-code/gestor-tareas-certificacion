export const initialTasks = [
  {
    id: "1",
    titulo: "Diseñar arquitectura de componentes",
    descripcion: "Definir estructura de carpetas, rutas y estado global con Context.",
    fecha: "2026-11-26",
    estado: "completada",
  },
  {
    id: "2",
    titulo: "Implementar vistas y formularios",
    descripcion: "Crear vista de listado con filtros, vista de calendario y formulario CRUD.",
    fecha: "2026-11-28",
    estado: "en-progreso",
  },
  {
    id: "3",
    titulo: "Ejecutar pruebas unitarias con Jest",
    descripcion: "Validar renderizado, creación, filtrado y eliminación de tareas.",
    fecha: "2026-11-30",
    estado: "por-hacer",
  },
];

export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "CHANGE_STATUS":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, estado: action.payload.estado }
          : task
      );

    default:
      return state;
  }
}