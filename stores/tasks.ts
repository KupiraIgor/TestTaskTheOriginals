import { defineStore } from 'pinia'
import { initTasks } from '~/data'
import type { Col, Task, Performer, Tasks } from '~/types/tasks'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Tasks>([])
  const loading = ref<boolean>(true)

  const addColumn = (column: Col) => {
    tasks.value.push(column)
  }

  const deleteColumn = (id_status: string) => {
    tasks.value = tasks.value.filter((task) => task.id_status !== id_status)
  }

  const addTask = (id_status: string, body: Task) => {
    const column = tasks.value.find((col) => col.id_status === id_status)
    if (column) {
      column.list.push(body)
    }
  }

  const deleteTask = (taskId: string) => {
    tasks.value = tasks.value.map((status) => ({
      ...status,
      list: status.list.filter((task) => task.id !== taskId),
    }))
  }

  const updateTaskValue = (
    id_status: string,
    id: string,
    field: keyof Task,
    newValue: any,
  ) => {
    const column = tasks.value.find((col) => col.id_status === id_status)
    if (column) {
      const task = column.list.find((task) => task.id === id)

      if (task) {
        task[field] = newValue
      }
    }
  }

  const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  const getTasksLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      tasks.value = JSON.parse(storedTasks)
    } else {
      tasks.value = initTasks
    }
  }

  const changeStatus = (
    id: string,
    fromIdStatus: string,
    toIdStatus: string,
  ) => {
    const fromList = tasks.value.find(
      (task) => task.id_status === fromIdStatus,
    )?.list

    const toList = tasks.value.find(
      (task) => task.id_status === toIdStatus,
    )?.list

    if (fromList && toList) {
      const taskIndex = fromList.findIndex((task) => task.id === id)

      if (taskIndex !== -1) {
        //delete after modal close
        setTimeout(() => {
          const [task] = fromList.splice(taskIndex, 1)
          toList.push(task)
        }, 300)
      }
    }
  }

  onMounted(() => {
    watch(tasks, updateLocalStorage, { deep: true })
    loading.value = false
  })

  return {
    tasks,
    loading,
    addTask,
    addColumn,
    deleteColumn,
    updateTaskValue,
    getTasksLocalStorage,
    changeStatus,
    deleteTask,
  }
})
