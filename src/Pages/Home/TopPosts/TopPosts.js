import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MediaCard from '../../Media/MediaCard/MediaCard';

const TopPosts = () => {
    const { data: topPosts = [] } = useQuery({
        queryKey: ['topPosts'],
        queryFn: async () => {
            const res = await fetch('https://say-us-server.vercel.app/topPosts');
            const data = await res.json();
            return data;
        }
    });

    return (
        topPosts?.length > 0 ?
            <div className='mb-28'>
                <h3 className='text-center text-4xl mt-5'>Top Posts</h3>
                <div className='w-10/12 mx-auto my-8 grid grid-col-1 gap-10'>
                    {
                        topPosts?.map((topPost) => <MediaCard key={topPost._id} post={topPost}></MediaCard>)
                    }
                </div>
            </div>
            :
            ''
    );
};

export default TopPosts;