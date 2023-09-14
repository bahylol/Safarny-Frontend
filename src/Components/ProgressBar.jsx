import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            setScrollProgress(progress);
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', updateScrollProgress);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', updateScrollProgress);
        };
    }, []);

    return (
        <progress className="progress progress-primary w-full fixed top-0 z-30" value={scrollProgress} max="100"></progress>
    );
}

export default ProgressBar;
