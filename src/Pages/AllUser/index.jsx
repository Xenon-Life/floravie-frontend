import axios from "axios";
import React, { useState, useEffect } from "react";
import "./ModalStyles.css"; // Make sure to create and import your CSS file
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/allusers`
        );
        if (response.status === 200) {
          const data = response.data;
          console.log("response data", data);
          setUsers(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleViewDetails = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/user/${userId}`
      );
      if (response.status === 200) {
        setSelectedUser(response.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/auth/user/${userToDelete}`
      );
      setUsers(users.filter((user) => user._id !== userToDelete));
      toast.success("User deleted successfully");
      setShowConfirmModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  };

  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setShowConfirmModal(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="grid sm:grid-cols-1 grid-cols-3 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md p-4"
          >
            <FaRegTrashCan
              className="text-red-700 cursor-pointer relative hover:text-red-800 hover:bg-gray-200 "
              onClick={() => confirmDeleteUser(user._id)}
            />
            <h2 className="text-lg font-bold mb-2 mt-6">{user.username}</h2>
            <p className="text-gray-600 mb-4 overflow-hidden">{user.email}</p>

            <button
              onClick={() => handleViewDetails(user._id)}
              className=" overflow-hidden get-started-button px-14 py-1 md:px-14 md:py-1.5 md:text-base text-center hover:bg-purple-800"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this user?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleDeleteUser}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setShowConfirmModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

const UserDetailsModal = ({ user, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/auth/user/${user._id}`,
        editedUser
      );
      if (response.status === 200) {
        toast.success("User updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating user");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          {isEditing ? (
            <>
              <label className="font-bold">Name</label>
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
                className="input"
              />
              <label className="font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="input border-gray-950"
              />
              <label className="font-bold">Phone Number</label>

              <input
                type="text"
                name="number"
                value={editedUser.number}
                onChange={handleInputChange}
                className="input"
              />
              <label className="font-bold">Country</label>

              <input
                type="text"
                name="country"
                value={editedUser.country}
                onChange={handleInputChange}
                className="input"
              />
              <label className="font-bold">Age</label>

              <input
                type="number"
                name="age"
                value={editedUser.age}
                onChange={handleInputChange}
                className="input"
              />
              <label className="font-bold">Practice</label>

              <input
                type="text"
                name="practice"
                value={editedUser.practice}
                onChange={handleInputChange}
                className="input"
              />
              <label className="font-bold">Role</label>

              <input
                type="text"
                name="role"
                value={editedUser.role}
                onChange={handleInputChange}
                className="input"
              />

              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2> Name:{user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Number: {user.number}</p>
              <p>Country: {user.country}</p>
              <p>Age: {user.age}</p>
              <p>Phone Number: {user.number}</p>
              <p>Practice: {user.practice}</p>
              <p>Role: {user.role}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="get-started-button px-14 py-1 md:px-14 md:py-1.5 md:text-base text-center hover:bg-purple-800 w-full"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUser;
