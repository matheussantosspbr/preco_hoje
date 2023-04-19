import { useIdioma } from "../hooks/useIdioma";

export default function Header() {
    const {idioma} = useIdioma()

    let text = idioma === 'PT' ? 'Feito com ♥ pelo Dev. Matheus Santos.' : idioma == 'EN' ? 'Made with ♥ by Dev. Matheus Santos.' : 'Hecho con ♥ por Dev. Matheus Santos.'

    return (
        <footer className="h-[8vh] w-full flex items-center justify-center pb-8">
            <p className="text-black dark:text-white text-center m-0 xs:text-sm">
                {text}
                <br/>
                © 2022.
            </p>
        </footer>
  )
}