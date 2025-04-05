import React, { useEffect, useState } from 'react'
import './activity.css'
import { BsArrowRightShort } from 'react-icons/bs'
import ReactLoading from 'react-loading'

const API_BASE_URL = "https://servsiam-backend-a61de3db6766.herokuapp.com/api/auth";

const Activity = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users?limit=5`);
      const data = await response.json();

      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error("Invalid user data:", data);
      }
    } catch (error) {
      console.error("Error fetching user activity:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='activitySection'>
      <div className="heading flex">
        <h1>Recent Activity</h1>
        <button className='btn flex'>
          See All
          <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer grid gap-5">
        {loading ? (
          <div className="flex justify-center items-center">
            <ReactLoading type="spin" color="#4CAF50" height={30} width={30} />
          </div>
        ) : (
          users.map((user, index) => (
            <div className="singleCustomer flex" key={user.id || index}>
              <img
  src={
    user.profile_picture?.startsWith("http")
      ? user.profile_picture
      : user.profile_picture
      ? `https://servsiam-backend-a61de3db6766.herokuapp.com${user.profile_picture}`
      : "/default-profile.png"
  }
  alt="Customer"
  className="w-10 h-10 rounded-full border"
/>

              <div className="customerDetails">
                <span className="name">{user.user_name}</span>
                <small>Just updated profile</small>
              </div>
              <div className="duration">2 min ago</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Activity;
