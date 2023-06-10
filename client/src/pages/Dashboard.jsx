import React from "react";
import CurrentProjects from "../components/CurrentProjects";
import Modal from "../components/Modal";
import { RiAddLine } from "react-icons/ri";

import ProjectForm from "../components/AddProjectForm";

import { useState } from "react";

import Auth from "../utils/auth";
import { RETURN_USER } from "../utils/query";
import { useQuery } from "@apollo/client";

const loggedIn = Auth.getToken();

const Dashboard = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const url = window.location.href;
  const id = url.split("=").pop().trim();

  const { data, loading } = useQuery(RETURN_USER, {
    variables: { input: id },
  });

  if (loading) {
    return <p>Loading...</p>; // Return a loading indicator while data is being fetched
  }

  if (!data) {
    return <p>No data found.</p>; // Handle the case when no data is returned
  }
  return (
    <>
      {loggedIn ? (
        <div className="w-full h-full">
          <h1 className="text-4xl font-semibold text-center text-indigo-500">
            <div className="inline-block p-4 bg-indigo-300 border border-b-4 border-r-4 border-black rounded-xl ">
              Welcome {data.returnUser.username}!
            </div>
          </h1>
          <div className="flex justify-center">
            <button
              onClick={() => setDisplayModal(true)}
              className="px-5 py-2 mt-4 font-medium text-white bg-indigo-400 border border-b-4 border-r-4 border-black rounded-lg shadow-lg hover:translate-y-1 hover:shadow-md"
            >
              <RiAddLine className="inline-block mr-2" />
              Add Project
            </button>
          </div>
          <div className="pt-2">
            <h2 className="text-xl font-semibold text-center text-indigo-400">
              Current Projects:
            </h2>
            <CurrentProjects />
          </div>

          <Modal displayModal={displayModal} setDisplayModal={setDisplayModal}>
            <ProjectForm setDisplayModal={setDisplayModal} />
          </Modal>
        </div>
      ) : (
        <div> You Must Log First In to Acess This Page! </div>
      )}
    </>
  );
};

export default Dashboard;
