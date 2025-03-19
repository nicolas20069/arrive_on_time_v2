export const getAsideNavItems = (userData) => {
  return [
    {
      to: "/admin/users",
      icon: "dashboard/users",
      title: "Gestionar Usuarios",
    },
  
    {
      to: "/admin/companies",
      icon: "dashboard/buildings",
      title: "Gestionar Empresas o Instituciones",
    },
  
    {
      to: "/admin/roles",
      icon: "dashboard/user-tag",
      title: "Gestionar Roles",
    },
  
    {
      to: "/admin/attendances",
      icon: "dashboard/calendar-alt",
      title: "Gestionar Asistencias",
    },
  
    {
      to: "/admin/attendances-type",
      icon: "dashboard/calendar-check",
      title: "Gestionar Tipos de Asistencias",
    },
  
    {
      to: "/admin/your-attendances",
      icon: "dashboard/calendar-month",
      title: "Ver Tus Asistencias",
    },
  
    {
      to: `http://localhost:5000/resources/db/${userData.rol_id}/${userData.user_id}`,
      icon: "dashboard/db",
      title: "Exportar Base de Datos",
    },
  
    {
      to: `http://localhost:5000/resources/all-attendances/${userData.rol_id}/${userData.user_id}`,
      icon: "dashboard/table-down",
      title: "Descargar Todas las Asistencias",
    },
  
    {
      to: `http://localhost:5000/resources/your-attendances/${userData.user_id}`,
      icon: "dashboard/file-excel",
      title: "Descargar Tus Asistencias",
    },
  ];
}
