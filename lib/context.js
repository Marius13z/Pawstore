import { createContext, useState } from "react";

export const UserContext = createContext()

export const SearchContext = createContext()

export function SearchProvider(props) {
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [closeSearch, setCloseSearch] = useState(false)

  const value = {
    open,
    setOpen,
    openMenu, 
    setOpenMenu,
    searchTerm,
    setSearchTerm,
    closeSearch,
    setCloseSearch
  }

  return(
    <SearchContext.Provider value={value}>
       {props.children}
    </SearchContext.Provider>
  )
}
