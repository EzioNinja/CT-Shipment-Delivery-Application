import { adminRequest } from "../../../Helper/interceptor/axios";

// Helper function to handle API responses
const handleResponse = (response) => {
  if (response.data.success) {
    return response;
  } else {
    throw new Error(response.data.message);
  }
};

//=== adddriverpage
export const getCityDetails = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/getcitydetails`,
      method: "GET",
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

//=== dashboard
export const adminReports = async (city) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/adminReportByHub`,
      method: "POST",
      data: { city },
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getAllDashboardData = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/getAllData`,
      method: "POST",
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

//=== adminHeader
export const getAdminDetails = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/get-admininfo-id`,
      method: "POST",
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const addHubDetails = async (formDataToSend) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/add_driver`,
      method: "POST",
      data: formDataToSend,
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const trackUserShipment = async (trackInput) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/trackshipment`,
      method: "POST",
      data: { id: trackInput },
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getShipmentData = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/getshipmentdata`,
      method: "POST",
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const userDetails = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/get-useDetials`,
      method: "GET",
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const blockUser = async (email) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/blockuser`,
      method: "POST",
      data: { email },
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const unblockUser = async (email) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/unblockuser`,
      method: "POST",
      data: { email },
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};
