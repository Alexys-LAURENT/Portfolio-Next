import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.tsx'
import './index.css'
import MessageContextProvider from './context/MessageContext.tsx'
import RefreshApiContextProvider from './context/RefreshApiContext.tsx'
import DrawerContextProvider from './context/DrawerContext.tsx'
import DrawerItem from './components/Drawer.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <NextUIProvider>
    <MessageContextProvider>
      <RefreshApiContextProvider>
        <DrawerContextProvider>
          <App />
          <DrawerItem />
        </DrawerContextProvider>
      </RefreshApiContextProvider>
    </MessageContextProvider>
  </NextUIProvider>
  // </React.StrictMode>,
)
