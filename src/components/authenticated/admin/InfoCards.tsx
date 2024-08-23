"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const InfoCards: React.FC = () => {
  const [totalCreator, setTotalCreator] = useState();
  const [totalDoer, setTotalDoer] = useState();
  const [totalProject, setTotalProject] = useState();
  const [data, setData] = useState({
    totalTeachers: 25,
    totalAssignments: 150,
    ongoingProjects: 12,
    totalEarnings: "$25,000",
    positivechange: "+9.5%",
    negativechange: "-5.7%",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creatorResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/countUsers`,
          {
            userType: "ASSIGNMENT_CREATOR",
          },
          {
            withCredentials: true, // Include credentials with the request
          }
        );
        setTotalCreator(creatorResponse.data);

        const doerResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/countUsers`,
          {
            userType: "ASSIGNMENT_DOER",
          },
          {
            withCredentials: true, // Include credentials with the request
          }
        );

        setTotalDoer(doerResponse.data);

        const projectResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/total`,
          {
            withCredentials: true, // Include credentials with the request
          }
        );
        setTotalProject(projectResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start justify-start">
        <div className="w-full flex flex-row justify-between">
          <h3 className="text-xl font-bold mb-2">{totalCreator}</h3>
          <div>
            <Image
              src="/admin-icons/totalteacher.svg"
              alt="Total Teachers"
              width={15}
              height={15}
              className="mb-4"
            />
          </div>
        </div>
        <p className="text-start primary-gray">Total Creators</p>
        <div className="bg-green-300 text-green-600">{data.positivechange}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start justify-start">
        <div className="w-full flex flex-row justify-between">
          <h3 className="text-xl font-bold mb-2">{totalDoer}</h3>
          <div>
            <Image
              src="/admin-icons/totalassignment.svg"
              alt="Total Assignments"
              width={15}
              height={15}
              className="mb-4"
            />
          </div>
        </div>
        <p className="text-start primary-gray">Total Doers</p>
        <div className="bg-red-300 text-red-600">{data.negativechange}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start justify-start">
        <div className="w-full flex flex-row justify-between">
          <h3 className="text-xl font-bold mb-2">{totalProject}</h3>
          <div>
            <Image
              src="/admin-icons/ongoingprojects.svg"
              alt="Ongoing Projects"
              width={15}
              height={15}
              className="mb-4"
            />
          </div>
        </div>
        <p className="text-start primary-gray">Ongoing Projects</p>
        <div className="bg-green-300 text-green-600">{data.positivechange}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start justify-start">
        <div className="w-full flex flex-row justify-between">
          <h3 className="text-xl font-bold mb-2">{data.totalEarnings}</h3>
          <div>
            <Image
              src="/admin-icons/totalearning.svg"
              alt="Total Earning"
              width={15}
              height={15}
              className="mb-4"
            />
          </div>
        </div>
        <p className="text-start primary-gray">Total Earnings</p>
        <div className="bg-green-300 text-green-600">{data.positivechange}</div>
      </div>
    </div>
  );
};

export default InfoCards;
