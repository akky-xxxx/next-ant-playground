export type PageName = "top" | "todo" | "pcComponents" | "spComponents"
type PageNameMap = {
  [key in PageName]?: PageName
}
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
]

export const pageNameMap: PageNameMap = menuData.reduce((obj, menuItem) => {
  const { id } = menuItem
  const newObj = { ...obj }
  newObj[id] = id
  return newObj
}, {})
