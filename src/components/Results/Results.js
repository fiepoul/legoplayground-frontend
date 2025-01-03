import React from 'react';
import './Results.css';
import { jsPDF } from 'jspdf';

const Results = ({ legoList = [], recipe = '', onBack }) => {
  // Logik til opskriftshåndtering
  const lines = recipe.split('\n');
  const headline = lines[0]?.replace(/\*\*/g, '').trim(); // Fjern ** fra overskriften
  const description = lines[1]?.trim(); // Beskrivelse på anden linje

  const steps = lines
  .slice(1) // Fjern headline
  .filter((line) => line.trim() !== '') // Fjern tomme linjer
  .map((line, index) => {
    // Fjern stjerner og trim whitespace
    const cleanedLine = line.replace(/\*\*/g, '').trim();

    if (cleanedLine.startsWith(`Step ${index + 1}:`)) {
      return cleanedLine; // Bevar korrekt format
    }
    return `Step ${index + 1}: ${cleanedLine}`; // Tilføj nummerering, hvis det mangler
  });
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    // **Farver**
    const colors = {
      yellow: [204, 240, 0], // LEGO gul
      purple: [102, 51, 153], // LEGO lilla
      lime: [212, 255, 0], // LEGO lime
      white: [255, 255, 255], // LEGO hvid
      red: [255, 0, 0], // LEGO knap rød
      blue: [0, 123, 255], // LEGO knap blå
      black: [0, 0, 0], // Sort
    };
  
    const pageWidth = 210; // A4 bredde i mm
    const marginLeft = 10;
    const marginRight = 10;
    let cursorY = 30;
  
    // **1. Header**
    doc.setFillColor(...colors.purple);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(30);
    doc.setTextColor(...colors.lime);
    doc.text('LEGO PLAYGROUND', marginLeft, 20);
  
    cursorY += 30;
  
    // **2. LEGO Pieces Sektion**
    doc.setFillColor(...colors.yellow);
    doc.roundedRect(marginLeft, cursorY, pageWidth - marginLeft - marginRight, 15, 5, 5, 'F'); // Blå baggrund
    doc.setTextColor(...colors.purple);
    doc.setFontSize(18);
    doc.text('LEGO Pieces Detected:', marginLeft + 5, cursorY + 10);
  
    cursorY += 30;
  
    doc.setTextColor(...colors.black);
    doc.setFontSize(18);
    doc.setFont('Helvetica', 'normal');
    legoList.forEach((item) => {
      doc.text(`${item.quantity} x ${item.name}`, marginLeft + 10, cursorY);
      cursorY += 8;
    });
  
    cursorY += 15;
  
    // **3. Recipe Steps**
    doc.setFillColor(...colors.purple);
    doc.roundedRect(marginLeft, cursorY, pageWidth - marginLeft - marginRight, 15, 5, 5, 'F'); // Lilla baggrund
    doc.setTextColor(...colors.yellow);
    doc.setFontSize(18);
    doc.text('Recipe Steps:', marginLeft + 5, cursorY + 10);
  
    cursorY += 30;

    const maxWidth = pageWidth - marginLeft - marginRight;
  
    doc.setTextColor(...colors.black);
    doc.setFontSize(14);
    doc.setFont('Helvetica', 'normal');
    steps.forEach((step) => {
      // Opdel tekst i linjer baseret på maxWidth
      const wrappedText = doc.splitTextToSize(`- ${step}`, maxWidth);
    
      // Skriv hver linje og flyt cursoren
      wrappedText.forEach((line) => {
        doc.text(line, marginLeft + 5, cursorY);
        cursorY += 8; // Linjeafstand
    
        // Håndter sidehøjden
        if (cursorY > 260) {
          doc.addPage();
          cursorY = 30;
        }
      });
    });

  
    // **5. Footer**
    const footerHeight = 25;
    doc.setFillColor(...colors.purple);
    doc.rect(0, 297 - footerHeight, pageWidth, footerHeight, 'F'); // Gul baggrund med afrundede hjørner
    doc.setTextColor(...colors.yellow);
    doc.setFontSize(14);
    doc.text(
      'Build something amazing every day! © 2024 LEGO Playground',
      pageWidth / 2,
      297 - footerHeight / 2 + 4,
      { align: 'center' }
    );
  
    // Gem PDF
    doc.save('lego-recipe.pdf');
  };
  
    
  
  
  return (
    <div className="results-wrapper">
      <div className="results-container">
        <div className="results-column lego-list">
          <h2>LEGO Pieces Detected</h2>
          <ul>
            {legoList.map((piece, index) => (
              <li key={index}>{piece.quantity} x {piece.name}</li>
            ))}
          </ul>
        </div>
        <div className="results-column recipe">
          <h2>{headline || 'No Headline Available'}</h2>
          {description && <p className="recipe-description">{description}</p>}
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <div className="column-actions">
            <button onClick={onBack} className="button">New Upload</button>
            <button onClick={handleDownloadPDF} className="button">Download as PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

