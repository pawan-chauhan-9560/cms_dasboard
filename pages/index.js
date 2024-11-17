import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-blue-600 text-white py-4 shadow-md">
        <Typography variant="h4" align="center">
          My Blog
        </Typography>
      </header> */}

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6 bg-white shadow-md rounded-lg">
        <Typography variant="h5" gutterBottom align="center" className="mb-6">
          Posts
        </Typography>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Typography variant="h6" className="text-blue-700">
                  {post.title}
                </Typography>

                {/* Render HTML content */}
                <Typography
                  variant="body2"
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.content || "No content available." }}
                />
              </div>
            ))}
          </div>
        ) : (
          <Typography align="center" color="textSecondary">
            No posts available.
          </Typography>
        )}
      </main>

    </div>
  );
};

export default HomePage;
