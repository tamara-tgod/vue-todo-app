<script setup lang="ts">
import { fetchTasks } from '@/services/api'
import { ref, onMounted, watch } from 'vue'

interface Task {
title?: string;
name?: string;
task?: string;
completed: boolean;
description?: string;
id: number;
}

// tasks state
const allTasks = ref<Task[]>([])
const filteredTasks = ref<Task[]>([])

// loading state
const loading = ref(true)
const error = ref<string | null>(null)

//pagination this.state
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10
const displayTasks = ref<Task[]>([])


// filter state
const searchTerm = ref<string>('')
const filterStatus = ref<string | null>('all')

const loadAllTasks = async () => {
  try {
    loading.value = true
    error.value = null

    const data = await fetchTasks(1, 1000)
    const tasks = data.tasks || []

    allTasks.value = tasks
    filteredTasks.value = tasks
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = "Failed to load tasks"
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAllTasks()
})

watch(
  [searchTerm, filterStatus, allTasks],
  () => {
    let result = [...allTasks.value]

    if (searchTerm.value.trim()) {
      result = result.filter(task => {
        const title = task.title || task.name || task.task || ''

        return title
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase())
      })
    }


    if (filterStatus.value === 'completed') {
      result = result.filter(task => task.completed === true)
    } else if (filterStatus.value === 'incomplete') {
      result = result.filter(task => task.completed === false)
    }

    filteredTasks.value = result
    currentPage.value = 1
  },
)


</script>

<template>
 <div className="max-w-7xl mx-auto px-4 py-8">
      <!-- Header  -->
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">My Tasks</h1>
      </div>

      <!-- Search & Filter Bar -->
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Tasks
          </label>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            aria-label='search tasks by title'
          />
        </div>

         <!-- Filter Buttons  -->
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <div className="flex flex-wrap gap-2">
            <button>

              All Tasks ({allTasks.length})
            </button>
            <button aria-label='show completed tasks only'>
              Completed ({allTasks.filter(t => t.completed).length})
            </button>
            <button aria-label='show incompleted tasks only'
            >
              Incomplete ({allTasks.filter(t => !t.completed).length})
            </button>
          </div>
        </div>

        <!-- Clear Filters  -->
        {(searchTerm || filterStatus !== 'all') && (
          <button className="mt-4 text-sm text-pink-600 hover:text-pink-800 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      <!-- Task List  -->
      <TaskList/>

      <!-- Pagination  -->
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button>
            ← Previous
          </button>

          <span className="px-6 py-3 bg-white rounded-lg shadow-md font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button>
            Next →
          </button>
        </div>
      )}
    </div>
</template>

<!-- <script setup lang="ts">
import { ref } from 'vue';

interface Task {
title?: string;
name?: string;
task?: string;
completed: boolean;
description?: string;
id: number;
}

// task data states
const allTasks = ref<Task[]>([])
const filteredTasks = ref<Task[]>([])
const displayTasks= ref<Task[]>([])

// loading state
const loading = ref(true)
const error = ref<string | null>(null)

//pagination this.state
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10


// filter state
const searchTerm = ref<string |null>('')
const filterStatus = ref<string | null>('all')
</script>
``` -->
