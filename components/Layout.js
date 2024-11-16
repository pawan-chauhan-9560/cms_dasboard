import Link from 'next/link';

const Layout = ({ children }) => {
    return (

        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">KGK CMS Dashboard</h1>
                <nav className="mt-2">
                    <Link href="/" className="text-white mr-4">Home</Link>
                    <Link href="/posts" className="text-white mr-4">Posts</Link>
                    <Link href="/new-post" className="text-white">New Post</Link>
                </nav>
            </header>
            <main className="flex-grow p-4">{children}</main>
            <footer className="bg-blue-600 text-white p-4 text-center">
                &copy; 2024 My CMS
            </footer>
        </div>
    );
};

export default Layout;
