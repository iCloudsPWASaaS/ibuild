export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("userData");

  if (!token || !user) return false;

  try {
    const parsedUser = JSON.parse(user);

    // optional: check user status
    if (parsedUser?.status === 0) return false;

    return true;
  } catch (err) {
    return false;
  }
};