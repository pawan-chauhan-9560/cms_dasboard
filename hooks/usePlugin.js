import { createContext, useState } from 'react';

export const PluginContext = createContext();

export const PluginProvider = ({ children }) => {
    const [blocks, setBlocks] = useState({});

    const registerBlock = (name, component) => {
        setBlocks((prevBlocks) => ({
            ...prevBlocks,
            [name]: component,
        }));
    };

    const unregisterBlock = (name) => {
        setBlocks((prevBlocks) => {
            const newBlocks = { ...prevBlocks };
            delete newBlocks[name];
            return newBlocks;
        });
    };

    return (
        <PluginContext.Provider value={{ blocks, registerBlock, unregisterBlock }}>
            {children}
        </PluginContext.Provider>
    );
};
