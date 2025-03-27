import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import { uploadImage } from '../utils/api';
import ImageResize from 'quill-image-resize-module-react';

// Register ImageResize module
Quill.register('modules/imageResize', ImageResize);

// Custom Image Blot for alt text and styling
const ImageBlot = Quill.import('formats/image');
ImageBlot.className = 'custom-image';
ImageBlot.tagName = 'img';
ImageBlot.attributes = ['alt', 'width', 'height'];
Quill.register(ImageBlot, true);

const EditorContainer = styled.div`
  margin: 20px 0;
  .ql-editor {
    min-height: 300px;
    padding: 15px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .ql-editor img.custom-image {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 10px auto;
    border-radius: 4px;
  }
`;

const PostEditor = ({ content, setContent, token }) => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
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
          imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
          },
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
              formData.append('image', file);
              const imageUrl = await uploadImage(formData, token);

              // Prompt for alt text
              const altText = window.prompt('Enter alt text for the image:') || 'Image';

              const range = quill.getSelection() || { index: quill.getLength() };
              quill.insertEmbed(range.index, 'image', imageUrl);

              // Set alt text after inserting the image
              const imgIndex = range.index;
              quill.formatText(imgIndex, 1, {
                'alt': altText, // Only set alt attribute
              });
            } catch (err) {
              console.error('Image upload failed', err);
            }
          }
        };
      });

      quill.root.innerHTML = content || '';
      quill.on('text-change', () => {
        console.log('Editor content:', quill.root.innerHTML); // Debug log
        setContent(quill.root.innerHTML);
      });

      editorRef.current = quill;
    }
  }, [token, setContent]);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.root.innerHTML) {
      editorRef.current.root.innerHTML = content || '';
    }
  }, [content]);

  return <EditorContainer><div ref={quillRef} /></EditorContainer>;
};

export default PostEditor;