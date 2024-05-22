
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const ContractPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lawyer, setLawyer] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [contractType, setContractType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  console.log(user.token)

  useEffect(() => {
    if (location.state) {
      setLawyer(location.state.lawyer);
    }
  }, [location]);

  if (!lawyer || !user) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8800/contract/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`, // Ensure user.token is valid


        },
        body: JSON.stringify({
          title,
          duration,
          contractType,
          price,
          description,
          lawyerId: lawyer._id,
          lawyerName: lawyer.firstName,
          creatorName: user.name,

          createdBy: user._id,
        }),
      });
      const data = await response.json();
      console.log(data);
      navigate('/contracts'); // Redirect to contracts page
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  return (
    <div className="container h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-black" style={{ textAlign: "center" }}>
        Contract between {user.name} and {lawyer.firstName} {lawyer.lastName}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-black rounded shadow-md">
        <label className="block mb-2">
          <span className="text-700 text-white">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black p-2 pl-10 text-sm text-700"
          />
        </label>
        <label className="block mb-2">
          <span className="text-700 text-white">Duration:</span>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-700 text-black"
          >
            <option value="1 month">1 month</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
          </select>
        </label>
        <label className="block mb-2">
          <span className="text-700 text-white">Contract Type:</span>
          <select
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-black text-700"
          >
            <option value="Intern">Intern</option>
            <option value="Fixed">Fixed</option>
            <option value="Hourly">Hourly</option>
          </select>
        </label>
        <label className="block mb-2">
          <span className="text-700 text-white">Price:</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 pl-10 text-black text-sm text-700"
          />
        </label>
        <label className="block mb-2">
          <span className="text-700 text-white">Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 text-black pl-10 text-sm text-700"
          />
        </label>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Contract
        </button>
      </form>
    </div>
  );
};

export default ContractPage;