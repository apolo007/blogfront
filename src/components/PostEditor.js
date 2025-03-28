import React, { useRef, useEffect, useState } from 'react';
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

const ToggleButton = styled.button`
  padding: 8px 16px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const RawEditor = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 15px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1rem;
`;

const PostEditor = ({ content, setContent, token }) => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [isRawMode, setIsRawMode] = useState(false);

  // Initialize Quill editor only once
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

              const altText = window.prompt('Enter alt text for the image:') || 'Image';

              const range = quill.getSelection() || { index: quill.getLength() };
              quill.insertEmbed(range.index, 'image', imageUrl);

              const imgIndex = range.index;
              quill.formatText(imgIndex, 1, {
                'alt': altText,
              });
            } catch (err) {
              console.error('Image upload failed', err);
            }
          }
        };
      });

      quill.root.innerHTML = content || '';
      quill.on('text-change', () => {
        console.log('Editor content:', quill.root.innerHTML);
        setContent(quill.root.innerHTML);
      });

      editorRef.current = quill;
    }
  }, [token, setContent]); // Removed isRawMode from dependencies

  // Update Quill content when content prop changes
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.root.innerHTML && !isRawMode) {
      editorRef.current.root.innerHTML = content || '';
    }
  }, [content, isRawMode]);

  // Handle raw HTML mode changes
  const handleRawChange = (e) => {
    setContent(e.target.value);
  };

  // Preserve content when switching modes
  const handleModeSwitch = () => {
    if (editorRef.current) {
      const currentContent = isRawMode ? content : editorRef.current.root.innerHTML;
      setContent(currentContent);
      setIsRawMode(!isRawMode);
    }
  };

  return (
    <EditorContainer>
      <ToggleButton onClick={handleModeSwitch}>
        {isRawMode ? 'Switch to WYSIWYG Editor' : 'Switch to Raw HTML Editor'}
      </ToggleButton>
      {isRawMode ? (
        <RawEditor
          value={content}
          onChange={handleRawChange}
          placeholder="Enter raw HTML here..."
        />
      ) : (
        <div ref={quillRef} />
      )}
    </EditorContainer>
  );
};

export default PostEditor;