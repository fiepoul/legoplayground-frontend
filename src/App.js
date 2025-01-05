import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import HeroIntro from './components/Hero/HeroIntro';
import Results from './components/Results/Results';
import VerticalMenu from './components/VerticalMenu/VerticalMenu';
import Footer from './components/Footer/Footer';
import axios from 'axios';

function App() {
  const [legoList, setLegoList] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [uploadResult, setUploadResult] = useState('');
  const [view, setView] = useState('intro'); // Controls which view to show: 'intro' or 'results'

  const handleUploadResult = (result) => {
    setUploadResult(result);
    setView('results'); // Switch to results view
  };

  const handleGenerateIdeas = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post(
        'lego-assistant-backend-fge3cnabetgmc6ep.westeurope-01.azurewebsites.net/api/lego/ideas', // Adjust endpoint to match your backend
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setLegoList(data.legoList || []);
      setRecipe(data.recipe || '');
    } catch (error) {
      console.error('Error generating LEGO ideas:', error);
      throw new Error('An error occurred while processing the image. Please try again.');
    }
  };

  const handleBackToIntro = () => {
    setView('intro'); // Switch back to intro view
    setLegoList([]);
    setRecipe('');
    setUploadResult('');
  };

  return (
    <div className="App">
      <Header />
      <VerticalMenu />
      {view === 'intro' ? (
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





