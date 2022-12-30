import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MediaCard from '../MediaCard/MediaCard';

const Media = () => {
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://say-us-server.vercel.app/posts');
            const data = await res.json();
            return data;
        }
    });
    return (
        <div className='pt-10 pb-10 from-red-100 via-red-300 to-blue-500 bg-gradient-to-br'>
            <div className='w-3/4 mx-auto grid grid-col-1 gap-10'>
                {
                    posts.map((post) => <MediaCard key={post._id} post={post} refetch={refetch}></MediaCard>)
                }
            </div>
        </div>
    );
};

export default Media;