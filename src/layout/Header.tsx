import { useIdioma } from "../hooks/useIdioma";
import { useTheme } from "../hooks/useTheme"
import Logo from '/logo.svg'
import LogoDark from '/logoDark.svg'

export default function Header() {
    const {theme, setTheme} = useTheme()
    const {idioma, setIdioma} = useIdioma()

    return (
     <header className="h-[8vh] w-full text-white flex items-center justify-between">
        {theme === 'light'? (
                    <img src={Logo} className='w-20 h-20 mt-2' alt="Logo Preço hoje"/>
                ):(
                    <img src={LogoDark} className='w-20 h-20 mt-2' alt="Logo Preço hoje" />
                )}
        <div className="flex items-center justify-end w-48">
            <div>
                {theme === 'light'? (
                    <i className="fa-solid fa-moon text-gray-900 text-2xl mr-4"onClick={()=>setTheme('dark')}></i>
                ):(
                    <i className="fa-regular fa-lightbulb text-2xl text-white mr-4" onClick={()=>setTheme('light')}></i>
                )}
            </div>
            <div>
                <select className="bg-white text-black dark:text-white dark:bg-gray-900 px-2 py-1 outline-none" value={idioma} onChange={e => setIdioma(e.target.value)}>
                    <option value="PT" selected>Português</option>
                    <option value="EN">English</option>
                    <option value="ES">Español</option>
                </select>
            </div>
        </div>
     </header>
  )
}