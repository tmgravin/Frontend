import React, { useState, useEffect } from "react";
import axios from "axios";
import ReadMoreModal from "./ReadMoreModal";
import ApplyModal from "../ApplyModal";

// Define the type for category data
interface Category {
  id: string;
  category: string;
}

// Define the type for project data
export interface Project {
  id: number;
  projectName: string;
  projectAmount: number;
  projectDeadline: string;
  budgets: string;
  createdAt: string;
  paymentStatus: string;
  users: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    userType: string;
  };
  projectCategory: {
    id: number;
    category: string;
  };
}

const Searchbar: React.FC = () => {
  const [catData, setCatData] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isSearchAttempted, setIsSearchAttempted] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState(""); // State for no results message
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSearchAttempted(true);
    setNoResultsMessage(""); // Reset no results message on new search
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/project?categoryId=${category}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 404) {
        setNoResultsMessage("No projects found for the selected category.");
        setSearchResults([]);
        setIsModalOpen(false);
      } else {
        setSearchResults(response.data);
        setIsModalOpen(true);
      }
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleClear = () => {
    setCategory("");
    setSearchResults([]);
    setIsSearchAttempted(false);
    setNoResultsMessage(""); // Clear no results message
    setIsModalOpen(false); // Close the modal
  };

  const handleReadMore = (project: Project) => {
    setSelectedProject(project);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/`,
          {
            withCredentials: true,
          }
        );
        setCatData(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategory();
  }, []);

  const handleApplyNow = (project: any) => {
    setSelectedProject(project);
    setShowApplyModal(true);
  };

  const handleCloseApplyModal = () => {
    setShowApplyModal(false);
    setSelectedProject(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <div className="flex flex-row w-full">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-[50-vw] border border-gray-300 rounded-l-md p-2"
              required
            >
              <option value="">Browse Category</option>
              {catData.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>

            <div className="flex">
              <button
                type="submit"
                className="px-4 primary-orangebg text-white rounded-r-md hover:bg-orange-600"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Modal for displaying search results */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-3xl relative overflow-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              Close
            </button>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.length > 0
                ? searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="border rounded-lg p-4 shadow-lg bg-white"
                    >
                      <h3 className="text-xl font-bold">
                        {result.projectName}
                      </h3>
                      <div
                        onClick={() => handleReadMore(result)}
                        className="font-semibold primary-orange hover:underline cursor-pointer"
                      >
                        Read More
                      </div>
                      <p className="text-gray-600">
                        Amount: ${result.projectAmount.toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        Deadline:{" "}
                        {new Date(result.projectDeadline).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        Budget Type: {result.budgets}
                      </p>
                      <p className="text-gray-600">
                        Payment Status: {result.paymentStatus}
                      </p>
                      <hr className="my-2" />
                      {/* <div>
                      <h4 className="font-semibold">Creator Information</h4>
                      <p className="text-gray-600">
                        Name: {result.users.name}
                      </p>
                      <p className="text-gray-600">
                        Email: {result.users.email}
                      </p>
                      <p className="text-gray-600">
                        Phone: {result.users.phone}
                      </p>
                      <p className="text-gray-600">
                        Address: {result.users.address}
                      </p>
                    </div> */}
                      <button
                        className="primary-orangebg rounded-sm p-1 text-white "
                        onClick={() => handleApplyNow(result)}
                      >
                        <h1 className="text-xs">Apply now</h1>
                      </button>
                    </div>
                  ))
                : isSearchAttempted &&
                  noResultsMessage && (
                    <p className="text-center col-span-full">
                      {noResultsMessage}
                    </p>
                  )}
            </div>
          </div>
        </div>
      )}

      {showApplyModal && selectedProject && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleCloseApplyModal}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ApplyModal
              project={selectedProject}
              onClose={handleCloseApplyModal}
            />
          </div>
        </>
      )}

      {/* ReadMoreModal component */}
      {selectedProject && (
        <ReadMoreModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Searchbar;
