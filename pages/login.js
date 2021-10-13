import React, { useState } from "react"
import Layout from "../components/Layout"
import { gql, useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { useRouter } from "next/router"

const LOGIN = gql `
mutation LOGIN($input: LoginInput) {
  login(input: $input) {
    status
    message
    token
  }
}
`;

const login = () => {

    const router = useRouter()

    const [ login ] = useMutation( LOGIN )

    const [mensaje, setmensaje] = useState( null )

    const ShowMessage = () => {
        mensaje;
    }

    return (
        <>
            <Layout>

                { ShowMessage() }

                <h1 className="text-center text-white text-4xl font-bold"> LOGIN </h1>
                <div className=" flex justify-center mt-5">
                <div className=" w-full max-w-md">

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema ={ 
                        Yup.object({
                            email: Yup.string()
                                                .required('El Email es Obligatorio').email('El email no es Valido'),
                            password: Yup.string()
                                                .required('El Password es Requerido')
                                                .min(6, 'Minimo Seis Characteres ')
                        })
                    }
                    onSubmit={ async values  => {
                        const { email, password } = values;
                        try {
                            const { data, loading } = await login({
                                variables:{
                                    input:{
                                        email,
                                        password
                                    }
                                }
                            })
                            if( loading ) {
                                return (
                                    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                                    </div>
                                )
                            }

                            if ( data.login.status === false ){
                                return Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: `Acceso Incorrecto, ${ data.login.message }` ,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            const { token } = data.login
                            localStorage.setItem('token', token )
                            setmensaje( 
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: `Acceso Correcto ${ email }` ,
                                    showConfirmButton: false,
                                    timer: 1000
                                }) 
                            );
                            setTimeout(() => {
                                setmensaje( null ),
                                router.push('/')
                            }, 1500)
                        } catch (error) {
                            console.log( error);
                        }

                    }}
                >
                    {({

                    values,

                    errors,

                    touched,

                    handleChange,

                    handleBlur,

                    handleSubmit

                        }) => (
                        <form className=" bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={ handleSubmit }>
                            <div>
                                <label className="block text-grey-700 text-sm font-bold mb-2 " htmlFor="email"> Email </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="email"
                                type="email"
                                placeholder="user@email.com"
                                value={ values.email }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.email && touched.email ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.email } </p> 
                                    </div>
                                ) : null 

                            }

                            <div>
                                <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="password"> Password </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="password"
                                type="password"
                                placeholder="°°°°°°°°°"
                                value={ values.password }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.password && touched.password ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.password } </p> 
                                    </div>
                                ) : null 

                            }

                            <input 
                            type="submit" 
                            className="bg-gray-700 w-full text-white mt-5 p-2 uppercase hover:bg-gray-900 cursor-pointer block"
                            value="Iniciar Sesion"
                            ></input>
                        </form>
                )}
                </Formik>
            
                </div>

                </div>
                
            </Layout> 
        </>
    )
}

export default login
