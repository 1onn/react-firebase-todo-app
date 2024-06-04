import React from 'react';
import '../components/About.scss';

const About = () => {
  return (
    <div className="about">
      <h1>About This App</h1>
      <p>This is a simple Todo application built with React and Firebase.</p>
      <p>It allows you to add, edit, delete, and toggle todos.</p>
      <p>The app is styled to look like Google Keep and includes dark mode.</p>
    </div>
  );
};

export default About;
