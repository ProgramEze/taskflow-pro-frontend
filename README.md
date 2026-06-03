# TaskFlow Pro — Frontend

Frontend web para gestión colaborativa de proyectos y tareas con Angular 17, TailwindCSS y conexión a la API REST de TaskFlow Pro.

> **API REST (backend):** [taskflow-pro-api](https://github.com/ProgramEze/taskflow-pro-api)

---

## Demo en producción

La aplicación está desplegada en Railway:

```text
https://taskflow-pro-frontend-production.up.railway.app
```

---

## Tecnologías utilizadas

- Angular 17 (standalone components, signals)
- TailwindCSS 3
- Angular Router con lazy loading
- Angular HttpClient con JWT interceptor
- TypeScript strict mode
- Docker + nginx (deploy)
- Railway (CI/CD automático)

---

## Arquitectura del proyecto

```text
src/
├── app/
│   ├── core/
│   │   ├── guards/         → auth.guard (protege rutas privadas)
│   │   ├── interceptors/   → jwt.interceptor (inyecta Bearer token)
│   │   ├── models/         → interfaces TypeScript por entidad
│   │   └── services/       → auth, workspace, member, project, task, comment
│   ├── features/
│   │   ├── auth/           → login, register
│   │   ├── workspaces/     → lista, detalle (proyectos + miembros)
│   │   ├── projects/       → detalle (tareas con filtros y paginación)
│   │   └── tasks/          → detalle (cambio de estado/prioridad, asignación, comentarios)
│   └── shared/
│       └── components/     → navbar, spinner, empty-state, status-badge, priority-badge
└── environments/
    ├── environment.ts       → localhost:5052 (desarrollo)
    └── environment.prod.ts  → Railway URL (producción)
```

---

## Funcionalidades

- Registro e inicio de sesión con JWT
- Gestión de workspaces (crear, listar)
- Gestión de proyectos por workspace (crear, listar)
- Gestión de miembros por workspace (agregar por email, ver roles)
- Gestión de tareas por proyecto (crear, listar, filtrar, paginar)
- Filtros de tareas por estado, prioridad y búsqueda por texto
- Detalle de tarea con cambio de estado y prioridad
- Autoasignación de tareas
- Comentarios en tareas (crear, editar, eliminar)
- Guard de autenticación en todas las rutas privadas
- Interceptor JWT automático en todos los requests

---

## Ejecutar localmente

Requisitos: Node 20+, Angular CLI 17+

```bash
npm install
npm start
```

La app estará disponible en `http://localhost:4200` y conectará contra la API en `localhost:5052`.

Para conectar contra la API de producción en Railway, modificá `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://taskflow-pro-api-production.up.railway.app'
};
```

---

## Build de producción

```bash
npm run build:prod
```

El output queda en `dist/taskflow-pro-frontend/browser/`.

---

## Deploy

La aplicación se sirve con nginx dentro de un contenedor Docker.

### Dockerfile

Build multistage: Node 20 compila el proyecto Angular, nginx sirve el build estático. El archivo `nginx.conf` incluye la regla `try_files` para que el routing de Angular funcione correctamente.

### Railway

Cada push a `main` dispara un redeploy automático. El servicio apunta a este repositorio y usa el `Dockerfile` en la raíz.

**Variable de entorno requerida en Railway:** ninguna adicional — la `apiUrl` de producción está embebida en el build vía `environment.prod.ts`.

---

## Rutas

| Ruta | Descripción |
|---|---|
| `/login` | Inicio de sesión |
| `/register` | Registro de usuario |
| `/workspaces` | Lista de workspaces |
| `/workspaces/:id` | Detalle de workspace (proyectos + miembros) |
| `/workspaces/:id/projects/:id` | Detalle de proyecto (tareas) |
| `/tasks/:id` | Detalle de tarea (comentarios, asignación) |
