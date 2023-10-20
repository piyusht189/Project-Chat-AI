import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Button, Card, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import MuiTypography from '@mui/material/Typography';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AIWriter from "react-aiwriter";
import ChatComponent from './ChatComponent';

// ==============================|| DEFAULT DASHBOARD ||============================== //



const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (

    <Box
      sx={{
        display: 'flex',
        height: "95%",
        width: "95%",
        margin: "auto",
        flexDirection: 'column',
        color: 'grey.800',
        borderRadius: '12px',
        position: 'relative'
      }}
    >
      <AIWriter style={{}} delay={100}>
        <p>Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.</p>

        <ul>
          <li>Types of medical information:</li>
          <li>Diseases and conditions</li>
          <li>Injuries</li>
          <li>Treatments</li>
          <li>Medications</li>
          <li>Preventive care</li>
          <li>Public health</li>
        </ul>

        <ol>
          <li>How to find medical information:</li>
          <li>Talk to your doctor or other healthcare provider.</li>
          <li>Search online for reliable sources of medical information.</li>
          <li>Use the library to find medical books and articles.</li>
          <li>Contact government agencies or health organizations for information on specific topics.</li>
        </ol>

        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          Here are some examples of medical information:

          * The symptoms and causes of the common cold
          * The different types of cancer and their treatments
          * The side effects of medications
          * How to eat a healthy diet
          * How to prevent the spread of infectious diseases
        </pre>

      

        <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>The <code>add()</code> function adds two numbers together and returns the result.</p>
      </AIWriter>
      <ChatComponent></ChatComponent>
    </Box>
  );


};

export default Dashboard;
