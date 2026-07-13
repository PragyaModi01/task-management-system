import { useEffect, useState } from "react";
import api from "../api/axios";

const SprintBoard = () => {
  const [projects, setProjects] = useState([]);

  const [sprints, setSprints] = useState([]);

  const [form, setForm] = useState({
    name: "",
    goal: "",
    project: "",
    startDate: "",
    endDate: "",
  });

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");

      setProjects(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSprints = async () => {
    try {
      const res = await api.get("/sprints");

      setSprints(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProjects();
    loadSprints();
  }, []);

  const createSprint = async () => {
    try {
      await api.post("/sprints", form);

      setForm({
        name: "",
        goal: "",
        project: "",
        startDate: "",
        endDate: "",
      });

      loadSprints();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sprint Board</h1>

      <div className="bg-white p-5 rounded shadow mb-6">
        <div className="grid md:grid-cols-3 gap-3">
          <input
            className="border p-2"
            placeholder="Sprint Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="border p-2"
            placeholder="Sprint Goal"
            value={form.goal}
            onChange={(e) =>
              setForm({
                ...form,
                goal: e.target.value,
              })
            }
          />

          <select
            className="border p-2"
            value={form.project}
            onChange={(e) =>
              setForm({
                ...form,
                project: e.target.value,
              })
            }
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-2"
            value={form.startDate}
            onChange={(e) =>
              setForm({
                ...form,
                startDate: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border p-2"
            value={form.endDate}
            onChange={(e) =>
              setForm({
                ...form,
                endDate: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={createSprint}
          className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
        >
          Create Sprint
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {sprints.map((sprint) => (
          <div key={sprint._id} className="bg-white shadow p-5 rounded">
            <h2 className="font-bold text-xl">{sprint.name}</h2>

            <p>{sprint.goal}</p>

            <p className="mt-2">Status: {sprint.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SprintBoard;
