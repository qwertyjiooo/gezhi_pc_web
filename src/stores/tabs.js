import { defineStore } from "pinia";
import routes from "@/router/routes";
import dbUtils from '@/utils/util.strotage.js'

export const useTabsStore = defineStore('tabs', () => {
    const tabsMenuList = ref(JSON.parse(dbUtils.get('tabsMenuList')) || []); // 标签页列表
    // 初始化标签页
    const initTabs = () => {
        const flatRoutes = (item) => { // 扁平化路由
            if (item.children) {
                item.children.map(child => {
                    flatRoutes(child)
                })
            } else if (item.meta.close) addTabs(item); // 用于是否固定标签页
        }
        // 过滤出 meta.isShow 为true的项
        routes.forEach(item => item.meta.isShow && flatRoutes(item));
    }
    // 添加标签页
    const addTabs = (tab) => {
        if (tabsMenuList.value.some(item => item.path === tab.path)) return;
        const tabsParams = {
            icon: tab.icon || '',
            name: tab.name || '',
            title: tab.meta.title || '',
            path: tab.path || '',
            close: tab.meta.close
        }
        tabsMenuList.value.push(tabsParams);
        dbUtils.set('tabsMenuList', tabsMenuList.value)
    }

    // 删除标签页
    const removeTabs = (path) => {
        const index = tabsMenuList.value.findIndex(item => item.path === path);
        if (index !== -1) {
            tabsMenuList.value.splice(index, 1);
            dbUtils.set('tabsMenuList', tabsMenuList.value);
        }
    }

    // 关闭所有标签页
    return {
        tabsMenuList,
        initTabs,
        addTabs,
        removeTabs
    }
})