import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import HeroIntro from './components/Hero/HeroIntro';
import Results from './components/Results/Results';
import VerticalMenu from './components/VerticalMenu/VerticalMenu';
import Footer from './components/Footer/Footer';

function App() {
  const [legoList, setLegoList] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [uploadResult, setUploadResult] = useState('');
  const [showIntro, setShowIntro] = useState(true);

  const handleUploadResult = (result) => {
    setUploadResult(result);
    setShowIntro(false);
  };

  const handleGenerateIdeas = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post(
        'https://lego-assistant-backend-fge3cnabetgmc6ep.westeurope-01.azurewebsites.net/api/lego/ideas',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setLegoList(data.legoList || []);
      setRecipe(data.recipe || '');
    } catch (error) {
      console.error('Error generating LEGO ideas:', error);
    }
  };

  const handleBackToIntro = () => {
    setShowIntro(true);
    setLegoList([]);
    setRecipe('');
    setUploadResult('');
  };

  return (
    <div className="App">
      <Header handleBackToIntro={handleBackToIntro} />
      <VerticalMenu />
      {showIntro ? (
        <HeroIntro
          handleUploadResult={handleUploadResult}
          handleGenerateIdeas={handleGenerateIdeas}
          uploadResult={uploadResult}
        />
      ) : (
        <Results
          legoList={legoList}
          recipe={recipe || { description: '', steps: [] }}
          onBack={handleBackToIntro}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;





