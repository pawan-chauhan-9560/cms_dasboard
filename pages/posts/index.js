import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/posts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching posts.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                <Typography variant="h5" className="font-semibold animate-pulse">Loading...</Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-500 text-white">
                <Typography variant="h6" className="font-semibold">{error}</Typography>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-16 bg-gradient-to-b from-blue-100 via-indigo-200 to-purple-100">
            <Typography variant="h3" className="text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-12">
                All Posts
            </Typography>

            {/* Create New Post Button */}
            <div className="flex justify-center mb-8">
                <Link href="/new-post">
                    <Button
                        variant="contained"
                        color="info"
                        className="text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform font-medium text-lg"
                    >
                        Create New Post
                    </Button>
                </Link>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
                        >
                            <Typography variant="h5" className="font-semibold text-gray-800 mb-4">{post.title}</Typography>

                            <div className="flex space-x-4 mt-4">
                                {/* Edit Button */}
                                <Link href={`/posts/${post.id}`} passHref>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className="w-full sm:w-auto"
                                    >
                                        Edit
                                    </Button>
                                </Link>

                                {/* Update Button */}
                                <Link href={`/posts/${post.id}`} passHref>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        className="w-full sm:w-auto"
                                    >
                                        Update
                                    </Button>
                                </Link>

                                {/* Delete Button */}
                                <Link href={`/posts/${post.id}`} passHref>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        className="w-full sm:w-auto"
                                    >
                                        Delete
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <Typography variant="body1" className="text-center text-lg text-gray-600">No posts available</Typography>
                )}
            </div>
        </div>
    );
};

export default Posts;
