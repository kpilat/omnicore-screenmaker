import { defineStore } from 'pinia'
import Tab from '@components/ribbon/OsTab.vue'
import { markRaw } from 'vue'
import { v4 as uuidv4 } from 'uuid'

type workspaceTabsType = {
    componentId: string,
    title: string,
    isActive: boolean,
    tab: typeof Tab
}

export const useWorkspaceTabsStore = defineStore({
    id: 'workspaceTabs',
    state: () => ({
        activeTabState: null as number | null,
        tabsState: [] as Array<workspaceTabsType>
    }),
    getters: {
        activeTab: (state): number | null => state.activeTabState,
        tabs: (state): Array<workspaceTabsType> => state.tabsState,
        count: (state): number => state.tabsState.length
    },
    actions: {
        deactivateAll() {
            this.tabsState.forEach((tab) => tab.isActive = false)
        },
        setActive(tab: workspaceTabsType) {
            this.deactivateAll()
            // this.tabsState.forEach((tab) => tab.isActive ? tab.isActive = false : tab.isActive = false)
            tab.isActive = true
        },
        createNewTab(title: string = 'New Tab') {
            this.deactivateAll()
            const newTab: workspaceTabsType = {
                componentId: uuidv4(),
                title,
                isActive: true,
                tab: markRaw(Tab),
            }
            this.tabsState.push(newTab)
        },
        closeTab(tab: workspaceTabsType) {
            if (this.tabsState.length < 2) return
            this.tabsState = this.tabsState.filter((item: workspaceTabsType) => item.componentId !== tab.componentId)
        }
    }
})