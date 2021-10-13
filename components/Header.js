import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';

const USER_LOGGED = gql `
query USERLOGIN {
  user {
    status
    message
    user {
      _id
      email
      role
      name
      lastname
    }
  }
}
`;



const Header = () => {
    
    const router = useRouter()
    const { data , loading  } = useQuery( USER_LOGGED )
    if( loading ) {
        return (
            <div classNmae="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                <div classNmae="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if( !data.user.user ){
        return router.push('/login')
    }

    const handleClose = () => {

        localStorage.removeItem('token')
        router.push('login')

    }

    return (
        <div>
            <div className="flex justify-end">
                <h1>Bienvenido: {data.user.user.name } {data.user.user.lastname } </h1>

            <button className="ml-5 bg-blue-500 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
            onClick={ handleClose }
                > Cerrar Sesion </button>
            </div>

        </div>
    )
}

export default Header