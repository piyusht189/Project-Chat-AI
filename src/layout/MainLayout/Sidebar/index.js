import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Chip, Drawer, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, TextField, TextareaAutosize, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';


import LogoSection from '../LogoSection';
import { drawerWidth } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import CloseIcon from '@mui/icons-material/Close';

// project imports
import NavGroup from './MenuList/NavGroup';
// assets
import { IconFileStack } from '@tabler/icons';
import { SET_COLLECTIONS } from 'store/actions';
import { useDispatch } from 'react-redux';

// constant
const icons = { IconFileStack };



const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

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

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [collections, setCollections] = React.useState({
    id: 'collections',
    title: 'Collections',
    type: 'group',
    children: [
      {
        id: 'medbill',
        caption: "My personal medical bills",
        title: 'Medical Bills',
        type: 'item',
        url: '/dashboard/default',
        chip: {
          color: 'primary',
          variant: 'outlined',
          size: '20',
          label: 'Options',
          avatar: 'Hi'
        },
        icon: icons.IconFileStack,
        breadcrumbs: false
      },
      {
        id: 'medbill1',
        caption: "Research Papers on CNN",
        title: 'Research Papers',
        type: 'item',
        url: '/dashboard/default',
        icon: icons.IconFileStack,
        breadcrumbs: false
      },
      {
        id: 'medbill2',
        caption: "Law Document on Tax Research",
        title: 'Laws',
        type: 'item',
        url: '/dashboard/default',
        icon: icons.IconFileStack,
        breadcrumbs: false
      },
      {
        id: 'medbill3',
        caption: "Anatomy books for doctors",
        title: 'Medical Queries',
        type: 'item',
        url: '/dashboard/default',
        icon: icons.IconFileStack,
        breadcrumbs: false
      }
    ]
  });
  const dispatch = useDispatch();
  const setCollectionsToRedux = () => {
    dispatch({ type: SET_COLLECTIONS, collections: collections['children']});
  };
 

  setCollectionsToRedux()



  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        >
          <Box sx={{ mt: 2 }}>
            <AnimateButton >
              <Button onClick={handleOpen} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                <AddIcon style={{ marginRight: 4 }} fontSize="inherit" />
                Create Collection
              </Button>
            </AnimateButton>
          </Box>
          <NavGroup key={collections.id} item={collections} />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
        <NavGroup key={collections.id} item={collections} />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </Box>
      </MobileView>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
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
          <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '-16px', top: '-16px', background: '#623cb1', color: '#fff', borderRadius: '40px', width: '30px',height: '30px', padding: '6px', cursor: 'pointer' }} fontSize="inherit" />
            <Typography id="spring-modal-title" variant="h3" component="h1" style={{marginBottom: 20}}>
              New Collection
            </Typography>
            <Formik
              initialValues={{
                name: '',
                description: '',
                submit: null
              }}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  if (scriptedRef.current) {
                    console.log("Values", values)
                    var collections_cpy = collections
                    collections_cpy["children"].push({
                      id: values.name,
                      caption: values.description,
                      title: values.name,
                      type: 'item',
                      url: '/dashboard/default',
                      icon: icons.IconFileStack,
                      breadcrumbs: false
                  })
                    setCollections(collections_cpy)
                    console.log(collections)
                    setStatus({ success: true });
                    handleClose()
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
                      <AddIcon style={{ marginRight: 4 }} fontSize="inherit" />
                        Create Collection
                      </Button>
                    </AnimateButton>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px'
            }
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
