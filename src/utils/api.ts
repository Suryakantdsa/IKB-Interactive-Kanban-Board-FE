import { HTTP_BACKEND_URL } from "../config";
import { Task_POST, Task_GET } from "../interfaces/ITasks";

export const createTask = async (body: Task_POST) => {
  try {
    const res = await fetch(`${HTTP_BACKEND_URL}/create-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error("Failed to create task:", error.message);
    throw error;
  }
};

// Get All Tasks
export const getAllTasks = async (): Promise<Task_GET[]> => {
  try {
    const res = await fetch(`${HTTP_BACKEND_URL}/get-tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const getTaskDetails = async (id: string): Promise<Task_GET> => {
  try {
    const res = await fetch(`${HTTP_BACKEND_URL}/task-details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch task details for ID: ${id}`, error);
    throw error;
  }
};

export const updateTask = async (id: string, body: Partial<Task_POST>) => {
  try {
    const res = await fetch(`${HTTP_BACKEND_URL}/update-task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to update task with ID: ${id}`, error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const res = await fetch(`${HTTP_BACKEND_URL}/delete-task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to delete task with ID: ${id}`, error);
    throw error;
  }
};
