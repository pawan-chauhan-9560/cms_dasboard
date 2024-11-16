import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor = ({ value, onChange }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <ReactQuill value={value} onChange={onChange} />
        </div>
    );
};

export default Editor;
