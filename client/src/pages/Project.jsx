import CritterContainer from "../components/CritterContainer";
import ProjectColumn from "../components/ProjectColumn";
import Modal from "../components/Modal";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { RETURN_PROJECT, RETURN_TASKS } from "../utils/query";
import TaskForm from "../components/AddTaskForm";

const Project = () => {
  const [displayModal, setDisplayModal] = useState(false);
  // collapse/expand column state
  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen(!open);
  };

  const url = window.location.href;
  const id = url.split("=").pop().trim();

  const { data, loading } = useQuery(RETURN_PROJECT, {
    variables: { input: id },
  });

  const { data: tasksData, loading: tasksLoading } = useQuery(RETURN_TASKS, {
    variables: { input: id },
  });

  if (loading) {
    return <p className="italic">Loading...</p>;
  }

  if (!data) {
    return <p className="italic">No data found.</p>;
  }

  let moodVal = 0;
  if (tasksLoading) {
    return <p className="p-2 italic">Loading...</p>;
  } else {
    const tasks = tasksData?.returnTasks || {};

    const filterTasks = (num) => {
      return tasks.filter((t) => t.taskstate === num);
    };
    moodVal =
      filterTasks(1).length * 0.05 +
      filterTasks(2).length * 0.2 +
      filterTasks(3).length;
  }

  return (
    <section className="flex flex-wrap md:flex-nowrap flex-col items-center justify-start w-full h-full md:h-[80vh] 3xl:h-[70vh]">
      {/* page heading */}
      <h2 className="self-start mb-4 text-3xl font-semibold text-indigo-500">
        {data.returnProject.title}
      </h2>

      {/* project container */}
      <div className="flex flex-col items-stretch w-full h-full min-h-0 space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        {/* critter column */}
        <div className="flex flex-col">
          <div
            className={`flex flex-col justify-between w-full min-h-0 p-2 space-y-4 bg-indigo-200 grow shrink-0 basis-full rounded-xl ${
              open ? `md:min-w-[277px] md:basis-1/4` : `md:min-w-fit md:basis-0`
            }`}
          >
            {/* collapse/expand button */}
            <button
              onClick={toggle}
              className={`self-end ${
                !open && "md:self-center"
              } text-white bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-800 rounded min-h-[42px] min-w-[42px] md:min-w-fit md:min-h-fit md:max-h-fit md:p-0.5 shrink`}
            >
              {/* up/down for mobile */}
              {open ? (
                <ChevronUpIcon className="block w-6 mx-auto md:hidden" />
              ) : (
                <ChevronDownIcon className="block w-6 mx-auto md:hidden" />
              )}
              {/* left/right for desktop */}
              {open ? (
                <ChevronLeftIcon className="hidden w-6 mx-auto md:block" />
              ) : (
                <ChevronRightIcon className="hidden w-6 mx-auto md:block" />
              )}
            </button>
            {open ? (
              <CritterContainer
                name={data.returnProject.critterName}
                born={data.returnProject.createdAt}
                moodVal={moodVal}
              />
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => setDisplayModal(true)}
            className="text-xl md:text-base w-full px-4 py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-400 active:bg-indigo-800 min-h-[42px] min-w-[42px] md:min-w-fit md:min-h-fit"
          >
            <RiAddLine className="inline-block text-white" />
            <span className="inline md:hidden"> Add Task</span>
            {/* hide text and only show + when the column is collapsed on desktop */}
            <span className="hidden md:inline">{open && " Add Task"}</span>
          </button>
        </div>
        {/* project columns container*/}
        <div className="flex flex-col items-stretch w-full h-full space-y-4 md:pb-1 2xl:pb-0 md:space-y-0 md:space-x-4 md:overflow-x-auto md:flex-row">
          <ProjectColumn title="Backlog" colNum={1} />
          <ProjectColumn title="Ready" colNum={2} />
          <ProjectColumn title="In Progress" colNum={3} />
          <ProjectColumn title="Done" colNum={4} />
        </div>
      </div>

      {/* add task modal */}
      <Modal displayModal={displayModal} setDisplayModal={setDisplayModal}>
        <TaskForm />
      </Modal>
    </section>
  );
};

export default Project;
