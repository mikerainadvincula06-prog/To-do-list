import { create } from "zustand";

const startingGroups = [
  { id: "school", name: "School Activities" },
  { id: "personal", name: "Personal Tasks" },
  { id: "projects", name: "Projects" }
];

export const useTaskStore = create((set) => ({
  groups: startingGroups,
  tasks: [
    { id: 1, title: "Review laboratory instructions", groupId: "school", done: false },
    { id: 2, title: "Prepare presentation", groupId: "school", done: true },
    { id: 3, title: "Organize my desk", groupId: "personal", done: false }
  ],

  addGroup: (name) => set((state) => ({
    groups: [...state.groups, { id: Date.now().toString(), name }]
  })),

  addTask: (title, groupId) => set((state) => ({
    tasks: [...state.tasks, { id: Date.now(), title, groupId, done: false }]
  })),

  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    )
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  }))
}));