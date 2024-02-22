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
      <div className=' mb-10 max-w-3xl gap-5 flex-wrap justify-center m-auto flex items-center mb-5 '>
      <h2 className=' w-full h-14 flex border rounded  items-center shadow'><a className=' rounded-md p-3 h-full flex justify-between items-center w-full' href='https://docs.google.com/spreadsheets/d/1uPRv4lTdmi_hQM7lXuKdm0UUbVA_cbM_BNkRxEf09-s/edit?usp=sharing' target='_blank' >1. Click here to Update & Download CSV <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.65,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V88A8,8,0,0,0,213.65,82.34ZM152,88V44l44,44ZM48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.64,0-32-16.15-32-36s14.36-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.17,14.17,0,0,0,64,160C55.18,160,48,169,48,180Zm103.81,16.31a20.82,20.82,0,0,1-9.19,15.23C137.43,215,131,216,125.13,216a61.34,61.34,0,0,1-15.19-2,8,8,0,0,1,4.31-15.41c4.38,1.2,14.95,2.7,19.55-.36.88-.59,1.83-1.52,2.14-3.93.34-2.67-.72-4.1-12.78-7.59-9.35-2.7-25-7.23-23-23.11a20.58,20.58,0,0,1,9-14.95c11.85-8,30.72-3.31,32.84-2.76a8,8,0,0,1-4.07,15.48c-4.49-1.17-15.23-2.56-19.83.56a4.57,4.57,0,0,0-2,3.67c-.11.9-.13,1.09,1.12,1.9,2.31,1.49,6.45,2.68,10.45,3.84C137.49,174.17,154,179,151.81,196.31Zm63.72-41.62-20,56a8,8,0,0,1-15.07,0l-20-56a8,8,0,0,1,15.07-5.38L188,184.21l12.46-34.9a8,8,0,0,1,15.07,5.38Z"></path></svg></a> </h2>
        <h2 className=' w-full h-14 flex border rounded  items-center shadow'><a className=' rounded-md p-3 h-full flex justify-between items-center w-full' href='https://codebeautify.org/excel-to-json' target='_blank' >2. Click here for CSV to Json <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM88,155.84c.29,14.26.41,20.16,16,20.16a8,8,0,0,1,0,16c-31.27,0-31.72-22.43-32-35.84C71.71,141.9,71.59,136,56,136a8,8,0,0,1,0-16c15.59,0,15.71-5.9,16-20.16C72.28,86.43,72.73,64,104,64a8,8,0,0,1,0,16c-15.59,0-15.71,5.9-16,20.16-.17,8.31-.41,20.09-8,27.84C87.59,135.75,87.83,147.53,88,155.84ZM200,136c-15.59,0-15.71,5.9-16,20.16-.28,13.41-.73,35.84-32,35.84a8,8,0,0,1,0-16c15.59,0,15.71-5.9,16-20.16.17-8.31.41-20.09,8-27.84-7.6-7.75-7.84-19.53-8-27.84C167.71,85.9,167.59,80,152,80a8,8,0,0,1,0-16c31.27,0,31.72,22.43,32,35.84.29,14.26.41,20.16,16,20.16a8,8,0,0,1,0,16Z"></path></svg></a> </h2>
        
        
        <div className='border relative rounded-md shadow bg-gray-100 flex w-full'>
        <label className=' absolute left-3  top-1 font-bold text-[10px] ' for="file">3. Click here for CSV to Json</label>
        <input placeholder='Click here for Json to HTML' className=' relative z-10 w-full cursor-pointer h-full p-3 pt-6   ' type="file" accept=".json" onChange={handleFileUpload} />
        <svg className=' absolute right-3 top-1/4 -z-0 ' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34Zm-56,67.32a8,8,0,0,1-11.32,0L136,139.31V184a8,8,0,0,1-16,0V139.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0l24,24A8,8,0,0,1,157.66,149.66ZM152,88V44l44,44Z"></path></svg>
        </div>
        
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
