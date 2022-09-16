import { defineStore } from 'pinia'

export const useControlPanelTabsStore = defineStore({
    id: 'controlPanelTabs',
    state: () => ({
        activeTabState: null as number | null
    }),
    getters: {
        activeTab: (state): number | null => state.activeTabState
    },
    actions: {
        setActive(id: number) {
            this.activeTabState = id
        }
    }
})