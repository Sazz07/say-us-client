import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MediaCard from '../MediaCard/MediaCard';

const Media = () => {
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            return data;
        }
    });
    return (
        <div className='mt-16 mb-28'>
            <div className='w-3/4 mx-auto grid grid-col-1 gap-10'>
                {
                    posts.map((post) => <MediaCard key={post._id} post={post} refetch={refetch}></MediaCard>)
                }
            </div>
        </div>
    );
};

export default Media;