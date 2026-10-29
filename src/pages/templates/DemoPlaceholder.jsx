import React from 'react';

const DemoPlaceholder = ({ themeId }) => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#00f2ff' }}>Template Démo: {themeId}</h1>
      <p style={{ fontSize: '1.2rem', color: '#aaa' }}>
        Le contenu réel du template sera inséré ici plus tard.
      </p>
      <a href="/" style={{
        marginTop: '2rem',
        color: '#00f2ff',
        textDecoration: 'underline'
      }}>
        Retour à l'accueil
      </a>
    </div>
  );
};

export default DemoPlaceholder;
