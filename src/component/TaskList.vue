<script setup lang="ts">
interface Task {
  id: number
  completed: boolean
  title?: string
  name?: string
  task?: string
  description?: string
}

defineProps<{
  tasks: Task[]
}>()
</script>

<template>
  <div class="grid gap-4">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="bg-white rounded-lg shadow p-4"
    >
      <h3 class="font-semibold text-lg">
        {{ task.title || task.name || task.task }}
      </h3>

      <p
        v-if="task.description"
        class="text-gray-600 mt-2"
      >
        {{ task.description }}
      </p>

      <span
        class="inline-block mt-3 text-sm"
      >
        {{ task.completed ? '✅ Completed' : '⏳ Incomplete' }}
      </span>
    </div>
  </div>
</template>
