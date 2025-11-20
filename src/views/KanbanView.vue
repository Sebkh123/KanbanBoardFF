<template>
  <v-container fluid class="pa-6 task-board">
    <h1 class="text-h4 mb-6 title">Workspace Dashboard</h1>

    <v-row>
      <v-col
        v-for="column in columns"
        :key="column.id"
        cols="12"
        md="4"
      >
        <v-card
          class="pa-4 column-card"
          @dragover.prevent
          @drop="onDrop(column.id)">

        <v-card-title class="text-h6 column-title">
            {{ column.title }}
          </v-card-title>

          <v-divider class="my-2" />

          <!-- Tasks -->
          <div>
            <v-card
              v-for="task in tasksByStatus[column.id]"
              :key="task.id"
              class="my-3 pa-3 task-card"
              draggable="true"
              @dragstart="onDragStart(task.id)"
            >
              <div class="task-header">
                <span class="task-title">{{ task.title }}</span>

                <v-chip
                  small
                  :color="priorityColor(task.priority)"
                  class="priority-chip"
                >
                  {{ task.priority }}
                </v-chip>

                <div class="task-actions">
                  <v-btn size="small" @click.stop="editTask(task)">
                    <v-icon>mdi-pencil</v-icon>
                    Edit
                  </v-btn>
                  <v-btn size="small" @click.stop="deleteTask(task.id)">
                    <v-icon>mdi-delete</v-icon>
                    Delete
                  </v-btn>
                </div>
              </div>

              <p class="task-desc">{{ task.description }}</p>
            </v-card>
          </div>

          <v-btn
            block
            variant="outlined"
            class="mt-4"
            @click="openTaskForm(column.id)"
          >
            Add Task
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Task Form -->
    <v-dialog v-model="isTaskFormOpen" max-width="500px">
      <v-card>
        <v-card-title>{{ isEditingTask ? "Edit Task" : "New Task" }}</v-card-title>

        <v-card-text>
          <v-text-field label="Title" v-model="form.title" />
          <v-textarea label="Description" v-model="form.description" />

          <v-select
            label="Priority"
            :items="['high','medium','low']"
            v-model="form.priority"
          />

          <v-select
            label="Status"
            :items="columns"
            item-title="title"
            item-value="id"
            v-model="form.status"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeTaskForm">Cancel</v-btn>
          <v-btn variant="flat" color="primary" @click="submitTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useKanbanBoard } from "../composables/useKanbanBoard"
import type { Task, StatusId, Priority } from "../composables/useKanbanBoard"

const {
  columns,
  tasksByStatus,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
} = useKanbanBoard()

// Dragging
const draggedId = ref<number | null>(null)
function onDragStart(id: number) {
  draggedId.value = id
}
function onDrop(status: StatusId) {
  if (draggedId.value !== null) {
    moveTask(draggedId.value, status)
    draggedId.value = null
  }
}

// Form state
const isTaskFormOpen = ref(false)
const isEditingTask = ref(false)
const editedTaskId = ref<number | null>(null)

const form = ref({
  title: "",
  description: "",
  priority: "medium" as Priority,
  status: "todo" as StatusId,
})

// Open new task form
function openTaskForm(status: StatusId) {
  isEditingTask.value = false
  editedTaskId.value = null
  form.value = { title: "", description: "", priority: "medium", status }
  isTaskFormOpen.value = true
}

// Edit
function editTask(task: Task) {
  isEditingTask.value = true
  editedTaskId.value = task.id
  form.value = { ...task }
  isTaskFormOpen.value = true
}

function closeTaskForm() {
  isTaskFormOpen.value = false
}

function submitTask() {
  if (!form.value.title.trim()) return

  if (isEditingTask.value && editedTaskId.value !== null) {
    updateTask(
      editedTaskId.value,
      form.value.title,
      form.value.description,
      form.value.status,
      form.value.priority
    )
  } else {
    addTask(
      form.value.status,
      form.value.title,
      form.value.description,
      form.value.priority
    )
  }

  isTaskFormOpen.value = false
}

// Colours for priority chip
function priorityColor(priority: Priority) {
  switch (priority) {
    case "high": return "red"
    case "medium": return "orange"
    case "low": return "green"
  }
}
</script>
