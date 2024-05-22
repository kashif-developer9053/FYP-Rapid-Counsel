import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import './user.css'
import { Office} from "../assets";

const UserDetails = () => {
  const { userId } = useParams();
  const [users, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const lawyer = users;
  const client = user;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res = await apiRequest({
          url: `/user/get-user-details/${userId}`,
          method: "GET",
        });
        console.log(res);
        if (res?.seeker) {
          setUser(res.seeker);
          console.log("response is:", res.seeker);
          setIsLoading(false);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    console.log("user changes to ", users);
  }, [users]);

  const handleContact = () => {
    navigate("/chat", { state: { lawyer, client } });
  };

  const handleStartContract = () => {
    navigate("/contract", { state: { lawyer  }})}        

    const previousWork = () => {
      navigate("/LawyerPreviousWork", { state: { lawyerId: lawyer?._id }})} 


  return (
    <div className="container">
      {isLoading ? (
        <p>Loading user details...</p>
      ) : users ? (
        <div className="card">
          <div>
            <img src={users?.profileUrl} alt={`${users?.firstName} ${users?.lastName}`} />
          </div>
          <div className="content">
            <h1 className="text-3xl font-bold mb-4">{`${users?.firstName} ${users?.lastName}`}</h1>
            <p>Email: {users?.email}</p>
            <p>Title: {users?.jobTitle}</p>
            <p>Phone No: {users?.contact}</p>
            <p>Details: {users?.about}</p>
            <p>From: {users?.location}</p>
            <button className="bg-orange" onClick={handleContact}>Contact</button>
            <button className="bg-green"  onClick={previousWork}>PreviousWork</button>

            <button className="bg-green" onClick={handleStartContract}>Start Contract</button>
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetails;