import { useEffect } from 'react';
import { usePlugin } from '../hooks/usePlugin';

const ExampleBlockComponent = () => {
    return <div>Example Block</div>;
};

const EgPlugin = () => {
    const { registerBlock, unregisterBlock } = usePlugin();

    useEffect(() => {
        registerBlock('example-block', ExampleBlockComponent);
        return () => unregisterBlock('example-block');
    }, [registerBlock, unregisterBlock]);

    return <div>Example Plugin</div>;
};

export default EgPlugin;
