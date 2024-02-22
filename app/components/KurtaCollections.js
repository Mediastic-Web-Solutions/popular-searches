'use client'

// pages/kurta-collections.js
import { useState } from 'react';

const KurtaCollections = () => {
  const [collections, setCollections] = useState([]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        const organizedData = organizeData(data.Sheet1);
        setCollections(organizedData);
      };
      reader.readAsText(file);
    }
  };

  // Function to organize and group data by collection
  const organizeData = (data) => {
    let organized = [];
    let lastCollection = null;

    data.forEach(({ Collection, 'Sub section': subSection, 'Keywords/Popular Searches': keyword, 'Target URL': targetUrl }) => {
      if (lastCollection !== Collection) {
        organized.push({ Collection, sections: [] });
        lastCollection = Collection;
      }
      const currentCollection = organized[organized.length - 1];
      const sectionKey = currentCollection.sections.findIndex((section) => section.subSection === subSection);
      if (sectionKey === -1) {
        currentCollection.sections.push({ subSection, keywords: [{ keyword, targetUrl }] });
      } else {
        currentCollection.sections[sectionKey].keywords.push({ keyword, targetUrl });
      }
    });

    return organized;
  };

  return (
    <div className=' container mx-auto mt-5  '>
      <div className=' mb-5 text-center '>
        <input type="file" accept=".json" onChange={handleFileUpload} />
      </div>
      {collections.map(({ Collection, sections }, colIndex) => (
        <div className=' mb-5 ' key={colIndex}>
          {sections.map(({ subSection, keywords }, secIndex) => (
            <div className=' mb-5 ' key={secIndex}>
              {secIndex === 0 && <h2 className=' text-2xl font-bold mb-5 ' >{Collection}</h2>}
              <b><a href="#">{subSection}</a>:</b>
              {keywords.map(({ keyword, targetUrl }, keyIndex) => (
                <span key={keyIndex}> <a href={targetUrl}>{keyword}</a>{keyIndex < keywords.length - 1 ? ', ' : ''}</span>
              ))}<br></br><br></br>
            </div>
          ))}
          {colIndex < collections.length - 1 && <hr className=' my-5 '  />}
        </div>
      ))}
    </div>
  );
};

export default KurtaCollections;
