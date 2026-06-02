export const getUserInfo = () => {
  const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

  if (!isBrowser) {
    return { email: null, role: null, username: null };
  }

  const name = "userAuth=";
  const cookieEntry = document.cookie.split('; ').find(row => row.startsWith(name));
  
  if (!cookieEntry) {
    return { email: null, role: null, username: null };
  }

  const cookieValue = cookieEntry.split('=')[1];

  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue));
    
    return {
      email: parsed?.email || null,
      role: parsed?.role || null,
      username: parsed?.username || null,
    };
  } catch (e) {
    return { email: null, role: null, username: null };
  }
};