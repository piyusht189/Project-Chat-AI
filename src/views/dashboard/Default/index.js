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
import ChatList from './ChatList';
import { store } from '../../../store';
import { connect } from 'react-redux';

// ==============================|| DEFAULT DASHBOARD ||============================== //



const Dashboard = (props) => {
  const [isLoading, setLoading] = useState(true);



  useEffect(() => {
    setLoading(false);
  }, []);


  const chatDummy = [
    { "who": "u", "message": "What are some of the broad terms for medical information of human health and healthcare, please explain in details, also summarize the information for me at the end." },
    { "who": "b", "message": "Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases." },
    { "who": "u", "message": "What are some of the broad terms for medical information of human health and healthcare, please explain in details, also summarize the information for me at the end." },
    { "who": "b", "message": "Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases." },
    { "who": "u", "message": "What are some of the broad terms for medical information of human health and healthcare, please explain in details, also summarize the information for me at the end." },
    { "who": "b", "message": "Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases." },
    { "who": "u", "message": "What are some of the broad terms for medical information of human health and healthcare, please explain in details, also summarize the information for me at the end." },
    { "who": "b", "message": "Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases." },
    { "who": "u", "message": "What are some of the broad terms for medical information of human health and healthcare, please explain in details, also summarize the information for me at the end." },
    { "who": "b", "message": "Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases.Medical information is a broad term that encompasses all aspects of human health and healthcare. It includes information on diseases, injuries, treatments, medications, and more. Medical information can be found in a variety of sources, including textbooks, journal articles, websites, and government databases." }
  ];

  return (



    props.collections.length > 0 ? (
      <Box
        sx={{
          display: 'flex',
          height: '80vh',
          overflow: 'hidden',
          width: '100%',
          margin: 'auto',
          padding: '10px',
          flexDirection: 'column',
          color: 'grey.800',
          borderRadius: '12px',
          position: 'relative'
        }}
      >
        <ChatList chatData={chatDummy}></ChatList>
        <ChatComponent></ChatComponent>
      </Box>

    ) : (
      <Box
        sx={{
          display: 'flex',
          height: '80vh',
          overflow: 'hidden',
          width: '100%',
          margin: 'auto',
          padding: '10px',
          flexDirection: 'column',
          color: 'grey.800',
          borderRadius: '12px',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '60%',
            overflow: 'hidden',
            width: '60%',
            margin: 'auto',
            paddingX: '30px',
            flexDirection: 'column',
            background: '#90909017',
            borderRadius: '12px',
            position: 'relative'
          }}>
          <MuiTypography style={{ margin: 'auto', textAlign: 'center', fontSize: '1.3em' }} variant="subtitle2" gutterBottom>
            Create a collection, add documents to the collection and solve your queries.
          </MuiTypography>
        </Box>
      </Box>
    )
  );
};

const mapStateToProps = state => {
  return {
    collections: state.collections.collections
  };
};
export default connect(mapStateToProps)(Dashboard);
