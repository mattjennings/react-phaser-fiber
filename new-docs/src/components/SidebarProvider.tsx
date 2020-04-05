import React, { useMemo, useContext } from 'react'
import { useDisclosure } from '@chakra-ui/core'

export const SidebarContext = React.createContext({
  isSidebarOpen: false,
  openSidebar: () => null,
  closeSidebar: () => null,
})

export function SidebarProvider(props) {
  const { isOpen, onOpen, onClose } = useDisclosure(false)

  const value = useMemo(
    () => ({
      isSidebarOpen: isOpen,
      openSidebar: onOpen,
      closeSidebar: onClose,
    }),
    [isOpen, onClose, onOpen]
  )
  return (
    <SidebarContext.Provider value={value}>
      {props.children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
