import { useState } from "react"
import emailJs from '@emailjs/browser'
import  {useIdioma} from '../hooks/useIdioma'

export default function Support(){
    const publicToken = ( import.meta.env.VITE_PUBLIC_TOKEN_EMAILJS|| '').toString()
    const template = (import.meta.env.VITE_TEMPLATE_EMAILJS || '').toString()
    const service = (import.meta.env.VITE_SERVICE_EMAILJS || '').toString()
    const [openChat, setOpenChat] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const {idioma} = useIdioma()

    let text = {
        name: idioma == 'PT' ? 'Digite seu nome' : idioma == 'EN' ? 'Type your name' : 'Escriba su nombre',
        email: idioma == 'PT' ? 'Digite seu email para possivel contato' : idioma == 'EN' ? 'Enter your email for possible contact' : 'Introduce tu email para un posible contacto',
        message: idioma == 'PT' ? 'Digite sua mensagem' : idioma == 'EN' ? 'Enter your message' : 'Escribe tu mensaje',
    }

    function OpenChat(){
        if(openChat == false){
            setOpenChat(true)
        }else{
            setOpenChat(false)
        }
    }


    function sendEmail(e: { preventDefault: () => void }){
        e.preventDefault()
        setLoading(true)
        
        const templalteParams = {
            nome:name,
            message: message,
            email:email
        }
        emailJs.send(service, template, templalteParams, publicToken)
        .then((res)=>{
            location.reload()
            setName('')
            setEmail('')
            setMessage('')
        },(err)=>{
            location.reload()
        })
    }

    let screen = window.screen.width

    return(
        <>
            <div>
                {openChat == true ? (
                    <form onSubmit={sendEmail} className='pt-14 z-50 flex flex-col items-start justify-center fixed bottom-8 right-10 border-2 border-cyan-500 p-10 rounded-md bg-gray-900' >
                        <i onClick={OpenChat} className="fa-solid fa-xmark fa-xl absolute top-8 right-10" style={{color:'white'}}></i>
                        <div className="flex flex-col items-start justify-center">
                            <input type="text" placeholder={text.name} onChange={(e)=>setName(e.target.value)} value={name} minLength={3}
                            className="
                                bg-gray-900
                                border-2
                                border-cyan-500
                                pt-2 pb-2
                                pl-2 pr-2
                                mb-2
                                h-10
                                text-white
                                outline-none
                                rounded-md
                                text-sm
                                w-[30rem]
                                md:w-[calc(90vw)]"
                            required/>
                            <input type="email" placeholder={text.email} onChange={(e)=>setEmail(e.target.value)} value={email} 
                            className="
                            bg-gray-900
                                border-2
                                border-cyan-500
                                pt-2 pb-2
                                pl-2 pr-2
                                mb-2
                                h-10
                                text-white
                                outline-none
                                rounded-md
                                text-sm
                                w-[30rem]
                                md:w-[calc(90vw)]"
                            required/>
                            <textarea placeholder={text.message} onChange={(e)=>setMessage(e.target.value)} value={message} rows={15} cols={30}
                            className="
                            bg-gray-900
                            border-2
                            border-cyan-500
                            pt-1 pb-1
                            pl-2
                            pr-2
                            mb-2
                            text-white
                            outline-none
                            rounded-md
                            text-sm
                            w-[30rem]
                            md:w-[calc(90vw)]"
                            required></textarea>
                            {loading == true ? (
                                <button className="w-44 h-10 rounded-3xl border-2 text-white text-base pl-4 pr-4 bg-gray-900 border-cyan-500 hover:bg-cyan-500 transition-colors duration-[0.2s]" disabled>
                                    <i className="fa fa-spinner fa-spin"></i>
                                </button>
                            ) : (
                                <input type="submit" value="Enviar mensagem" className='w-44 h-10 rounded-3xl border-2 text-white text-base pl-4 pr-4 bg-gray-900 border-cyan-500 hover:bg-cyan-500 transition-colors duration-[0.2s]'/>
                            )}
                                                        
                        </div>
                    </form>
                )
                 :''}
            </div>
            {openChat == false && screen >= 633 ? (
                <button onClick={OpenChat} className="text-white fixed bottom-10 right-4 bg-cyan-500 h-16 w-16 rounded-full flex items-center justify-center" >
                    <i className="fa-solid fa-message fa-flip-horizontal fa-xl" style={{color:'white'}}></i>
                </button>
            ): ''}
        </>
    )
}