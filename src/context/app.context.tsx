import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import useAuthStore from '../store/auth.store';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

// Define the AuthContextState interface
export interface AuthContextState {
    user: User | null;
    isLoading: boolean;
}

// Create AuthContext with default values
export const AuthContext = createContext<AuthContextState>({
    isLoading: false,
    user: null,
});

// Define the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [initialLoader, setInitialLoader] = useState<boolean>(true);
    const { user, isLoading, setUser, setLoading } = useAuthStore();
    const navigate = useNavigate();

    // Memoize the value provided by the AuthContext
    const value = useMemo(() => ({
        user,
        isLoading,
    }), [user, isLoading]);

    // Setup an effect to handle authentication state changes
    useEffect(() => {
        // Listen for changes to the authenticated user
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                navigate('/');
            } else {
                setUser(null);
                navigate('/auth');
            }
            setInitialLoader(false);
            setLoading(false);
        });

        // Cleanup the subscription on component unmount
        return () => unsubscribe();
    }, [setUser, setLoading, navigate]);

    // Return the AuthContext.Provider with the current authentication state
    return (
        <AuthContext.Provider value={value}>
            {initialLoader ? 'Loading..' : children}
        </AuthContext.Provider>
    );
};
