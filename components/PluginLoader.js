import dynamic from 'next/dynamic';

const plugins = {
    ImageSlider: dynamic(() => import('../plugins/ImageSlider')),
    // Add more plugins here
};

const PluginLoader = ({ pluginName }) => {
    const PluginComponent = plugins[pluginName];
    return PluginComponent ? <PluginComponent /> : null;
};

export default PluginLoader;
