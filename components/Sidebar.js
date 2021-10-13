import { useRouter } from 'next/router'
import Link from 'next/link'


const Sidebar = () => {
    const router = useRouter()

    return (

        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-3">

            <div>
                <h1 className="text-white text-4xl font-black text-center"> CRM CLIENTES </h1>
            </div>

            <nav className=" list-none mt-8 ml-5">
                <li className={ router.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'}>
                    <Link href="/">
                        <a className="text-white font-black text-xl"> CLIENTES </a>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}

export default Sidebar
