import React, { useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import { uploadImage } from '../utils/api';

const EditorContainer = styled.div`
  margin: 20px 0;
  .ql-editor {
    min-height: 300px;
  }
`;

const PostEditor = ({ content, setContent, token }) => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  React.useEffect(() => {
    if (!editorRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        },
      });

      quill.getModule('toolbar').addHandler('image', () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          if (file) {
            try {
              const formData = new FormData();
              formData.append('image', file); // Key 'image' matches multer
              const imageUrl = await uploadImage(formData, token);
              const range = quill.getSelection();
              quill.insertEmbed(range ? range.index : 0, 'image', imageUrl);
            } catch (err) {
              console.error('Image upload failed', err);
            }
          }
        };
      });

      quill.root.innerHTML = content;
      quill.on('text-change', () => {
        setContent(quill.root.innerHTML);
      });

      editorRef.current = quill;
    }
  }, [content, setContent, token]);

  return <EditorContainer><div ref={quillRef} /></EditorContainer>;
};

export default PostEditor;