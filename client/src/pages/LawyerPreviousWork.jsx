
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import "./user.css";

const LawyerPreviousWork = () => {
  const location = useLocation();

  const [contracts, setContracts] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchContracts = async () => {
    try {
      const lawyerId = location.state?.lawyerId;
      if (lawyerId) {
        const response = await fetch(`http://localhost:8800/contract/getLawyerContracts/${lawyerId}`,{
          method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
        });
        const data = await response.json();

        setContracts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchContracts();
  }, [location]);


  

  



  return (<div className="previous-work">
  <h1>Previous Work</h1>
  {contracts.map((contract) => {
    if (contract.status === 'completed' || contract.status === 'cancelled') {
      return (
        <div key={contract._id} className="contract-card">
          <h2>{contract.title}</h2>
          <p>
            Status: 
            <span 
              style={{
                color: contract.status === 'completed' ? 'green' : 'red',
                fontWeight: 'bold'
              }}
            >
              {contract.status}
            </span>
          </p>
          <p>Feedback: {contract.feedback}</p>
        </div>
      );
    } else {
      return null;
    }
  })}
</div>
  );
};

export default LawyerPreviousWork;