<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { fetchTasks } from '@/services/api'
import TaskList from '@/component/TaskList.vue'

interface Task {
  id: number
  completed: boolean
  title?: string
  name?: string
  task?: string
  description?: string
}

// state
const tasks = ref<Task[]>([])
const loading = ref(false)
const error = ref('')

const search = ref('')
const filter = ref<'all' | 'completed' | 'incomplete'>('all')

const currentPage = ref(1)
const itemsPerPage = 10

// fetch tasks
const loadTasks = async () => {
  loading.value = true
  error.value = ''

  try {
    const data = await fetchTasks(1, 1000)
    tasks.value = data.tasks ?? []
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : 'Failed to fetch tasks'
  } finally {
    loading.value = false
  }
}

onMounted(loadTasks)

// helpers
const getTaskTitle = (task: Task) =>
  task.title || task.name || task.task || 'Untitled Task'

// filtering
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesSearch = getTaskTitle(task)
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchesFilter =
      filter.value === 'all'
        ? true
        : filter.value === 'completed'
        ? task.completed
        : !task.completed

    return matchesSearch && matchesFilter
  })
})

// pagination
const totalPages = computed(() =>
  Math.ceil(filteredTasks.value.length / itemsPerPage)
)

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage

  return filteredTasks.value.slice(
    start,
    start + itemsPerPage
  )
})

// stats
const completedCount = computed(
  () => tasks.value.filter(t => t.completed).length
)

const incompleteCount = computed(
  () => tasks.value.filter(t => !t.completed).length
)

// reset page when filters change
watch([search, filter], () => {
  currentPage.value = 1
})

// pagination handlers
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <section class="max-w-6xl mx-auto p-4 space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">
          Tasks
        </h1>

        <p class="text-sm text-gray-500">
          {{ filteredTasks.length }} task(s)
        </p>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white border rounded-xl p-4 space-y-4">

      <!-- Search -->
      <input
        v-model="search"
        type="text"
        placeholder="Search tasks..."
        class="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
      />

      <!-- Filters -->
      <div class="flex flex-wrap gap-2">

        <button
          @click="filter = 'all'"
          :class="[
            'px-3 py-2 rounded-lg border text-sm',
            filter === 'all'
              ? 'bg-pink-500 text-white border-pink-500'
              : 'bg-white'
          ]"
        >
          All ({{ tasks.length }})
        </button>

        <button
          @click="filter = 'completed'"
          :class="[
            'px-3 py-2 rounded-lg border text-sm',
            filter === 'completed'
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-white'
          ]"
        >
          Completed ({{ completedCount }})
        </button>

        <button
          @click="filter = 'incomplete'"
          :class="[
            'px-3 py-2 rounded-lg border text-sm',
            filter === 'incomplete'
              ? 'bg-yellow-500 text-white border-yellow-500'
              : 'bg-white'
          ]"
        >
          Pending ({{ incompleteCount }})
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="text-center py-10 text-gray-500"
    >
      Loading tasks...
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="bg-red-100 text-red-600 p-4 rounded-lg"
    >
      {{ error }}
    </div>

    <!-- Content -->
    <template v-else>

      <!-- Empty State -->
      <div
        v-if="paginatedTasks.length === 0"
        class="text-center py-10 border rounded-xl text-gray-500"
      >
        No tasks found.
      </div>

      <!-- Task List -->
      <TaskList
        v-else
        :tasks="paginatedTasks"
      />

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-center gap-4"
      >
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span class="text-sm font-medium">
          {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </template>
  </section>
</template>
