
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

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

  return (
    <div className="container mx-auto p-8">
      {isLoading ? (
        <p>Loading user details...</p>
      ) : users ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={users?.profileUrl}
              alt={`${users?.firstName} ${users?.lastName}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{`${users?.firstName} ${users?.lastName}`}</h1>
            <p className="text-gray-600 mb-2">{users?.email}</p>
            <p className="text-gray-600 mb-2">{users?.accountType}</p>
            <p className="text-gray-600 mb-2">{users?.about}</p>
            <p className="text-gray-600 mb-2">{users?.contact}</p>
            <p className="text-gray-600 mb-2">{users?.jobTitle}</p>
            <p className="text-gray-600 mb-2">{users?.location}</p>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleContact}
            >
              Contact
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Contract
            </button>
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetails;
