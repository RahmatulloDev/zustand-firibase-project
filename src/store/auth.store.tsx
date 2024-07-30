import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
    isLoading: boolean;
    error: string;
    user: User | null;
    setLoading: (bool: boolean) => void;
    setError: (err: string) => void;
    setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isLoading: false,
    error: '',
    user: null,
    setLoading: (bool: boolean) => set(state => ({
        ...state, isLoading: bool
    })),
    setError: (err: string) => set(state => ({
        ...state, error: err
    })),
    setUser: (user: User | null) => set(state => ({
        ...state, user: user
    })),
}));

export default useAuthStore;
