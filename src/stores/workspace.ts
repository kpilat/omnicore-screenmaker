import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWorkspaceStore = defineStore({
    id: 'workspaceStore',
    state: () => ({
        workspaceObjectState: null as HTMLElement | null
    }),
    getters: {
        workspaceObject: (state): HTMLElement | null => state.workspaceObjectState
    },
    actions: {
        setRef(ref: HTMLElement | null) {
            this.workspaceObjectState = ref
        }
    }
})