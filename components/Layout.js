import Link from 'next/link';
import Typography from "@mui/material/Typography";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">KGK CMS Dashboard</h1>
                <nav className="mt-2">
                    <Link href="/" className="text-white mr-4">Home</Link>
                    <Link href="/posts" className="text-white mr-4">Posts</Link>
                    <Link href="/new-post" className="text-white">New Post</Link>
                </nav>
            </header>

            <main className="flex-grow p-4">{children}</main>

            {/* Footer */}
            <footer id="footer" className="bg-gray-800 text-white text-center py-4 mt-auto">
                <Typography variant="body2">© 2024 My CMS. All rights reserved.</Typography>
            </footer>
        </div>
    );
};

export default Layout;
