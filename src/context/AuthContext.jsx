import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import BASE_PATH from '@/utils/basePath';
import supabase from '../utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAndInsertUser = async (sessionuser) => {
    const { error } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', sessionuser.id)
      .single();

    if (error) {
      // User does not exist, insert new user
      const { error: insertError } = await supabase
        .from('users')
        .insert({ user_id: sessionuser.id, email: sessionuser.email });

      if (insertError) {
        console.error('Error inserting user:', insertError);
      } else {
        console.log('User inserted successfully');
      }
    } else {
      // User already exists
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session', error);
      } else {
        const sessionuser = data?.session?.user ?? null;
        setUser(sessionuser);
        if (sessionuser) {
          await checkAndInsertUser(sessionuser);
        }
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

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push(`${BASE_PATH}/login`);
  };

  return useMemo(
    () => (
      <AuthContext.Provider value={{ user, loading, logout }}>
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
