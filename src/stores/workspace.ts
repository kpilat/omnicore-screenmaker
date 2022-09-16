import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {fpComponent} from '@/types/fpComponent'

export const useWorkspaceStore = defineStore({
    id: 'workspaceStore',
    state: () => ({
        workspaceObjectState: null as HTMLElement | null,
        componentsState: [] as Array<fpComponent>
    }),
    getters: {
        workspaceObject: (state): HTMLElement | null => state.workspaceObjectState
    },
    actions: {
        setRef(ref: HTMLElement | null) {
            this.workspaceObjectState = ref
        },
        getComponents() {
            return this.componentsState
        },
        push(item: fpComponent) {
            this.componentsState.push(item)
        }
    }
})