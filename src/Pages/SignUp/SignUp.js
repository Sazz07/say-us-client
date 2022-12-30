import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { createUser, updateUser, signInWithGoogle, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [token] = useToken(signUpEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        setError('');

        createUser(email, password)
            .then(result => {
                const user = result.user;

                toast.success('Congratulation. Sign Up complete.');
                setLoading(false);
                form.reset();

                const userInfo = {
                    displayName: name,
                };
                updateUser(userInfo)
                    .then(() => {
                        saveUser(name, email);
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            });

    };

    // handle Google Sign in

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                setSignUpEmail(user?.email);
                saveUser(user?.displayName, user?.email, user?.photoURL);
                toast.success('Congratulation. Sign Up complete.');
            })
            .catch(error => console.error(error));
    };

    // save user to the database 

    const saveUser = (name, email, photoURL) => {
        const user = {
            name,
            email,
            photoURL
        };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setSignUpEmail(email);
            })
            .catch(err => console.log(err));

    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Create An Account</div>
                <button
                    onClick={handleGoogleSignIn}
                    className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                    <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i className="fab fa-facebook-f"></i></span>
                    <span className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" /> </svg>
                        <span className='ml-2'>Signup with Google</span>
                    </span>
                </button>
                <div className="relative mt-10 h-px bg-gray-300">
                    <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                        <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
                    </div>
                </div>
                <div className="mt-10">
                    <form onSubmit={handleSignUp}>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="name" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Name:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <input type="text"
                                    name='name'
                                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" required placeholder="Enter Your Name" />

                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input type="email"
                                    name='email'
                                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" required />

                            </div>
                        </div>
                        {/* <div className='flex flex-col mb-6"'>
                            <label htmlFor='image' className='block mb-1 text-xs sm:text-sm tracking-wide text-gray-600'>
                                Select Image:
                            </label>
                            <input
                                type='file'
                                id='image'
                                {...register("image")}
                                accept='image/*'

                            />
                        </div> */}
                        <div className="flex flex-col mb-5">
                            <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <span>
                                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    name='password'
                                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" required />

                            </div>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label htmlFor="role" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">What you want to be?:</label>
                            <select type="text"
                                name='role'
                                className="select select-bordered text-sm sm:text-base pr-4 rounded-lg border border-gray-400 w-full py-2" required>
                                <option selected value="buyer">buyer</option>
                                <option value="seller">seller</option>
                            </select>
                        </div>

                        {/* <div className="flex items-center mb-6 -mt-4">
                            <div className="flex ml-auto">
                                <Link
                                    className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</Link>
                            </div>
                        </div> */}

                        <div className="flex w-full">
                            <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-primary hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                <span className="mr-2 uppercase">Signup</span>
                                <span>
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </button>
                            <br />
                            {error && <p className='text-rose-600 text-sm'>{error}</p>}
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <Link
                        to='/login'
                        className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                        <span>
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                            </svg>
                        </span>
                        <span className="ml-2">Already have an account? <span className='underline'>Please login.</span></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;