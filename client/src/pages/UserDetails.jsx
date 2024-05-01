import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../utils";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await apiRequest({
          url: `/user/get-user-details/${userId}`,
          method: "GET",
        });

        // Check if response contains 'success' and 'seeker' properties
        if (res?.data?.success && res?.data?.seeker) {
          setUser(res.data.seeker);
          setIsLoading(false);
        } else {
          // If response does not contain expected data structure
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div className="container mx-auto p-8">
      {isLoading ? (
        <p>Loading user details...</p>
      ) : user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={user.profileUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{`${user.firstName} ${user.lastName}`}</h1>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <p className="text-gray-600 mb-2">{user.accountType}</p>
            <p className="text-gray-600 mb-2">{user.about}</p>
            <p className="text-gray-600 mb-2">{user.contact}</p>
            <p className="text-gray-600 mb-2">{user.jobTitle}</p>
            <p className="text-gray-600 mb-2">{user.location}</p>
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetails;
