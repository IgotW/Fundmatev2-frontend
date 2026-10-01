const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
};

export const verifyOtp = async (email, otp) => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OTP verification failed.");
  }

  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
};

export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to retrieve profile.");
  }

  return data;
};

export const createGroup = async (groupData, token) => {
  const response = await fetch(`${API_URL}/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(groupData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create group.");
  }

  return data;
};

export const getMyGroups = async (token) => {
  const response = await fetch(`${API_URL}/groups/my-groups`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch groups.");
  }

  return data;
};

export const getGroupById = async (groupId, token) => {
  const response = await fetch(`${API_URL}/groups/${groupId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to retrieve group.");
  }

  return data;
};

export const addGroupMember = async (groupId, memberData, token) => {
  const response = await fetch(`${API_URL}/groups/${groupId}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(memberData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to add member.");
  return data;
};

export const startGroup = async (groupId, startDate, token) => {
  const response = await fetch(`${API_URL}/groups/${groupId}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ startDate }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to start the fund.");
  return data;
};

export const updateGroup = async (groupId, groupData, token) => {
  const response = await fetch(`${API_URL}/groups/${groupId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(groupData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update group.");
  return data;
};

export const deleteGroup = async (groupId, token) => {
  const response = await fetch(`${API_URL}/groups/${groupId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete group.");
  return data;
};

export const removeGroupMember = async (groupId, membershipId, token) => {
  const response = await fetch(`${API_URL}/groups/${groupId}/members/${membershipId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to remove member.");
  return data;
};

export const getContributionCycleSummary = async (cycleId, token) => {
  const response = await fetch(
    `${API_URL}/groups/contribution-cycles/${cycleId}/summary`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to retrieve contribution cycle summary.",
    );
  }

  return data;
};

export const generateMemberContributions = async (cycleId, token) => {
  const response = await fetch(
    `${API_URL}/contribution-cycles/${cycleId}/member-contributions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to generate member contributions.");
  }

  return data;
};

export const recordPayment = async (
  memberContributionId,
  paymentData,
  token,
) => {
  const response = await fetch(
    `${API_URL}/member-contributions/${memberContributionId}/payments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to record payment.");
  }

  return data;
};
