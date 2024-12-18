import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import VerticalMenu from './components/VerticalMenu/VerticalMenu';
import Footer from './components/Footer/Footer';

function App() {
  const [ideas, setIdeas] = useState('');
  const [uploadResult, setUploadResult] = useState(''); // Resultater fra billed-upload

  // Funktion til at håndtere resultater fra billed-upload
  const handleUploadResult = (result) => {
    setUploadResult(result);
  };

  // Funktion til at generere idéer fra bricks
  const handleGenerateIdeas = async (bricks) => {
    try {
      const response = await axios.post('http://localhost:8080/api/lego/ideas', {
        bricks,
      });
      setIdeas(response.data);
    } catch (error) {
      console.error('Error generating LEGO ideas:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <VerticalMenu />
      <Hero
        handleUploadResult={handleUploadResult}
        uploadResult={uploadResult}
        handleGenerateIdeas={handleGenerateIdeas}
        ideas={ideas}
      />
      <Footer />
    </div>
  );
}

export default App;

