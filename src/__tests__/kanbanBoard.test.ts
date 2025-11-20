import { describe, it, expect } from "vitest"
import { useKanbanBoard } from "../composables/useKanbanBoard"

describe("Kanban Board Task Logic", () => {

  it("adds a new task", () => {
    const { addTask, tasksByStatus } = useKanbanBoard()

    addTask("todo", "Test Task", "This is a test", "high")

    const value = tasksByStatus.value!
    const todoTasks = value.todo

    expect(todoTasks.length).toBe(2)
    expect(todoTasks[1]!.title).toBe("Test Task")
  })

  it("moves a task between columns", () => {
    const { moveTask, tasksByStatus } = useKanbanBoard()

    moveTask(1, "done")

    const value = tasksByStatus.value!
    const doneTasks = value.done

    expect(doneTasks.length).toBe(1)
    expect(doneTasks[0]!.id).toBe(1)
  })

  it("updates a task", () => {
    const { updateTask, tasksByStatus } = useKanbanBoard()

    updateTask(1, "Updated Title", "Updated Desc", "inProgress", "medium")

    const value = tasksByStatus.value!
    const progressTasks = value.inProgress

    expect(progressTasks.length).toBe(1)
    expect(progressTasks[0]!.title).toBe("Updated Title")
    expect(progressTasks[0]!.description).toBe("Updated Desc")
    expect(progressTasks[0]!.priority).toBe("medium")
  })

})
