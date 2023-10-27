import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Backdrop, Button, Divider, Fade, FormHelperText, Grid, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, TextField, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconFileStack } from '@tabler/icons';
import DescriptionIcon from '@mui/icons-material/TextSnippet';
import InfoIcon from '@mui/icons-material/DocumentScannerSharp';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';


import * as React from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import AnimateButton from 'ui-component/extended/AnimateButton';

// constant
const icons = { IconFileStack };

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const tranparentBg = { background: 'transparent' }
const tranparentOriginal = { background: '#1e88e51f' }


const noHover = { visibility: 'hidden' }
const onHover = { visibility: 'inherit' }



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #623cb117',
  borderRadius: '18px',
  boxShadow: 24,
  p: 4,
};

const NavItem = ({ item, level, onOpenEditModal }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = icons.IconFileStack;
  const itemIcon = (
    <Icon stroke={1.5} size="1.3rem" />
  );




  const itemHandler = (id) => {
    //dispatch({ type: MENU_OPEN, id });
    //if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  const [color, setColor] = useState(tranparentBg);
  const [hoverCollection, setHoverCollection] = useState(noHover);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (flag) => {
    setAnchorEl(null);
    setHoverCollection(noHover)
    if(flag == "rename"){
      onOpenEditModal(item)
    }
  };




  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, [pathname]);

  var optionStyles = Object.assign({},
    color, hoverCollection
  );

  return (
    <ListItemButton
      onMouseEnter={() => setHoverCollection(onHover)} onMouseLeave={() => setHoverCollection(noHover)}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`
      }}
      selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}

    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36, marginRight: '10px' }}>{itemIcon}</ListItemIcon>
      <ListItemText style={{ margin: 'auto' }}
        primary={
          <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
            {item.name}
          </Typography>
        }
      /*secondary={
        item.caption && (
          <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
            {item.caption}
          </Typography>
        )
      }*/
      />
      <Avatar
        aria-controls="menu-popular-card"
        aria-haspopup="true"
        onClick={handleClick}
        style={optionStyles} onMouseEnter={() => setColor(tranparentOriginal)} onMouseLeave={() => { setColor(tranparentBg) }}><MoreVertIcon /></Avatar>

      <Menu
        id="menu-popular-card"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant="selectedMenu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        style={{maxWidth: 700}}
      >
        <div style={{borderLeftWidth: '6px', borderLeftColor: 'rgb(98 60 177)', borderLeftStyle: 'solid', marginLeft: '10px', marginRight: '10px', marginBottom: '20px', marginTop: '5px', background: '#eee', padding: '15px', borderRadius: 10}}>{item.description}</div>
        <MenuItem onClick={() => handleSelect('rename')}><DriveFileRenameOutlineIcon sx={{ mr: 1.75 }} /> Edit Collection</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleSelect('delete')}><DeleteIcon sx={{ mr: 1.75, color: '#b00000' }} /> Delete</MenuItem>
      </Menu>
    </ListItemButton>


  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
