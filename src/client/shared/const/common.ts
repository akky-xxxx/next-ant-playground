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
  buttonLabel: string
}

export const menuData: MenuItem[] = [
  {
    id: "top",
    href: "/",
    buttonLabel: "Top",
  },
  {
    id: "todo",
    href: "/todo",
    buttonLabel: "Todo",
  },
  {
    id: "pcComponents",
    href: "/pc-components",
    buttonLabel: "PC Components",
  },
  {
    id: "spComponents",
    href: "/sp-components",
    buttonLabel: "SP Components",
  },
  {
    id: "formTest",
    href: "/form-test",
    buttonLabel: "form test",
  },
]

export const pageNameMap: PageNameMap = menuData.reduce((obj, menuItem) => {
  const { id } = menuItem
  const newObj: PageNameMap = { ...obj }
  newObj[id] = id
  return newObj
}, {})
