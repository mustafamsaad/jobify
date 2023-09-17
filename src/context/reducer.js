import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT,
  HANDLE_CHANGE,
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
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      alertType: "danger",
      showAlert: true,
      alertText: "Please provide all values!",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      alertType: "",
      showAlert: false,
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      loading: false,
      alertText: action.payload.alertText,
      alertType: "success",
      showAlert: true,
      token: action.payload.token,
      user: action.payload.user,
      jobLocation: action.payload.location,
      userLocation: action.payload.location,
    };
  }

  if (action.type === LOGOUT) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      loading: false,
      alertText: action.payload.msg,
      alertType: "danger",
      showAlert: true,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "Full time",
      status: "Pending",
    };

    return { ...state, ...initialState };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertText: "New Job Created Successfully",
      alertType: "success",
      showAlert: true,
    };
  }

  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: "danger",
      showAlert: true,
    };
  }

  if (action.type === GET_JOBS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, company, position, status, jobLocation, jobType } = job;

    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      company,
      position,
      status,
      jobLocation,
      jobType,
    };
  }

  if (action.type === DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Job Updated Successfully",
      alertType: "success",
    };
  }

  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      showAlert: false,
      isLoading: true,
    };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchType: "all",
      searchStatus: "all",
      sort: "latest",
    };
  }

  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
