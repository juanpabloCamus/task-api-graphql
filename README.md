# Desafío de Implementación de API GraphQL para Gestión de Tareas

## Descripción del Desafío

Este desafío tiene como objetivo evaluar la capacidad para diseñar e implementar una API GraphQL simple para gestionar una lista de tareas (to-do list). La API debe permitir realizar las siguientes operaciones:

1. **Crear una tarea**: Añadir una nueva tarea a la lista.
2. **Leer tareas**: Obtener la lista de tareas.
3. **Actualizar una tarea**: Modificar el estado o el contenido de una tarea existente.
4. **Eliminar una tarea**: Eliminar una tarea de la lista.

## Instalación

1. Clona este repositorio:

   ```sh
   git clone https://github.com/tu-usuario/task-api-graphql.git
   cd task-api-graphql
   ```

2. Instala las dependencias en la raíz del repositorio:
   ```sh
   npm install
   ```

## Iniciar el servidor

Para iniciar el servidor, ejecuta el siguiente comando:

```sh
npm start
```

El servidor se iniciará en el puerto especificado en /src/index.js por defecto es el 4000.

## Tests

Para ejecutar las pruebas unitarias ejecuta el siguiente comando:

```sh
npm test
```

## Ejemplos de Uso

Para probar los ejemplos puedes usar el sandbox de Apollo en `localhost:PORT/graphql`:

### Obtener Tareas

```
query {
  tasks {
    id
    title
    description
    completed
  }
}
```

### Crear una Tarea

```
mutation {
  createTask(title: "Comprar leche", description: "Ir al supermercado a comprar leche") {
    id
    title
    description
    completed
  }
}
```

### Actualizar una Tarea

```
mutation {
  updateTask(id: 1, title: "Comprar pan", description: "Ir al supermercado a comprar pan", completed: true) {
    id
    title
    description
    completed
  }
}
```

### Eliminar una Tarea

```
mutation {
  deleteTask(id: 1) {
    id
    title
    description
    completed
  }
}
```
