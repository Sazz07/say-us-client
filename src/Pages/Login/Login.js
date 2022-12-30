import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';



const Login = () => {
    const { signIn, setLoading, signInWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [token] = useToken(loginEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLoginSubmit = event => {
        event.preventDefault();
        setError('');

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        signIn(email, password)
            .then(result => {
                const user = result.user;
                setLoading(false);
                setLoginEmail(email);
                toast.success('Login Successfully');
                form.reset();
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
                setLoading(false);
            });
    };

    // Google Sign In

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                setLoading(false);
                toast.success('Login Successfully.');
                
                fetch('https://say-us-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ name: user?.displayName, photoURL: user?.photoURL, email: user?.email })
                })
                    .then(res => res.json())
                    .then(data => {
                        setLoginEmail(user?.email);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            });
    };
    // const { signIn, loading, setLoading, signInWithGoogle } = useContext(AuthContext);
    // const [error, setError] = useState('');

    // const [loginUserEmail, setLoginUserEmail] = useState('');
    // const [token] = useToken(loginUserEmail);

    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || '/';

    // if (token) {
    //     navigate(from, { replace: true });
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setError('');

    //     const form = event.target;
    //     const email = form.email.value;
    //     const password = form.password.value;

    //     login(email, password)
    //         .then(result => {
    //             const user = result.user;
    //             setLoading(false);
    //             setLoginUserEmail(user.email);
    //             form.reset();
    //         })
    //         .catch(error => setError(error.message))
    //         .finally(() => {
    //             setLoading(false);
    //         })

    // }

    // // const googleProvider = new GoogleAuthProvider();

    // // const handleGoogleSignIn = () => {
    // //     providerLogin(googleProvider)
    // //         .then(result => {
    // //             const user = result.user;
    // //             setLoading(false);

    // //             fetch('https://say-us-server.vercel.app/users', {
    // //                 method: 'POST',
    // //                 headers: {
    // //                     'content-type': 'application/json'
    // //                 },
    // //                 body: JSON.stringify({ name: user.displayName, photoURL: user.photoURL, email: user.email })
    // //             })
    // //                 .then(res => res.json())
    // //                 .then(data => {
    // //                     setLoginUserEmail(user.email);
    // //                 })
    // //                 .catch(err => console.log(err));
    // //         })
    // //         .catch(error => setError(error.message));
    // }
    return (
        // <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        //     <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        //         <div
        //             className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        //         </div>
        //         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        //             <div className="max-w-md mx-auto">
        //                 <div>
        //                     <h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
        //                 </div>
        //                 <div className="divide-y divide-gray-200">
        //                     <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        //                         <div className="relative">
        //                             <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
        //                             <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
        //                         </div>
        //                         <div className="relative">
        //                             <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
        //                             <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
        //                         </div>
        //                         <div className="relative">
        //                             <button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
        //                         </div>
        //                     </div>
        //                     <button type="button" class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
        //                         <div class="flex items-center justify-center">
        //                             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="b"><use xlink:href="#a" overflow="visible" /></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" /><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg>
        //                             <span class="ml-4">
        //                                 Log in
        //                                 with
        //                                 Google</span>
        //                         </div>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // <div class="bg-white">
        //     <div class="lg:grid lg:min-h-screen lg:grid-cols-5">
        //         <aside
        //             class="relative hidden lg:block lg:order-last lg:col-span-2 h-screen xl:col-span-2"
        //         >
        //             <img
        //                 alt="Pattern"
        //                 src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        //                 class="absolute inset-0 h-screen w-full object-cover"
        //             />
        //         </aside>

        //         <main
        //             aria-label="Main"
        //             class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-3 lg:pt-8 lg:px-16 xl:col-span-3"
        //         >
        //             <div class="bg-white dark:bg-gray-900 w-8/12">
        //                 <h4 className='text-center'>Login</h4>
        //                 <div class="container flex items-center justify-center px-6 mx-auto">
        //                     <form class="w-full max-w-md" onSubmit={handleSubmit}>
        //                         <div class="relative flex items-center mt-6">
        //                             <span class="absolute">
        //                                 <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        //                                 </svg>
        //                             </span>

        //                             <input required type="email" name='email' class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
        //                         </div>

        //                         <div class="relative flex items-center mt-4">
        //                             <span class="absolute">
        //                                 <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        //                                 </svg>
        //                             </span>

        //                             <input required type="password" name='password' class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
        //                         </div>

        //                         {
        //                             error && <p className='text-rose-500 mt-2'>{error}</p>
        //                         }

        //                         <div class="mt-6">
        //                             <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
        //                                 Login
        //                             </button>
        //                         </div>
        //                     </form>
        //                 </div>
        //                 <div class="w-full px-[13px] flex items-center justify-between mt-4">
        //                     <span class="w-5/12 border-b dark:border-gray-600"></span>

        //                     <span class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or</span>

        //                     <span class="w-5/12 border-b dark:border-gray-600"></span>
        //                 </div>
        //                 <div className='w-full px-[13px]'>
        //                     <button onClick={handleGoogleSignIn} class="w-full flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        //                         <div class="px-4 py-2">
        //                             <svg class="w-6 h-6" viewBox="0 0 40 40">
        //                                 <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
        //                                 <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
        //                                 <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
        //                                 <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
        //                             </svg>
        //                         </div>

        //                         <span class="px-3 py-3 font-bold text-center">Sign in with Google</span>
        //                     </button>
        //                 </div>

        //                 <div class="mt-6 text-center ">
        //                     <a href="/signup" class="text-sm text-blue-500 hover:underline dark:text-blue-400">
        //                         Don’t have an account yet? Sign up
        //                     </a>
        //                 </div>
        //             </div>
        //         </main>
        //     </div>
        // </div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Your Account</div>
                <button
                    onClick={handleGoogleSignIn}
                    className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                    <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i className="fab fa-facebook-f"></i></span>
                    <span className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" /> </svg>
                        <span className='ml-2'>Login With Google</span>
                    </span>
                </button>
                <div className="relative mt-10 h-px bg-gray-300">
                    <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                        <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
                    </div>
                </div>
                <div className="mt-10">
                    <form onSubmit={handleLoginSubmit}>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>

                                <input type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" required />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <span>
                                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>
                                </div>

                                <input type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" required />
                            </div>
                        </div>


                        {/* <div className="flex items-center mb-6 -mt-4">
                            <div className="flex ml-auto">
                                <Link
                                    className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</Link>
                            </div>
                        </div> */}

                        <div className="flex w-full">
                            <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-primary hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                <span className="mr-2 uppercase">Login</span>
                                <span>
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <Link
                        to='/signup'
                        className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                        <span>
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </span>
                        <span className="ml-2">You don't have an account? <span className='underline'>Sign Up Now</span></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;