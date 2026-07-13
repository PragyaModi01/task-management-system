import api from "../api/axios";


export const getWorkspaces = async () => {

    const response = await api.get("/workspaces");

    return response.data;

};


export const createWorkspace = async (workspaceData) => {

    const response = await api.post(
        "/workspaces",
        workspaceData
    );

    return response.data;

};