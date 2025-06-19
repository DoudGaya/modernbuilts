// Dashboard routes based on user role
export const ADMIN_DASHBOARD = "/admin/dashboard"
export const USER_DASHBOARD = "/user/dashboard"
export const DEVELOPER_DASHBOARD = "/developer/dashboard"

export const getRouteByUserRole = (role?: string) => {
  switch (role) {
    case "ADMIN":
      return ADMIN_DASHBOARD
    case "DEVELOPER":
      return DEVELOPER_DASHBOARD
    case "USER":
    default:
      return USER_DASHBOARD
  }
}

export const DEFAULT_LOGGED_IN_REDIRRECT = getRouteByUserRole