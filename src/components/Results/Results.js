import React from 'react';
import './Results.css';
import { jsPDF } from 'jspdf';

const Results = ({ legoList = [], recipe = '', onBack }) => {
  // Logik til opskriftshåndtering
  const lines = recipe.split('\n');
  const headline = lines[0]?.replace(/\*\*/g, '').trim(); // Fjern ** fra overskriften
  const description = lines[1]?.trim(); // Beskrivelse på anden linje

  const steps = lines.slice(2) // Resten er trin
    .map(line => line.replace(/\*\*Step \d+:\*\*/g, '').trim()) // Fjern **Step X:** og trim linjen
    .filter(step => step); // Fjern tomme linjer

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(18);
    doc.text(headline || 'LEGO Recipe', 10, 10);

    doc.setFontSize(14);
    doc.text(description || 'No description available.', 10, 20);

    steps.forEach((step, index) => {
      doc.text(`${index + 1}. ${step}`, 10, 30 + index * 10);
    });

    legoList.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.quantity} x ${item.name}`, 10, 30 + (steps.length + index) * 10);
    });

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
            <button onClick={onBack} className="button">Back to Upload</button>
            <button onClick={handleDownloadPDF} className="button">Download as PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

