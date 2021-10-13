import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'
import Header from './Header'

const Layout = ({children }) => {

    const router = useRouter()
    
    return (
        <>
            <Head>

            <title>  Aplicacion de Next JS </title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"/>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
            </Head>

            { router.pathname === '/login' || router.pathname === '/register' ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    <div>

                        { children }
                        
                    </div>
                </div>
            ) : (
                
                <div className="bg-gray-200 min-h-screen">
                    <div className="flex min-h-screen">
    
                        <Sidebar></Sidebar>
    
    
                        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-3"> 
                            <Header />
                            { children }
    
                        </main>
    
                    </div>
                </div>
            )}
        </>
    )

}

export default Layout