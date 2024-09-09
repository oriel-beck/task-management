export interface Task {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: number;
}

export enum TaskStatus {
    ToDo = 1,
    InProgress,
    Done
} 

export const taskStatusPretty = {
    ToDo: "To Do",
    InProgress: "In Progress",
    Done: "Done"
}