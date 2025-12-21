import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/landingPage'
import { ThemeProvider } from './privoders/theme-provider'

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // const [count, setCount] = useState(0)
  // const ipcHandleSendData = (): void => {
  //   window.electron.ipcRenderer.send('my-message', { name: 'Aaron' })
  // }
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route index element={<LandingPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
