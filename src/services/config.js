export const config = {
  URL: "http://localhost",

  PORT_NUMBER: "8120",
  GITLAB_PORT_NUMBER: "8929",
  OAUTH_PORT: "9094",
  TAIGA_PORT_NUMBER: "8000",
  MATTERMOST_PORT_NUMBER:"1080",


  API: {
    VERSION: "V1",
    LOGIN: "login",
    USER: "user",
    USERS: "users",
    LOGOUT: "logout",
    PROJECT: "project",
    ACTIVITY: "activity",
    REGISTER: "user",
    REPORTS: "Reports",
    ACTIVITIES_REPORT: "activitiesReport",
    TIME_REPORT: "timeReport",
    CUMUL_REPORT: "cumulativeReport",
    CATEGORY_REPORT: "categorytimeReport",
    PROJECTS: "projects",
    AGENT_GATEWAY: "AgentGateway",
    AGENT_CONFIG: "AgentConfiguration",
    AGENT_LIST: "AgentList",
    CONNECT_PROJECT: "ConnectProject",
    OAUTH: "OAuth",
    OAUTH20: "OAuth20",
    PROJECT_DATA: "projectData",
    PROJECT_LIST: "projectList",
    PERMISSION_FOR_USER: "Admin/User/Permissions",
    GITLAB_TOKEN: "api/v4/personal_access_tokens",

    TAIGA_TOKEN: "api/v1/auth",
    TAIGA_PROJECTS: "api/v1/projects",
    TAIGA_USERS: "api/v1/users",
    GITLAB_PROJECTS: "api/v4/projects",
    MATTERMOST_LOGIN: "api/v4/users/login"

  },

  CONTENT_TYPES: {
    APPLICATION_JSON: "application/json",
    MULTIPART: "multipart/form-data",
  },

  REQ_TYPES: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },
};
