import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ControlPanel from './components/controlpanel';
import Scatterplot from './components/scatterplot';
import TableView from './components/tableview';

const cust_theme = createTheme();

// Contains the selected data and attributes for the scatterplot x,y, opacity, color, size //
function App() {
  const [data, setData] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [xAttr, setXAttr] = useState('');
  const [yAttr, setYAttr] = useState('');
  const [colorAttr, setColorAttr] = useState('');
  const [opacityAttr, setOpacityAttr] = useState('');
  const [sizeAttr, setSizeAttr] = useState('');

  // Handles the movies selected in scatterplot by user
  const handleSelection = (selected) => {
    setSelectedMovies(selected);
  };

  useEffect(() => {
    fetch("/movie.json")
      .then((response) => response.json())
      .then((data) => { setData(data); })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (data.length === 0) return null; 

  // setting dropdown values for x,y//
  const axisoptions = [
    { value: "budget", label: "Budget" },
    { value: "us_gross", label: "US Gross" },
    { value: "worldwide_gross", label: "Worldwide Gross" },
    { value: "rotten_rating", label: "Rotten Rating" },
    { value: "imdb_rating", label: "IMDB Rating" },
    { value: "imdb_votes", label: "IMDB Votes" },
  ]; 

  // setting dropdown values for color//
  const coloroptions = [
    { value: "none", label: "None" },
    { value: "genre", label: "Genre" },
    { value: "creative_type", label: "Creative Type" },
    { value: "source", label: "Source" },
    { value: "release", label: "Release" },
    { value: "rating", label: "Rating" },
  ]; 
// setting dropdown values for opacity//
  const opacityoptions = [
    { value: "none", label: "None" },
    { value: "us_gross", label: "US Gross" },
    { value: "worldwide_gross", label: "Worldwide Gross" },
    { value: "rotten_rating", label: "Rotten Rating" },
    { value: "imdb_rating", label: "IMDB Rating" },
    { value: "imdb_votes", label: "IMDB Votes" },
  ]; 
 // setting dropdown values for size//
  const Sizeoptions = [
    { value: "none", label: "None" },
    { value: "us_gross", label: "US Gross" },
    { value: 'creative_type', label: 'Creative Type' },
    { value: "worldwide_gross", label: "Worldwide Gross" },
    { value: "rotten_rating", label: "Rotten Rating" },
    { value: "imdb_rating", label: "IMDB Rating" },
    { value: "imdb_votes", label: "IMDB Votes" },
  ]; 


  return (
    <ThemeProvider theme={cust_theme}>
      <div style={{
        padding: '20px',
        fontFamily: 'Times New Roman, serif',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '24px'
        }}>
          Scatterplot Visualization
        </h1>

        <>
          <div style={{ marginBottom: '20px' }}>
            { /* Control panel attributes  */ }
            <ControlPanel
              xAtt={axisoptions}    
              yAtt={axisoptions}    
              colorAtt={coloroptions}  
              opacityAtt={opacityoptions}   
              sizeAtt={Sizeoptions}      
              setXAttr={setXAttr}
              setYAttr={setYAttr}
              setColorAttr={setColorAttr}
              setOpacityAttr={setOpacityAttr}
              setSizeAttr={setSizeAttr}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '0',
            alignItems: 'flex-start',
            marginBottom: 0
          }}>
            <div style={{
              flex: '0 0 60%',
              minWidth: '700px',
              marginBottom: 0
            }}>
              { /* Scatterplot attributes  */ }
              <Scatterplot
                movies={data}
                xAttr={xAttr}
                yAttr={yAttr}
                colorAttr={colorAttr}
                opacityAttr={opacityAttr}
                sizeAttr={sizeAttr}
                onSelection={handleSelection}
              />
            </div>

            <div style={{
              flex: '1',
              minWidth: '600px',
              maxWidth: '900px'
            }}>
              { /* table view  */ }
              <TableView selectedMovies={selectedMovies} />
            </div>
          </div>
        </>
      </div>
    </ThemeProvider>
  );
}

export default App;