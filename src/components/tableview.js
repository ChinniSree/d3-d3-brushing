import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// create tableview to display the selected data from scatterplot//
const TableView = ({ selectedMovies = [] }) => {
  const theme = createTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <div style=
      {{ 
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        border: '1px solid #e0e0e0',
        height: '500px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style=
        {{
          padding: '16px',
          margin: 0,
          fontSize: '17px',
          fontWeight: 'bold',
          borderBottom: '1px solid #e0e0e0'
        }}>
          Selected Data
        </h2>
        {/*// if there is data then it shows the table or no table is shown // */}
        
        {selectedMovies.length > 0 ? (
          <MaterialTable
            columns={[
              // columns to display on the table when selected//
              { title: "Title", field: "title", width: "15%" },
              { title: "Genre", field: "genre", width: "10%" },
              { title: "Source", field: "source", width: "10%" },
              { title: "Creative Type", field: "creative_type", width: "10%" },
              { title: "Release", field: "release", width: "10%" },
              { title: "Rating", field: "rating", width: "10%" },
              { title: "Budget", field: "budget", type: "numeric", width: "10%" },
              { title: "US Gross", field: "us_gross", type: "numeric", width: "10%" },
              { title: "Worldwide Gross ", field: "worldwide_gross", type: "numeric", width: "10%" },
              { title: "IMDB Rating", field: "imdb_rating", type: "numeric", width: "10%" },
              { title: "Rotten Tomatoes", field: "rotten_rating", type: "numeric", width: "10%" }
            ]}
            data={selectedMovies}
            options={{
              search: false,
              paging: false,
              toolbar: false,
              filtering: false,
              maxBodyHeight: '600px',
              minBodyHeight: '400px',
              fixedColumns: true,
              headerStyle: 
              { 
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#f5f5f5',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  zIndex: 11, 
                  textAlign: 'left', 
                  whiteSpace: 'nowrap'
              },
              rowStyle: 
              {
                fontSize: '15px'
              }
            }}
            style=
            {{
              flex: 1,
              overflow: 'auto'
            }}
          />
        ) : (
          <div style=
          {{ 
            padding: "20px",
            textAlign: "center",
            color: "#666"
          }}>
           {/*// //message to display if nothing is selected//*/}
            <p>No records to display.</p>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};
export default TableView;