import { useEffect, useState } from "react";
import api from "../api/axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [workspaces, setWorkspaces] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    workspace: "",
  });

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");

      setProjects(res.data.data || []);
    } catch (error) {
      console.log("Project fetch error:", error);
    }
  };

  const loadWorkspaces = async () => {
    try {
      const res = await api.get("/workspaces");

      setWorkspaces(res.data.data || []);
    } catch (error) {
      console.log("Workspace fetch error:", error);
    }
  };

  useEffect(() => {
    loadProjects();
    loadWorkspaces();
  }, []);

  const createProject = async () => {
    try {
      if (!form.name || !form.workspace) {
        alert("Project name and workspace are required");

        return;
      }

      const res = await api.post("/projects", form);

      console.log("Project Created:", res.data);

      setForm({
        name: "",
        description: "",
        workspace: "",
      });

      loadProjects();
    } catch (error) {
      console.log(
        "Create project error:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="bg-white p-5 rounded shadow mb-6">
        <div className="flex flex-wrap gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Project name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Project description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.workspace}
            onChange={(e) =>
              setForm({
                ...form,
                workspace: e.target.value,
              })
            }
          >
            <option value="">Select Workspace</option>

            {workspaces.map((workspace) => (
              <option key={workspace._id} value={workspace._id}>
                {workspace.name}
              </option>
            ))}
          </select>

          <button
            onClick={createProject}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-white p-5 rounded shadow">
              <h2 className="text-xl font-bold">{project.name}</h2>

              <p className="text-gray-600 mt-2">{project.description}</p>

              {project.workspace && (
                <p className="text-sm mt-3">
                  Workspace: {project.workspace.name || project.workspace}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
