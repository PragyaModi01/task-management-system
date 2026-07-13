import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../api/axios";

const STATUS_COLUMNS = ["Todo", "In Progress", "Done"];

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    workspace: "",
    project: "",
    sprint: "",
    priority: "Medium",
    storyPoints: 1,
    status: "Todo",
  });

  useEffect(() => {
    loadProjects();
    loadSprints();
    loadTasks();
  }, []);

  const loadProjects = async () => {
    const res = await api.get("/projects");

    setProjects(res.data.data);
  };

  const loadSprints = async () => {
    const res = await api.get("/sprints");

    setSprints(res.data.data);
  };

  const loadTasks = async () => {
    const res = await api.get("/tasks");

    setTasks(res.data.data);
  };

  const createTask = async () => {
    const selectedProject = projects.find((project) => project._id === form.project);
    const payload = {
      ...form,
      workspace: form.workspace || selectedProject?.workspace || "",
    };

    if (!payload.project || !payload.workspace) {
      alert("Please select a project first.");
      return;
    }

    await api.post("/tasks", payload);

    setForm({
      title: "",
      description: "",
      workspace: "",
      project: "",
      sprint: "",
      priority: "Medium",
      storyPoints: 1,
      status: "Todo",
    });

    loadTasks();
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const draggedTask = tasks.find((task) => task._id === draggableId);
    if (!draggedTask) return;

    const updatedStatus = destination.droppableId;
    if (draggedTask.status === updatedStatus) return;

    const updatedTasks = tasks.map((task) =>
      task._id === draggableId ? { ...task, status: updatedStatus } : task
    );

    setTasks(updatedTasks);

    try {
      await api.put(`/tasks/${draggableId}`, { status: updatedStatus });
    } catch (error) {
      console.error("Failed to update task status", error);
      setTasks(tasks);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Tasks</h1>

      <div className="bg-white p-5 shadow rounded">
        <input
          className="border p-2 mr-2"
          placeholder="Task title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <select
          className="border p-2 mr-2"
          value={form.project}
          onChange={(e) => {
            const selectedProject = projects.find((project) => project._id === e.target.value);

            setForm({
              ...form,
              project: e.target.value,
              workspace: selectedProject?.workspace || "",
            });
          }}
        >
          <option>Select Project</option>

          {projects.map((p) => (
            <option value={p._id}>{p.name}</option>
          ))}
        </select>

        <select
          className="border p-2"
          onChange={(e) =>
            setForm({
              ...form,
              sprint: e.target.value,
            })
          }
        >
          <option>Select Sprint</option>

          {sprints.map((s) => (
            <option value={s._id}>{s.name}</option>
          ))}
        </select>

        <button
          onClick={createTask}
          className="bg-green-600 text-white px-4 py-2 rounded ml-3"
        >
          Create Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {STATUS_COLUMNS.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-200 p-4 rounded min-h-[320px]"
                >
                  <h2 className="font-bold mb-3">{status}</h2>

                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-3 mt-3 rounded shadow ${
                              snapshot.isDragging ? "border-blue-400 border-2" : ""
                            }`}
                          >
                            <div className="font-semibold">{task.title}</div>
                            {task.description && (
                              <div className="text-sm text-slate-600 mt-1">{task.description}</div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
