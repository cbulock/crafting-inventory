import { create } from 'zustand';
import zustymiddleware from 'zustymiddleware';

import supabase from '../utils/supabaseClient';

const useStore = create(
  zustymiddleware((set) => ({
    items: [],
    projects: [],
    selectedProject: null,
    isLoadingItems: false,
    isLoadingProjects: false,
    fetchItems: async ({ projectId, userId }) => {
      set({ isLoadingItems: true });
      const { data, error } = await supabase
        .from('user_items')
        .select(
          `
      id,
      name,
      items (name),
      quantity
    `,
        )
        .eq('user', userId)
        .eq('project', projectId)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        set({ items: data });
      }
      set({ isLoadingItems: false });
    },
    fetchProjects: async (userId) => {
      set({ isLoadingProjects: true });
      const { data, error } = await supabase
        .from('user_projects')
        .select('id, name')
        .eq('user', userId)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        set({ projects: data });
      }
      set({ isLoadingProjects: false });
    },
    setSelectedProject: async (projectId) => {
      set({ selectedProject: projectId });
    },
  })),
);

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.store = useStore;
}
export default useStore;
