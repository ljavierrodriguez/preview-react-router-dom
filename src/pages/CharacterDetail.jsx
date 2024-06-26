import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CharacterDetail = () => {

    const [character, setCharacter] = useState(null)
    const params = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        getCharacterDetail(`https://rickandmortyapi.com/api/character/${params.id}`)
    }, [])

    const getCharacterDetail = (url, options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }) => {
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => setCharacter(data))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            User Detail {params?.user_id}
            {
                !!character ? (
                    <div className="alert alert-warning" role="alert">
                        Name: { character?.name}
                    </div>
                ):(
                    <div>Loading...</div>
                )
            }

            <button onClick={() => navigate('/')}>Regresar</button>

        </div>
    )
}

export default CharacterDetail