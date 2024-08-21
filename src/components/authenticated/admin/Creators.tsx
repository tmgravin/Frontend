"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import StudentInfoModal from './InfoModals/StudentInfoModal'; // Adjust the import path as necessary

 export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  address: string;
}

const StudentComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    // {
    //   id: 1,
    //   name: 'John Doe',
    //   email: 'johndoe@example.com',
    //   phone: '123-456-7890',
    //   registrationDate: '2023-01-01',
    //   address: '123 Main St, Anytown, USA'
    // },

  ]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/role?userType=ASSIGNMENT_CREATOR`,{
        withCredentials: true // Include credentials with the request
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
      )
    );
  }, [search, users]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0); // Reset to first page when items per page changes
  };

  const handleActionClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const currentItems = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assigment Creators Details</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-md p-2"
        />
        <div>
          <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Registration Date</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">{user.createdAt}</td>
              <td className="border px-4 py-2">{user.address}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleActionClick(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center mt-4"}
        pageClassName={"mx-1"}
        pageLinkClassName={"px-3 py-1 border rounded"}
        activeClassName={"bg-blue-500 text-white"}
        previousLinkClassName={"px-3 py-1 border rounded"}
        nextLinkClassName={"px-3 py-1 border rounded"}
      />
      <StudentInfoModal user={selectedUser} open={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default StudentComponent;
