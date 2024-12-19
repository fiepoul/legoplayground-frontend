import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import HeroIntro from './components/Hero/HeroIntro';
import VerticalMenu from './components/VerticalMenu/VerticalMenu';
import Footer from './components/Footer/Footer';
import HeroLegoList from './components/Hero/HeroLegoList';
import HeroRecipe from './components/Hero/HeroRecipe';

function App() {
  const [legoList, setLegoList] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [uploadResult, setUploadResult] = useState('');
  const [showIntro, setShowIntro] = useState(true); // Ny state for at styre visningen af HeroIntro

  const handleUploadResult = (result) => {
    setUploadResult(result);
    setShowIntro(false); // Skjul intro containeren, når billedet er uploadet
  };

  const handleGenerateIdeas = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await axios.post('http://localhost:8080/api/lego/ideas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const { legoList, recipe } = response.data;
      setLegoList(legoList);
      setRecipe(recipe);
    } catch (error) {
      console.error('Error generating LEGO ideas:', error);
    }
  };

  const handleBackToIntro = () => {
    setShowIntro(true); // Gå tilbage til intro containeren
    setLegoList([]); // Ryd listen
    setRecipe(''); // Ryd opskriften
    setUploadResult('');
  };

  return (
    <div className="App">
      <Header />
      <VerticalMenu />
      {showIntro ? (
        <HeroIntro 
          handleUploadResult={handleUploadResult} 
          handleGenerateIdeas={handleGenerateIdeas} 
          uploadResult={uploadResult} 
        />
      ) : (
        <div className="results-container">
          <HeroLegoList legoList={legoList} />
          <HeroRecipe recipe={recipe} />
          <button onClick={handleBackToIntro} className="back-button">
            Back to Upload
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;



