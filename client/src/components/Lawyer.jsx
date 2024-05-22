import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiBorderRadius } from 'react-icons/bi';
import "./lawyer.css";

import { Link } from "react-router-dom";

const handleContact = () => {
  navigate("/chat", { state: { lawyer, client } });
};

function Lawyer({ lawyers }) { // Add the lawyers prop

  return (
    <>
      {lawyers.map((lawyer, idx) => ( // Use the lawyers prop
       
       <div className="card2">
       <div className='image'>
          <img 
            src={lawyer?.profileUrl}
            alt={`${lawyer?.firstName} ${lawyer?.lastName}`}
         
          />
        </div>
        <div className="content">
          <h1 className="text-3xl font-bold mb-4">{`${lawyer?.firstName} ${lawyer?.lastName}`}</h1>
          <p>Email: {lawyer?.email}</p>
          <p >Title : {lawyer?.jobTitle}</p>
         

         

          <p >From : {lawyer?.location}</p>
        
          </div>
          <Link  to={`/user-details/${lawyer?._id}`}>

<button
  className="bg-orange"
  onClick={handleContact}
>
  View 
</button>
</Link>
      </div>

      ))}
    </>
  );
}

export default Lawyer;
