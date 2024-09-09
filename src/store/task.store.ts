import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Task } from "../types"
import { computed } from '@angular/core';

export interface TaskState {
    tasks: Task[];
    searchTerm: string;
}

const initialState: TaskState = {
    tasks: [],
    searchTerm: ""
}

export const TaskStore = signalStore(
    withState(initialState),
    withHooks((store) => ({
        onInit: () => {
            let tasks: Task[] = [];
            const localStorageData = localStorage.getItem("tasks");
            if (localStorageData) {
                try {
                    const data = JSON.parse(localStorageData);
                    tasks = data as Task[];
                } catch { }
            }
            patchState(store, { tasks });
        }
    })),
    withMethods((store) => ({
        addTask: (task: Task) => {
            const tasks = [task, ...store.tasks()];
            patchState(store, { tasks });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        editTask: (idx: number, task: Task) => {
            const tasks = [...store.tasks()];
            tasks[idx] = task;
            patchState(store, { tasks });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        deleteTask: (idx: number) => {
            const tasks = [...store.tasks()];
            tasks.splice(idx, 1);
            patchState(store, { tasks });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        search: (searchTerm: string) => {
            patchState(store, { searchTerm });
        }
    })),
    withComputed((store) => ({
        taskList: computed(() => {
            const tasks = store.tasks().map((task, idx) => ({ ...task, idx })) as ExtendedTask[];
            if (store.searchTerm()) return tasks.filter((t) => t.title.toLowerCase().startsWith(store.searchTerm().toLowerCase()));
            return tasks.sort((a, b) => a.status - b.status);
        })
    }))
);

export interface ExtendedTask extends Task {
    idx: number;
}
