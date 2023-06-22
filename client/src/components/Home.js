import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo, deleteTodo, getAddTodo, getDeleteTodo, test } from "../utils/socket";

const Home = () => {

  const [todos, setTodos] = useState([]);
  const [editModal, setEditModal] = useState("hidden");
  const [deleteModal, setDeleteModal] = useState("hidden");
  const [isAdd, setIsAdd] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    name: "",
    desc: "",
  });
  const [reload, setReload] = useState(false);
  const searchText = useRef();
  const navigate = useNavigate()
  useEffect(()=>{
    // test()
  getAddTodo(reload, setReload)
  getDeleteTodo(reload, setReload)
  },[])
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axios.get("/api/user/fetchall", {
          headers: {
            id: localStorage.getItem("id"),
          },
        });
        console.log(data);
        setTodos(data.todos);
      } catch (error) {
        console.log(error);
        if (error.response.data.msg)
          return alert(error.response.data.msg);
        alert('internal server error try later')
      }
    };
    fetchTodo();
  }, [reload]);

  async function update(e) {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "/api/user/addnedit",
        {
          name: currentTask.name,
          desc: currentTask.desc,
        },
        {
          headers: {
            id: localStorage.getItem("id"),
          },
        }
      );
      let msg = 'task updated'
      if (isAdd)
        msg = 'task added'

      setReload(!reload);
      setEditModal("hidden");
      addTodo(msg)
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response.data.msg)
        return alert(error.response.data.msg);
      alert('internal server error try later')
    }
  }
  async function deleteTask(e) {
    try {
      e.preventDefault();
      const { data } = await axios.delete(
        "/api/user/delete/" + currentTask.name,
        {
          headers: {
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log(data);

      setReload(!reload);
      setDeleteModal("hidden");
      deleteTodo()
    } catch (error) {
      console.log(error);
      if (error.response.data.msg)
        return alert(error.response.data.msg);
      alert('internal server error try later')
    }
  }
  async function search() {
    try {
      if (!searchText.current.value) {
        return setReload(!reload);
      }
      const { data } = await axios.get(
        "/api/user/search/" + searchText.current.value,
        {
          headers: {
            id: localStorage.getItem("id"),
          },
        }
      );
      setTodos(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response.data.msg)
        return alert(error.response.data.msg);
      alert('internal server error try later')
    }
  }
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (window.confirm('do you really want to logout')) {
              localStorage.removeItem('id')
              navigate('/')
            }
          }}
          type="submit"
          className="mb-3 mt-4  mx-4 bg-[#3b5998] flex  items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Sign Out
        </button>
      </div>
      <div className="mt-16">
        <label
          for="default-search"
          class="mb-2 mt-16 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          {/* <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div> */}
          <input
            onChange={search}
            ref={searchText}
            type="search"
            id="default-search"
            class="block w-4/5 mx-auto p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by name or description"
            required
          />
        </div>
      </div>

      <table class="table-auto w-full mt-8  text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xl py-32 text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Description
            </th>
            <th scope="col" class="px-6 py-3">
              Edit
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <>
              <tr className="bg-white border-b hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {todo.name}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {todo.desc}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <i
                    onClick={() => {
                      setIsAdd(false);
                      setCurrentTask(todo);
                      setEditModal("");
                    }}
                    className="fa fa-edit font-bold  text-blue-700  text-[24px] cursor-pointer"
                  ></i>
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <i
                    onClick={() => {
                      setCurrentTask(todo);
                      setDeleteModal("");
                    }}
                    className="fa fa-trash-o font-bold text-blue-700  text-[24px]    cursor-pointer"
                  ></i>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      {/* <!-- Edit modal --> */}
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`${editModal} fixed top-8  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {
                setIsAdd(false);
                setEditModal("hidden");
              }}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                {isAdd ? "Add Task" : "Update Task"}
              </h3>
              <form className="space-y-6" onSubmit={update}>
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    value={currentTask.name}
                    onChange={(e) =>
                      setCurrentTask({
                        ...currentTask,
                        name: e.target.value,
                      })
                    }
                    readOnly={!isAdd}
                    type="text"
                    placeholder="enter task name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white"
                  ></input>
                </div>
                <div>
                  <label
                    for="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    value={currentTask.desc}
                    onChange={(e) =>
                      setCurrentTask({
                        ...currentTask,
                        desc: e.target.value,
                      })
                    }
                    placeholder="enter task description"
                    type="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isAdd ? "Add" : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*delete modl*/}
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`${deleteModal} fixed top-8  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setDeleteModal("hidden")}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Delete Task
              </h3>
              <form className="space-y-6" onSubmit={deleteTask}>
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <h1
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white"
                  >
                    {currentTask.name}
                  </h1>
                </div>
                <div>
                  <label
                    for="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <h1
                    type="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white"
                  >
                    {currentTask.desc}
                  </h1>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <i
        onClick={() => {
          setCurrentTask({
            name: "",
            desc: "",
          });
          setIsAdd(true);
          setEditModal("");
        }}
        class="fixed text-blue-700 bottom-8 right-8 cursor-pointer text-[80px] fa fa-plus"
      ></i>
    </>
  );
};

export default Home;
