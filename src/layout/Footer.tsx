
/* ====== Languages ====== */
import languages from "../translate";

export default function Header() {
    let language = languages().language
    return (
        <footer className="h-[8vh] w-full flex items-center justify-center pb-8">
            <p className="text-black dark:text-white text-center m-0 xs:text-sm">
                {language.footer}
                <br/>
                © 2022.
            </p>
        </footer>
  )
}