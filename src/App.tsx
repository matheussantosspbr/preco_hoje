import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import ThemeContextProvider from './hooks/useTheme'
import IdiomaContextProvider from './hooks/useIdioma'
import Moeda1ContextProvider from './hooks/useMoeda1'
import Moeda2ContextProvider from './hooks/useMoeda2'
import Header from './layout/Header'
import Footer from './layout/Footer'

export default function App() {
  return (
      <BrowserRouter>
        <ThemeContextProvider>
          <Moeda1ContextProvider>
            <Moeda2ContextProvider>
              <IdiomaContextProvider>
                <Header/>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                 </Routes>
                 <Footer/>
                </IdiomaContextProvider>
              </Moeda2ContextProvider>
          </Moeda1ContextProvider>
        </ThemeContextProvider>
      </BrowserRouter>
  )
}


