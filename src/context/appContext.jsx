import React, { useReducer, useContext } from "react";

import reducer from "./reducer";

import axios from "axios";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  HANDLE_CHANGE,
  LOGOUT,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions.js";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  userLocation: userLocation || "",
  user: JSON.parse(user) || null,
  token: token || null,
  showSidebar: true,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["Full time", "Part time", "Remote", "Internship"],
  jobType: "Full time",
  statusOptions: ["Pending", "Declined", "Interview"],
  status: "Pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchType: "all",
  searchStatus: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const BASE_URL = "https://jopify-api.onrender.com/api/v1";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: BASE_URL,
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const dispatchAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const setupUser = async (currentUser, endpoint, alertText) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/${endpoint}`,
        currentUser
      );
      const { user, token, location } = response.data;

      // Storing user info in context and local storage
      addUserToLocalStorage({ user, token, location });
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
    } catch (err) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    removeFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.patch(`/auth/update-user`, currentUser);
      const { user, token, location } = data;

      addUserToLocalStorage({ user, token, location });

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText: "Profile updated successfully",
        },
      });
    } catch (err) {
      if (err.response.status !== 401) {
        dispatch({
          type: SETUP_USER_ERROR,
          payload: { msg: err.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (err) {
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { search, searchType, searchStatus, sort, page } = state;
    let url = `/jobs?page=${page}&jobType=${searchType}&status=${searchStatus}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (err) {
      logout();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { editJobId, company, status, jobLocation, position, jobType } =
        state;
      await authFetch.patch(`/jobs/${editJobId}`, {
        company,
        status,
        jobLocation,
        position,
        jobType,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (err) {
      if (err.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
    } catch (err) {
      logout();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch.get("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (err) {
      logout();
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatchAlert,
        clearAlert,
        setupUser,
        toggleSidebar,
        logout,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
