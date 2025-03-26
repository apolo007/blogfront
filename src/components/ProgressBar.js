import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => props.progress}%;
  height: 5px;
  background: ${(props) => props.theme.colors.primary};
  transition: width 0.2s;
`;

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const percentage = (scrollPosition / totalHeight) * 100;
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <Bar progress={progress} />;
};

export default ProgressBar;