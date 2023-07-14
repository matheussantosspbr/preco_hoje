/* ====== Hooks ====== */
import { useIdioma } from '../hooks/useIdioma';

/* ======= Languagens ======= */
import PT from './languages/PT';
import EN from './languages/EN';
import ES from './languages/ES';

export default function languages(){
    const {idioma, setIdioma} = useIdioma()
    
    if(idioma == 'PT'){
        return PT()
    }else if (idioma == 'EN'){
        return EN()
    }else if (idioma == 'ES'){
        return ES()
    }else{
        return PT()
    }
}