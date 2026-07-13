import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await api.get("/dashboard");

            setDashboard(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!dashboard) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white shadow rounded-lg p-5">
                    <h2 className="text-gray-500">Projects</h2>
                    <p className="text-3xl font-bold">
                        {dashboard.totalProjects}
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-5">
                    <h2 className="text-gray-500">Active Sprint</h2>
                    <p className="text-3xl font-bold">
                        {dashboard.activeSprint}
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-5">
                    <h2 className="text-gray-500">Total Tasks</h2>
                    <p className="text-3xl font-bold">
                        {dashboard.totalTasks}
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-5">
                    <h2 className="text-gray-500">Completed Tasks</h2>
                    <p className="text-3xl font-bold">
                        {dashboard.completedTasks}
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-5">
                    <h2 className="text-gray-500">Pending Tasks</h2>
                    <p className="text-3xl font-bold">
                        {dashboard.pendingTasks}
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-5">
                    <h2 className="text-gray-500">Story Points</h2>
                    <p className="text-3xl font-bold">
                        {dashboard.storyPoints}
                    </p>
                </div>

            </div>

            <div className="mt-10 bg-white shadow rounded-lg p-6">

                <h2 className="text-2xl font-semibold mb-4">
                    Tasks By Status
                </h2>

                {
                    dashboard.tasksByStatus.map((item) => (

                        <div
                            key={item._id}
                            className="flex justify-between border-b py-2"
                        >
                            <span>{item._id}</span>

                            <span>{item.count}</span>

                        </div>

                    ))
                }

            </div>

        </div>
    );

};

export default Dashboard;