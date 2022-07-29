import { defineStore } from 'pinia'
import Tab from '@components/ribbon/Tab.vue'
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
        tabsSate: [] as Array<workspaceTabsType>
    }),
    getters: {
        activeTab: (state): number | null => state.activeTabState,
        tabs: (state): Array<workspaceTabsType> => state.tabsSate
    },
    actions: {
        deactivateAll() {
            this.tabsSate.forEach((tab) => tab.isActive = false)
        },
        setActive(tab: workspaceTabsType) {
            this.deactivateAll()
            // this.tabsSate.forEach((tab) => tab.isActive ? tab.isActive = false : tab.isActive = false)
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
            this.tabsSate.push(newTab)
        },
        closeTab(tab: workspaceTabsType) {
            this.tabsSate = this.tabsSate.filter((item: workspaceTabsType) => item.componentId !== tab.componentId)
        }
    }
})