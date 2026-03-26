import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("currentUser")
      ? { email: localStorage.getItem("currentUser") }
      : null,
  );
  const signUp = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      return { success: false, message: "User already exists!!!" };
    }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);

    setUser({ email });
    return { success: true, message: "User registered successfully!!!" };
  };

  const logIn = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!existingUser) {
      return { success: false, message: "Invalid email or password!!!" };
    }

    localStorage.setItem("currentUser", email);
    return { success: true, message: "Logged in successfully!!!" };
  };

  const logOut = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
