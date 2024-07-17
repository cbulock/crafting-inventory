import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import supabase from '../../utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session', error);
      } else {
        setUser(data?.user ?? null);
      }
      setLoading(false);
    };

    getSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return useMemo(
    () => (
      <AuthContext.Provider value={{ user, loading }}>
        {children}
      </AuthContext.Provider>
    ),
    [user, loading],
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
