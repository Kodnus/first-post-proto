import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/UseSupabase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfoLoading, setUserInfoLoading] = useState(true);

  const getUserInfo = async (userId) => {
    setUserInfoLoading(true);
    const { data, errorMsg } = await supabase
      .from("user_info")
      .select("user_industry")
      .eq("auth_fk", userId);
    setUserInfo(data);
    setUserInfoLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const initializeUser = async () => {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      const foundUserId = currentUser.id;
      getUserInfo(foundUserId);

      setLoading(false);
    };

    initializeUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, userInfo, userInfoLoading }}>
      {!loading && !userInfoLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
