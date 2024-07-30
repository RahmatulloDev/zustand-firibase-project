import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase/index"; // Corrected import from "insex" to "index"
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const useAuth = () => {
  const { user, setUser, isLoading, setLoading, error, setError } =
    useAuthStore();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(""); // Reset error state before trying to sign up
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(res.user);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(""); // Reset error state before trying to sign in
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(res.user);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(""); // Reset error state before trying to log out
    try {
      await signOut(auth);
      setUser(null);
      navigate("/auth");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { signUp, signIn, logout, isLoading, error, user };
};

export default useAuth;
