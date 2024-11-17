import { useEffect, useState } from 'react';
import Link from 'next/link';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Posts</h1>
            <Link href="/new-post" className="bg-blue-600 text-white px-4 py-2 rounded">
                Create New Post
            </Link>
            <div className="mt-4">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
                            <h2 className="text-2xl font-bold">{post.title}</h2>
                            <Link href={`/posts/${post.id}`} className="text-blue-600">
                                Edit
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    );
};

export default Posts;
