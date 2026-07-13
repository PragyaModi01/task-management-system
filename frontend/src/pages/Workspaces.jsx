import { useEffect, useState } from "react";
import api from "../api/axios";


const Workspaces = () => {

    const [workspaces, setWorkspaces] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
    });


    const loadWorkspaces = async () => {

        try {

            const res = await api.get("/workspaces");

            setWorkspaces(res.data.data);

        } catch (error) {
            console.log(error);
        }

    };


    useEffect(() => {
        loadWorkspaces();
    }, []);


    const createWorkspace = async () => {

        try {

            await api.post("/workspaces", form);

            setForm({
                name:"",
                description:""
            });

            loadWorkspaces();

        } catch(error){
            console.log(error);
        }

    };


    return (

        <div>

            <h1 className="text-3xl font-bold mb-5">
                Workspaces
            </h1>


            <div className="bg-white p-5 rounded shadow mb-6">

                <input
                    className="border p-2 mr-3"
                    placeholder="Workspace name"
                    value={form.name}
                    onChange={(e)=>setForm({
                        ...form,
                        name:e.target.value
                    })}
                />


                <input
                    className="border p-2 mr-3"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e)=>setForm({
                        ...form,
                        description:e.target.value
                    })}
                />


                <button
                    onClick={createWorkspace}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create
                </button>

            </div>



            <div className="grid md:grid-cols-3 gap-5">

                {
                    workspaces.map((item)=>(

                        <div
                            key={item._id}
                            className="bg-white p-5 rounded shadow"
                        >

                            <h2 className="font-bold text-xl">
                                {item.name}
                            </h2>

                            <p>
                                {item.description}
                            </p>

                        </div>

                    ))
                }

            </div>

        </div>

    );
};


export default Workspaces;