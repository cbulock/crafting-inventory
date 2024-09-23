import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import supabase from '../utils/supabaseClient';

const transformItems = (items) =>
  items.map((item) => ({
    ...item,
    tags: item.item_tags.map((tag) => ({
      id: tag.tag,
      name: tag.user_tags.name,
      color: tag.user_tags.color,
    })),
  }));

const useStore = create(
  persist(
    (set) => ({
      items: [],
      lowStockItems: [],
      projects: [],
      selectedProject: null,
      isLoadingItems: false,
      isLoadingLowStock: false,
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
              quantity,
              is_low_stock,
              item_tags (
                tag,
                user_tags (name, color)
              )
            `,
          )
          .eq('user', userId)
          .eq('project', projectId)
          .order('name', { ascending: true });

        if (error) {
          console.error('Error fetching items:', error);
        } else {
          set({ items: transformItems(data) });
        }
        set({ isLoadingItems: false });
      },
      fetchLowStock: async ({ userId }) => {
        set({ isLoadingLowStock: true });
        const { data, error } = await supabase
          .from('user_items')
          .select(
            `
              id,
              name,
              items (name),
              user_projects (id, name),
              quantity,
              is_low_stock,
              item_tags (
                tag,
                user_tags (name, color)
              )
            `,
          )
          .eq('user', userId)
          .eq('is_low_stock', true)
          .order('name', { ascending: true });

        if (error) {
          console.error('Error fetching items:', error);
        } else {
          set({ lowStockItems: transformItems(data) });
        }
        set({ isLoadingLowStock: false });
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
      refreshData: async ({ userId, projectId }) => {
        if (projectId) {
          await useStore.getState().fetchItems({ userId, projectId });
        }
        await useStore.getState().fetchLowStock({ userId });
      },
    }),
    {
      name: 'store',
      version: 1,
      partialize: (state) => ({
        selectedProject: state.selectedProject,
      }),
    },
  ),
);

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.store = useStore;
}
export default useStore;
