import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Workspace",
      path: "/workspaces",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Sprint Board",
      path: "/sprints",
    },
    {
      name: "Tasks",
      path: "/tasks",
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Mini Jira
      </div>

      <nav className="mt-5">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block px-6 py-3 ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
