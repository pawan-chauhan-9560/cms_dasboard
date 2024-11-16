import { useState, useEffect } from 'react';

const Plugins = () => {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        // Fetch available plugins from your server or a plugin repository
        fetch('/api/plugins')
            .then((response) => response.json())
            .then((data) => setPlugins(data))
            .catch((error) => console.error('Error fetching plugins:', error));
    }, []);

    const handleInstall = async (pluginId) => {
        const response = await fetch(`/api/plugins/install`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pluginId }),
        });
        if (response.ok) {
            console.log('Plugin installed successfully');
        } else {
            console.error('Failed to install plugin');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Available Plugins</h1>
            {plugins.length > 0 ? (
                plugins.map((plugin) => (
                    <div key={plugin.id} className="bg-white p-4 rounded shadow mb-4">
                        <h2 className="text-2xl font-bold">{plugin.name}</h2>
                        <button
                            onClick={() => handleInstall(plugin.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                        >
                            Install
                        </button>
                    </div>
                ))
            ) : (
                <p>No plugins available</p>
            )}
        </div>
    );
};

export default Plugins;
