import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import { Link, useSearchParams } from 'react-router-dom'

const Home = () => {

    const [characters, setCharacters] = useState(null)
    const [page, setPage] = useState(1)

    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        getCharacters(`https://rickandmortyapi.com/api/character/?page=${page}`)
    }, [page])

    useEffect(() => {
        console.log(searchParams.get('page'))
        if (searchParams.get('page') !== null) setPage(parseInt(searchParams.get('page')))
    }, [searchParams])

    const getCharacters = (url, options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }) => {
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => setCharacters(data?.results))
            .catch((error) => console.log(error))
    }

    return (
        <>
            <div>Home</div>
            <Carousel />
            <ul className='list-group w-75 mx-auto my-4'>
                {
                    !!characters &&
                    characters.map((character) => {
                        return (
                            <li key={character.id} className='list-group-item list-group-item-action d-flex justify-content-between'>
                                <span>{character.name}</span>
                                <Link to={`/characters/${character.id}`}><i className="bi bi-eye"></i></Link>
                            </li>
                        )
                    })
                }

            </ul>
            <nav aria-label="Page navigation example" className='w-50 mx-auto'>
                <ul className="pagination">
                    <li className="page-item"><Link className="page-link" to={"/?page="+(page > 1 ? page-1 : page)}>Previous</Link></li>
                    <li className="page-item"><Link className="page-link" to={"/?page=1"}>1</Link></li>
                    <li className="page-item"><Link className="page-link" to={"/?page=2"}>2</Link></li>
                    <li className="page-item"><Link className="page-link" to={"/?page=3"}>3</Link></li>
                    <li className="page-item"><Link className="page-link" to={"/?page="+(page+1)}>Next</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Home