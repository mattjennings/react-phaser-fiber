import React from 'react'
import { SidebarProvider } from '../components/SidebarProvider'

export default ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>
}
