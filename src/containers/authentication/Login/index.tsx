import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Pathname, Strings } from '../../../constants';
import { UserAuth } from '../../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate()
    const { currentUser, signIn , message} = UserAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onLogin = async (data: any) => {
        const { email, password } = data
        try {
           await signIn(email, password);

        } catch (error) {
            console.log("Error", error)
        }
    };

    useEffect(() => {
        if (currentUser) {
            navigate("/chat")
        }
    }, [currentUser]);

    return (
        <>
            <div className='h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        {Strings.signIn}
                    </h1>
                    <p>{message}</p>

                    <form onSubmit={handleSubmit(onLogin)}>
                        <div>
                            <label htmlFor='email'>{Strings.email}</label>
                            <input
                                {...register("email", { required: true })}
                                type='email'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='email'
                                placeholder='Your Email'
                            />
                        </div>
                        {errors.email && <span>This field is required</span>}

                        <div>
                            <label htmlFor='password'>{Strings.password}</label>
                            <input
                                {...register("password", { required: true })}
                                type='password'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='password'
                                placeholder='Your Password'
                            />
                        </div>
                        {errors.password && <span>This field is required</span>}

                        <div>
                            <p className='text-end text-sm'>{Strings.doNotHaveAccount} <span className='text-blue'><Link to={`/${Pathname.register}`}>{Strings.register}</Link></span></p>
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button
                                className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
                            >
                                {Strings.login}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login