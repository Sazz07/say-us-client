// import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import EditModal from './EditModal/EditModal';



const About = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`https://say-us-server.vercel.app/users`)
            .then((res) => res.json())
            .then((data) => {
                setDbUser(data);
                setLoading(false);
            });
    }, [loading]);
    // console.log(...dbUser);
    const userMatch = [...dbUser]?.find((x) => x.email === user?.email);
    // console.log(userMatch);

    const handleModalSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const university = event.target.university.value;
        const address = event.target.address.value;
        const photoURL = event.target.image.files[0];

        // console.log(name, email, password, image);
        const formData = new FormData();
        formData.append("image", photoURL);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;

        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                // console.log(imageData);
                const Update = {
                    name,
                    email,
                    university,
                    address,
                    photoURL: imageData?.data?.display_url,
                };
                // console.log(Update);
                fetch(`https://say-us-server.vercel.app/user/${userMatch._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(Update),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        toast.success("Update Successfully");
                        setLoading(true);
                    });
            });
    };
    // const { user } = useContext(AuthContext);

    // // const [loading, setLoading] = useState(true);

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const { data: selectedUser = [], refetch } = useQuery({
    //     queryKey: ['selectedUser', user?.email],
    //     queryFn: async () => {
    //         const res = await fetch(`https://say-us-server.vercel.app/users/${user?.email}`);
    //         const data = await res.json();
    //         return data;
    //     }
    // });

    return (
        // <div className="bg-gray-100 text-gray-800">
        //     <div className='flex justify-end pt-8 pr-8'>
        //         <button onClick={handleShow} className="px-8 py-1 text-lg font-semibold rounded bg-indigo-600 hover:bg-indigo-800 hover:text-white text-gray-50 no-underline">Edit</button>
        //     </div>
        //     <div className="container flex flex-col p-6 mx-auto lg:flex-row">
        //         <div className="flex items-center justify-center p-6 lg:pt-0 lg:mb-12 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
        //             {/* <img src={aboutImg} alt="about" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" /> */}
        //         </div>
        //         <div className='mx-auto my-4 lg:py-10'>
        //             <h3>About Me</h3>
        //             <p className='text-xl'>Name: {selectedUser.name}</p>
        //             <p className='text-xl'>Email: {selectedUser.email}</p>
        //             <p className='text-xl'>Institution: {selectedUser.institution}</p>
        //             <p className='text-xl'>Address: {selectedUser.address}</p>
        //         </div>
        //     </div>
        //     {/* <UserModal selectedUser={selectedUser} refetch={refetch} show={show} handleClose={handleClose}></UserModal> */}
        // </div>
        // <section className="pt-16 bg-blueGray-50">
        //     <div className="w-full lg:w-4/12 px-4 mx-auto">
        //         <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        //             <div className="px-6">
        //                 <div className="flex flex-wrap justify-center">
        //                     <div className="w-full px-4 flex justify-center">
        //                         <div className="relative">
        //                             {/* <img alt="..." src={user?.photoURL} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" /> */}
        //                             <img src={user?.photoURL} 
        //                             className="shadow-xl rounded-full h-auto align-middle border-none"
        //                             alt="" />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="text-center mt-12">
        //                     <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
        //                         Jenna Stones
        //                     </h3>
        //                     <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
        //                         <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
        //                         Los Angeles, California
        //                     </div>
        //                     <div className="mb-2 text-blueGray-600 mt-10">
        //                         <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
        //                         Solution Manager - Creative Tim Officer
        //                     </div>
        //                     <div className="mb-2 text-blueGray-600">
        //                         <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
        //                         University of Computer Science
        //                     </div>
        //                 </div>
        //                 <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
        //                     <div className="flex flex-wrap justify-center">
        //                         <div className="w-full lg:w-9/12 px-4">
        //                             <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
        //                                 An artist of considerable range, Jenna the name taken
        //                                 by Melbourne-raised, Brooklyn-based Nick Murphy
        //                                 writes, performs and records all of his own music,
        //                                 giving it a warm, intimate feel with a solid groove
        //                                 structure. An artist of considerable range.
        //                             </p>
        //                             <a href="javascript:void(0);" className="font-normal text-pink-500">
        //                                 Show more
        //                             </a>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <footer className="relative  pt-8 pb-6 mt-8">
        //         <div className="container mx-auto px-4">
        //             <div className="flex flex-wrap items-center md:justify-between justify-center">
        //                 <div className="w-full md:w-6/12 px-4 mx-auto text-center">
        //                     <div className="text-sm text-blueGray-500 font-semibold py-1">
        //                         Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </footer>
        // </section>
        // <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
        //     <div className="px-6">
        //         <div className="flex flex-wrap justify-center">
        //             <img src={user?.photoURL} alt="" className="shadow-xl rounded-full align-middle border-none absolute max-w-[150px]" />
        //             <div className="w-full mt-28">
        //                 <div className="flex justify-center lg:pt-4 pt-8 pb-0">
        //                     <button
        //                         htmlFor="booking-modal"
        //                         className='btn btn-outline btn-error'>Edit</button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="text-center mt-2">
        //             <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{user?.displayName
        //             }</h3>
        //             <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
        //                 <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Paris, France
        //             </div>
        //         </div>
        //         <div className="mt-6 py-6 border-t border-slate-200 text-center">
        //             <div className="flex flex-wrap justify-center">
        //                 <div className="w-full px-4">
        //                     <p className="font-light leading-relaxed text-slate-600 mb-4">An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm.</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <EditModal
        //         user={user}
        //         handleModalSubmit={handleModalSubmit}
        //         userMatch={userMatch}
        //         loading={loading}
        //     />
        // </div>
        <div className='mt-5'>
            <div className="flex justify-end">
                <label
                    htmlFor="booking-modal"
                    className="px-5 py-3 text-white btn btn-warning text-xl text-gary-300"
                >
                    Edit
                </label>
            </div>

            <div className="flex flex-col justify-center  p-6 shadow-md rounded-xl sm:px-12 ">
                <img
                    src={userMatch?.photoURL ? userMatch?.photoURL : user?.photoURL}
                    alt=""
                    className="w-32 h-32 mb-2 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                />
                <hr className="pt-2" />
                <div className="space-y-4 text-center divide-y ">
                    <div className="my-2 space-y-1">
                        <h2 className="text-2xl font-semibold sm:text-2xl">
                            {userMatch?.name ? userMatch?.name : user?.displayName}
                        </h2>
                        <h1 className="px-5 ">
                            Email :
                            <span className="pl-1">
                                {userMatch?.email ? userMatch?.email : user?.email}
                            </span>
                        </h1>
                        <h1 className="px-5 ">
                            University Name:
                            <span className="pl-1">
                                {userMatch?.university ? userMatch?.university : "N/A"}
                            </span>
                        </h1>
                        <h1 className="px-5 ">
                            Address:
                            <span className="pl-1">
                                {userMatch?.address ? userMatch?.address : "N/A"}
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
            <EditModal
                user={user}
                handleModalSubmit={handleModalSubmit}
                userMatch={userMatch}
            />
        </div>
    );
};

export default About;