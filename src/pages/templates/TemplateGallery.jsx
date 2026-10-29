import React from 'react';
import { Link } from 'react-router-dom';

const TemplateGallery = ({ category, title }) => {
  // On génère 5 placeholders de templates comme demandé
  const templates = [1, 2, 3, 4, 5].map(i => ({
    id: `template-${i}`,
    name: `${title} Style ${i}`,
    description: `Une superbe démonstration pour ${title} - Version ${i}`,
    previewImage: `https://via.placeholder.com/300x200?text=${title}+${i}`
  }));

  return (
    <div style={{ padding: '4rem 2rem', color: 'white', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem', color: '#00f2ff', textTransform: 'uppercase' }}>
        Modèles pour {title}
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {templates.map(t => (
          <div key={t.id} style={{
            border: '1px solid #333',
            borderRadius: '12px',
            padding: '1rem',
            backgroundColor: '#111',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <img src={t.previewImage} alt={t.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.name}</h3>
            <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>{t.description}</p>
            <Link
              to={`/templates/${category}/demo/${t.id}`}
              style={{
                backgroundColor: '#00f2ff',
                color: 'black',
                padding: '0.5rem 1.5rem',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Voir la Démo
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
