
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const ContractsLaw = () => {
  const [contracts, setContracts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
 console.log(user._id)

 useEffect(() => {
  if (user && user.token) {
    fetchContracts();
  }
}, [user]);

  
const fetchContracts = async () => {
  try {
    const response = await fetch("http://localhost:8800/contract/getAllContractsLawyer", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching contracts: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data:', data); // Add this log statement
    if (data) {
      setContracts(data);
    } else {
      console.error('Error fetching contracts');
    }
  } catch (error) {
    console.error(error);
  }
};




const handleStart = async (contractId) => {
    try {
      await axios.patch(`http://localhost:8800/contract/update/${contractId}`, {
        status: "started",
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchContracts();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (<div className="container h-screen p-4">
  <h1 className="text-3xl font-bold mb-4 text-black">Contracts</h1>
  {contracts.length > 0 && (
    <div>
      {contracts.map((contract) => {
        if (contract.status === "pending") {
          return (
            <div key={contract._id} className="bg-white p-4 rounded shadow-md mb-4">
              <h2 className="text-2xl font-bold mb-2">{contract.title}</h2>
              <p>Between: {contract.creatorName} And {contract.lawyerName}</p>
              <p>Status: {contract.status}</p>
              <p>Duration: {contract.duration}</p>
              <p>Contract Type: {contract.contractType}</p>
              <p>Price: {contract.price}</p>
              <p>Description: {contract.description}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleStart(contract._id)}
              >
                Start
              </button>
            </div>
          );
        } else if (contract.status === "started") {
          return (
            <div key={contract._id} className="bg-white p-4 rounded shadow-md mb-4">
              <h2 className="text-2xl font-bold mb-2">{contract.title}</h2>
              <p>Between: {contract.creatorName} And {contract.lawyerName}</p>
              <p>Status: {contract.status}</p>
              <p>Duration: {contract.duration}</p>
              <p>Contract Type: {contract.contractType}</p>
              <p>Price: {contract.price}</p>
              <p>Description: {contract.description}</p>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  )}
</div>

  );
  
};

export default ContractsLaw;
