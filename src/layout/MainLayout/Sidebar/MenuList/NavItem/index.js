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

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const tranparentBg = { background: 'transparent' }
const tranparentOriginal = { background: '#1e88e51f' }


const noHover = { visibility: 'hidden'}
const onHover = { visibility: 'inherit'}



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

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );




  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

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
    handleOpenModal()
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
      //{...listItemProps}
      disabled={item.disabled}
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
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText style={{margin: 'auto'}}
        primary={
          <Typography  variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
            {item.title}
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
        style={optionStyles} onMouseEnter={() => setColor(tranparentOriginal)} onMouseLeave={() => {setColor(tranparentBg)}}><MoreVertIcon /></Avatar>

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
      >
        <MenuItem onClick={handleClose}><DescriptionIcon sx={{ mr: 1.75 }} /> Description</MenuItem>
        <MenuItem onClick={handleSelect}><InfoIcon sx={{ mr: 1.75 }} /> Documents</MenuItem>
        <MenuItem onClick={() => handleSelect('rename')}><DriveFileRenameOutlineIcon sx={{ mr: 1.75 }} /> Rename</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleSelect('delete')}><DeleteIcon sx={{ mr: 1.75, color: '#b00000' }} /> Delete</MenuItem>
      </Menu>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
       
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          
          <Box sx={style}>
          <CloseIcon onClick={handleCloseModal} style={{ position: 'absolute', right: '-16px', top: '-16px', background: '#623cb1', color: '#fff', borderRadius: '40px', width: '30px',height: '30px', padding: '6px', cursor: 'pointer' }} fontSize="inherit" />
            <Typography id="spring-modal-title" variant="h3" component="h1" style={{marginBottom: 20}}>
              Edit Collection
            </Typography>
            <Formik
              initialValues={{
                name: item.title,
                description: item.caption,
                submit: null
              }}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  if (scriptedRef.current) {
                    console.log("Values", values)
                    setStatus({ success: true });
                    handleCloseModal()
                    setSubmitting(false);
                  }
                } catch (err) {
                  console.error(err);
                  if (scriptedRef.current) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  }
                }
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container>
                      <TextField
                        fullWidth
                        label="Collection Name"
                        margin="normal"
                        name="name"
                        type="text"
                        value={values.name}
                        onBlur={handleBlur}
                onChange={handleChange}
                        sx={{ ...theme.typography.customInput }}
                      />
                   
                  </Grid>
                  <Grid container style={{marginBottom: 20, paddingTop: 10}}>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        value={values.description}
                        onBlur={handleBlur}
                onChange={handleChange}
                        minRows={4}
                        style={{minHeight: 100}}
                        name="description"
                      />
                   
                  </Grid>
                  
                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Box>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                      <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                        Save Collection
                      </Button>
                    </AnimateButton>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </ListItemButton>
    
    
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
