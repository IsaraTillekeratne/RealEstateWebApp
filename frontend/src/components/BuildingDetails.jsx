import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {
    ref,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { storage } from "../firebase";
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '4px solid #0000FF',
    boxShadow: 24,
    p: 4,
};

export default function BuildingDetails(props) {
    const [open, setOpen] = React.useState(false);
    const [heading, setHeading] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const handleOpen = (heading, msg) => {
        setHeading(heading);
        setMsg(msg);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const [buildingDetails, setBuildingDetails] = React.useState([]);
    const buildingId = props.id;

    const [imageUrls, setImageUrls] = React.useState([]);
    const imagesListRef = ref(storage, `buildingImages/${props.id}`);

    React.useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER}/building/searchById?id=${buildingId}`)
            .then((response) => {

                setBuildingDetails(response.data);

            }).catch((e) => {
                alert(e.response.data.error);

            })
    }, [buildingId]);

    React.useEffect(() => {
        // RESOLVE: Two images display at beginning
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []); //RESOLVE dependancy warning

    const deleteBuilding = () => {
        // alert("You are about to delete a building!")
        handleOpen("Alert", "You are about to delete a building!")
        Axios.delete(`${process.env.REACT_APP_SERVER}/building/delete?id=${buildingId}`)
            .then((response) => {

                // alert(response.data)
                handleOpen("Success", response.data)
                // navigate("../") // navigate to root
            }).catch((e) => {
                // alert(e.response.data.error);
                handleOpen("Error", e.response.data.error)

            })
    }


    const editBuilding = () => {
        alert("You are about to edit a building!")
        navigate(`../EditBuilding/${buildingId}`)
    }

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                {buildingDetails.map((building) => {
                    return (
                        <Grid container spacing={3} key={building.id}>

                            <Grid item xs={12}>
                                {/* <Box sx={{ bgcolor: '#cfe8fd', height: '50vh' }} /> */}
                                {imageUrls.map((url) => {
                                    return <img src={url} alt="building" key={Math.random()} />;
                                })}
                            </Grid>
                            <Grid item xs={12} md={6}><Box sx={{ bgcolor: '#FAF9F6', height: '100vh' }} >
                                <Stack spacing={2}>
                                    <Typography><b>Name</b></Typography>
                                    {building.name ? <Typography>{building.name}</Typography> : null}
                                    <Typography><b>Year</b></Typography>
                                    {building.year ? <Typography>{building.year}</Typography> : null}
                                    <Typography><b>District</b></Typography>
                                    {building.district ? <Typography>{building.district}</Typography> : null}
                                    <Typography><b>Number of Towers</b></Typography>
                                    {building.numOfTowers ? <Typography>{building.numOfTowers}</Typography> : null}
                                    <Typography><b>Number of Units</b></Typography>
                                    {building.numOfUnits ? <Typography>{building.numOfUnits}</Typography> : null}
                                    <Typography><b>Coordinates</b></Typography>
                                    {building.coordinates ? <Typography>{building.coordinates.x}, {building.coordinates.y}</Typography> : null}
                                    <Typography><b>Developer</b></Typography>
                                    {building.developer ? <Typography>{building.developer}</Typography> : null}
                                    <Typography><b>Company</b></Typography>
                                    {building.propertyManagement ? <Typography>{building.propertyManagement}</Typography> : null}
                                </Stack>
                            </Box></Grid>
                            <Grid item xs={12} md={6}><Box sx={{ bgcolor: '#FAF9F6', height: '100vh' }} >
                                <Stack spacing={2}>
                                    <Typography><b>Description</b></Typography>
                                    {building.description ? <Typography>{building.description}</Typography> : null}
                                    <Typography><b>Address</b></Typography>
                                    {building.address ? <Typography>{building.address}</Typography> : null}
                                    <Typography><b>Facilities</b></Typography>
                                    {building.facilities ?
                                        building.facilities.map((facility) => {
                                            return (

                                                <Typography key={Math.random()}>{facility}</Typography>
                                            )
                                        }) : null}
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" onClick={deleteBuilding}>Delete</Button>
                                        <Button variant="contained" onClick={editBuilding}>Edit</Button>
                                    </Stack>
                                </Stack>
                            </Box></Grid>
                        </Grid>
                    )

                })}


            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {heading}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {msg}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}