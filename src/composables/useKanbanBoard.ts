// src/composables/useKanbanBoard.ts

import { ref, computed } from "vue"

export type StatusId = "todo" | "inProgress" | "done"
export type Priority = "high" | "medium" | "low"

// Task model
export interface Task {
  id: number
  title: string
  description: string
  status: StatusId
  priority: Priority
}

export function useKanbanBoard() {
  const columns = [
    { id: "todo" as StatusId, title: "To Do" },
    { id: "inProgress" as StatusId, title: "In Progress" },
    { id: "done" as StatusId, title: "Done" }
  ]

  const tasks = ref<Task[]>([
    {
      id: 1,
      title: "Start the project",
      description: "This is an example task.",
      status: "todo",
      priority: "medium"
    }
  ])

  let nextId = 2

  const tasksByStatus = computed<Record<StatusId, Task[]>>(() => {

    const groups: Record<StatusId, Task[]> = {
      todo: [],
      inProgress: [],
      done: []
    }

    tasks.value.forEach(task => groups[task.status].push(task))
    return groups
  })

  function addTask(
    status: StatusId,
    title: string,
    description: string,
    priority: Priority
  ) {
    tasks.value.push({
      id: nextId++,
      title,
      description,
      status,
      priority
    })
  }

  function updateTask(
    id: number,
    title: string,
    description: string,
    status: StatusId,
    priority: Priority
  ) {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return

    task.title = title
    task.description = description
    task.status = status
    task.priority = priority
  }



  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function moveTask(id: number, newStatus: StatusId) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.status = newStatus
  }

  return {
    columns,
    tasksByStatus,
    addTask,
    updateTask,
    deleteTask,
    moveTask
  }
}
