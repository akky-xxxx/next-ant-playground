/**
 * import
 */
import { PageName, PageNameMap } from "../types/common"

/**
 * main
 */
interface MenuItem {
  id: PageName
  href: string
  label: string
}

export const menuData: MenuItem[] = [
  {
    id: "top",
    href: "/",
    label: "Top",
  },
  {
    id: "todo",
    href: "/todo",
    label: "Todo",
  },
  {
    id: "pcComponents",
    href: "/pc-components",
    label: "PC Components",
  },
  {
    id: "spComponents",
    href: "/sp-components",
    label: "SP Components",
  },
  {
    id: "formTest",
    href: "/form-test",
    label: "form test",
  },
  {
    id: "conditionForm",
    href: "/condition-form",
    label: "conditions",
  },
  {
    id: "antTable",
    href: "/ant-table",
    label: "ant Table",
  },
]

export const pageNameMap: PageNameMap = menuData.reduce((obj, menuItem) => {
  const { id } = menuItem
  const newObj: PageNameMap = { ...obj }
  newObj[id] = id
  return newObj
}, {})
