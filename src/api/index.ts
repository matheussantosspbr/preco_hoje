import axios from 'axios'
import { useState } from 'react'

export default function index(): any {
    const [response, setResponse] = useState(null)


    const fetchQuotes = async () => {
        try {
            const res = await axios.get("https://api-precohoje.matheussantos.tech/agora", {
                headers: {},
                params: {}
            })

            setResponse(res.data) 
        } catch (err) {
            console.log(err);
        }
    }

    fetchQuotes();
    return response
}