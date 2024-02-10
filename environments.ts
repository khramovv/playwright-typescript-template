interface Map {
    [key: string]: string
}

interface Config {
    [key: string]: Map
}

export const envs: Config = {
    qa: {
        url: "https://demo.reportportal.io/",
        uiAdminUserName: "default",
        uiAdminPassword: "1q2w3e",
        apiUrl: "https://dummyjson.com/",
        adminUserName: "kminchelle",
        adminPassword: "0lelplR"
    },
    dev: {
        url: "https://dev.web.ui.url/",
        uiAdminUserName: "",
        uiAdminPassword: "",
        apiUrl: "https://dev.api.base.url/",
        adminUserName: "",
        adminPassword: ""
    },
    stage: {
        url: "https://dev.web.ui.url/",
        uiAdminUserName: "",
        uiAdminPassword: "",
        apiUrl: "https://dev.api.base.url/",
        adminUserName: "",
        adminPassword: ""
    }
}

export const getEnv = (): Map => {
    const env: string = process.env['ENV'] == undefined ? 'qa' : process.env['ENV'];
    return envs[env];
}