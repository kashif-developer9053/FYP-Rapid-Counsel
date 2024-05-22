
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selection, setSelection] = useState("");
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) {
      fetchContracts();
    }
  }, [user]);

  const fetchContracts = async () => {
    try {
      const response = await fetch("http://localhost:8800/contract/getAllContracts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching contracts: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data:", data);
      if (data) {
        setContracts(data);
      } else {
        console.error("Error fetching contracts");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (contractId) => {
    try {
      await axios.delete(`http://localhost:8800/contract/delete/${contractId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchContracts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event, contractId) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8800/contract/end/${contractId}`,
        {
          status: selection,
          feedback: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchContracts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEndProject = async (contractId) => {
    setShowForm(true);
  };

  return (
    <div className="container h-screen p-4">
      <h1 style={{borderBottom:"3px solid black", borderRadius:"10px", width:200, textAlign:"center",margin:"auto"}} className="text-3xl font-bold mb-4 text-black">Contracts</h1>
      {contracts.length > 0 ? (
        <div>
          {contracts.map((contract) => {
            if (contract.status !== "completed" && contract.status !== "cancelled") {
              return (
                <div key={contract._id} className="bg-black text-white p-4 rounded shadow-md mb-4">
                  <h2 className="text-2xl font-bold mb-2">{contract.title}</h2>
                  <p>Between: {contract.creatorName} And {contract.lawyerName}</p>
                  <p>Status: {contract.status}</p>
                  <p>Duration: {contract.duration}</p>
                  <p>Contract Type: {contract.contractType}</p>
                  <p>Price: {contract.price}</p>
                  <p>Description: {contract.description}</p>
                  {contract.status !== "started" && (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(contract._id)}
                    >
                      Delete
                    </button>
                  )}
                  {contract.status === "started" && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEndProject(contract._id)}
                    >
                      End Project
                    </button>
                  )}
                  <div>
                    {showForm && (
                      <form
                        onSubmit={(event) => handleSubmit(event, contract._id)}
                        className="bg-black text-white p-4 rounded shadow-md mb-4"
                      >
                        <h2 className="text-2xl font-bold mb-2">End Project Form</h2>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                              className="block uppercase tracking-wide text-700 text-xs font-bold mb-2"
                              htmlFor="project-status"
                            >
                              Project Status
                            </label>
                            <select
                              className="block w-full p-4 pl-10 text-black text-700"
                              value={selection}
                              onChange={(event) => setSelection(event.target.value)}
                            >
                              <option className="text-black" value="completed">
                                Completed
                              </option>

                              <option className="text-black" value="cancelled">
                                Cancelled
                              </option>
                            </select>
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <label
                              className="block uppercase tracking-wide text-700 text-xs font-bold mb-2"
                              htmlFor="feedback"
                            >
                              Feedback
                            </label>
                            <textarea
                              className="block w-full p-4 pl-10 text-black text-sm text-700"
                              value={feedback}
                              onChange={(event) => setFeedback(event.target.value)}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <p className="text-gray-500">You have no contracts.</p>
      )}
    </div>
  );
};

export default Contracts;