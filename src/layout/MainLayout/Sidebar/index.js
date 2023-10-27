import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Chip, Divider, Drawer, FormControl, FormHelperText, Grid, InputLabel, List, OutlinedInput, Stack, TextField, TextareaAutosize, useMediaQuery } from '@mui/material';
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


// assets

import { SET_COLLECTIONS } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import CollectionService from 'services/CollectionService';
import { useEffect } from 'react';
import NavItem from './MenuList/NavItem';





const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    in: openEdit,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open || openEdit ? 1 : 0 },
    onStart: () => {
      if ((open || openEdit) && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if ((!open || !openEdit) && onExited) {
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
  const customization = useSelector((state) => state.customization);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [itemHolder, setItemHolder] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = (item) => {
    setItemHolder(item)
    setOpenEdit(true)
  }
  const handleCloseEdit = () => setOpenEdit(false);

  const [collections, setCollections] = React.useState({
    id: 'collections',
    title: 'Collections',
    type: 'group',
    children: []
  });
  const dispatch = useDispatch();
  const setCollectionsToRedux = (children) => {
    dispatch({ type: SET_COLLECTIONS, collections: children });
  };

  const setCollectionsChildren = (childrens) => {
    // Setting collections to state
    setCollections({
      id: 'collections',
      title: 'Collections',
      type: 'group',
      children: childrens
    })

    // Setting collections to redux
    setCollectionsToRedux(childrens);
  }



  useEffect(() => {
    // Fetching all the collections and pushing to the redux
    CollectionService.getCollections(customization.token).then((responseData) => {
      console.log("Response", responseData)
      if (responseData.constructor === Array) {
        setCollectionsChildren(responseData)
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  // menu list collapse & items
  const items = collections.children?.map((menu) => {
    return <NavItem key={menu.id} item={menu} level={1} onOpenEditModal={handleOpenEdit} />
  })

  const collectionItem = () => {
    return (<div>
      <List key={collections.id}
        subheader={
          collections.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {collections.title}
              {collections.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {collections.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </div>)
  }


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
          {collections.children.length > 0 &&
            collectionItem()
          }
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          {collections.children.length > 0 &&
            collectionItem()
          }
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
            <CloseIcon onClick={handleClose} style={{ position: 'absolute', right: '-16px', top: '-16px', background: '#623cb1', color: '#fff', borderRadius: '40px', width: '30px', height: '30px', padding: '6px', cursor: 'pointer' }} fontSize="inherit" />
            <Typography id="spring-modal-title" variant="h3" component="h1" style={{ marginBottom: 20 }}>
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
                  console.log("Values", values)
                  setSubmitting(true)
                  var collections_cpy = collections.children

                  // Adding collection API Call
                  CollectionService.addCollection(values.name, values.description, customization.token).then((responseData) => {
                    console.log("Response", responseData)
                    if (responseData.constructor === Object) {
                      if (responseData['collection_id']) {
                        let collectionObject = {
                          id: responseData['collection_id'],
                          name: values.name,
                          description: values.description,
                          chat_count: 0,
                          conversation_count: 0
                        }
                        collections_cpy.push(collectionObject)
                        setCollectionsChildren(collections_cpy)
                        setStatus({ success: true });
                        handleClose()
                        setSubmitting(false);
                      }


                    }
                  }).catch((error) => {
                    console.error('Error fetching data:', error);
                    setStatus({ success: false });
                    setErrors({ submit: "Something went wrong!" });
                    setSubmitting(false);
                  });




                } catch (err) {
                  console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  
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
                  <Grid container style={{ marginBottom: 20, paddingTop: 10 }}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      minRows={4}
                      style={{ minHeight: 100 }}
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
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}

        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openEdit}>

          <Box sx={style}>
            <CloseIcon onClick={handleCloseEdit} style={{ position: 'absolute', right: '-16px', top: '-16px', background: '#623cb1', color: '#fff', borderRadius: '40px', width: '30px', height: '30px', padding: '6px', cursor: 'pointer' }} fontSize="inherit" />
            <Typography id="spring-modal-title" variant="h3" component="h1" style={{ marginBottom: 20 }}>
              Edit Collection
            </Typography>
            <Formik
              initialValues={{
                name: itemHolder.name,
                description: itemHolder.description,
                submit: null
              }}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {

                  console.log("Values", values)
                  setSubmitting(true)
                  var collections_cpy = collections.children

                  // Adding collection API Call
                  CollectionService.updateCollection(itemHolder.id, values.name, values.description, customization.token).then((responseData) => {
                    console.log("Response", responseData)



                    if (responseData.constructor === Object) {

                        collections_cpy = collections_cpy.map(e => {
                          if(e.id == itemHolder.id){
                            e['name'] = values.name,
                            e['description'] = values.description
                          }
                          return e
                        })

                        setCollectionsChildren(collections_cpy)
                        setStatus({ success: true });
                        handleCloseEdit()
                        setSubmitting(false);
                    }

                  }).catch((error) => {
                    console.error('Error fetching data:', error);
                    setStatus({ success: false });
                    setErrors({ submit: "Something went wrong!" });
                    setSubmitting(false);
                  });




                } catch (err) {
                  console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
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
                  <Grid container style={{ marginBottom: 20, paddingTop: 10 }}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      minRows={4}
                      style={{ minHeight: 100 }}
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
