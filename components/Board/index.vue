<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
const store = useTasksStore()

const { tasks, loading } = storeToRefs(store)
</script>

<template>
  <section class="board">
    <div v-if="loading">Loading...</div>
    <div v-else class="board__wrap">
      <VueDraggable
        v-model="tasks"
        group="cols"
        class="board__cols"
        ghostClass="board__cols-ghost"
        :animation="150"
        handle="#column-drag-handle"
      >
        <template v-for="item of tasks" :key="item.status">
          <BoardColumnDrag
            v-model="item.list"
            :status="item.status"
            :id-status="item.id_status"
          />
        </template>
      </VueDraggable>
      <BoardAddColumn />
    </div>
  </section>
</template>

<style scoped lang="scss">
.board {
  &__cols {
    display: flex;
    gap: 20px;
    align-items: flex-start;

    &-ghost {
      opacity: 0.5;
    }
  }

  &__wrap {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
}
</style>
