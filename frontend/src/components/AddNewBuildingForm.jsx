import * as React from 'react';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Axios from 'axios';
import {
    ref,
    uploadBytes,

} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { buildingSchema } from '../Validations/newBuildingValidation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function AddNewBuildingForm() {

    const [open, setOpen] = React.useState(false);
    const [heading, setHeading] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const handleOpen = (heading, msg) => {
        setHeading(heading);
        setMsg(msg);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [values, setValues] = React.useState({
        name: '',
        year: '',
        address: '',
        district: '', //CHANGED
        numOfTowers: '',
        numOfUnits: '',
        facilities: '',
        description: '',
        developer: '',
        propertyManagement: '',
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const [fileImages, setFileImages] = React.useState([]);
    const [fileFloorplan, setFileFloorplan] = React.useState([]);
    const [fileOther, setFileOther] = React.useState([]);
    const [insertedId, setInsertedId] = React.useState(null);

    const selectFileImages = (e) => {
        setFileImages(e.target.files);

    }
    const selectFileFloorplan = (e) => {
        setFileFloorplan(e.target.files);

    }
    const selectFileOther = (e) => {
        setFileOther(e.target.files);

    }
    const submit = async (e) => {

        e.preventDefault();
        let formData = {
            name: values.name,
            year: values.year,
            address: values.address,
            district: values.district,
            numOfTowers: values.numOfTowers,
            numOfUnits: values.numOfUnits,
            facilities: values.facilities,
            description: values.description,
            developer: values.developer,
            propertyManagement: values.propertyManagement,
        }
        const isValid = await buildingSchema.isValid(formData);
        // use FORMIK to display errors on input validations
        console.log(isValid)
        if (isValid === false) handleOpen("Error", "Invalid input!")
        else {
            if (typeof parseInt(values.year) === 'number' && typeof parseInt(values.numOfTowers) === 'number' && typeof parseInt(values.numOfUnits) === 'number') {
                Axios.post(`${process.env.REACT_APP_SERVER}/building/add`, {

                    name: values.name,
                    year: values.year,
                    address: values.address,
                    district: values.district,
                    numOfTowers: values.numOfTowers,
                    numOfUnits: values.numOfUnits,
                    facilities: values.facilities,
                    description: values.description,
                    developer: values.developer,
                    propertyManagement: values.propertyManagement,

                }).then((response) => {

                    // alert("Building added successfully!")
                    handleOpen("Success", "Building added successfully!")
                    setInsertedId(response.data);

                }).catch((e) => {

                    // alert(e.response.data.error);
                    handleOpen("Error", e.response.data.error)
                })
            } else {
                // alert("Invalid input!")
                handleOpen("Error", "Invalid input!")
            }

        }


    }
    const submitBuildingImages = () => {
        if (fileImages.length === 0) return;
        const filePath = `buildingImages/${insertedId}/${fileImages[0].name + v4()}`
        const imageRef = ref(storage, filePath);
        uploadBytes(imageRef, fileImages[0]).then(() => {
            // alert("Building images uploaded!")
            handleOpen("Success", "Building images uploaded!")

        });

    }
    const submitFloorPlans = () => {
        if (fileFloorplan.length === 0) return;

        const filePath = `buildingFloorPlans/${insertedId}/${fileFloorplan[0].name + v4()}`
        const imageRef = ref(storage, filePath);
        uploadBytes(imageRef, fileFloorplan[0]).then(() => {
            // alert("Floor plans uploaded!")
            handleOpen("Success", "Floor plans uploaded!")
        });
        return filePath;

    }
    const submitOtherFiles = () => {
        if (fileOther.length === 0) return;

        const filePath = `buildingOtherFiles/${insertedId}/${fileOther[0].name + v4()}`
        const imageRef = ref(storage, filePath);
        uploadBytes(imageRef, fileOther[0]).then(() => {
            // alert("Other files uploaded!")
            handleOpen("Success", "Other files uploaded!")
        });
        return filePath;

    }
    const submitImages = () => {

        submitBuildingImages();
        submitFloorPlans();
        submitOtherFiles();
        // ISSUES TO RESOLVE
        // multiple file upload issue
        // make the connection with the added building and images
        // auto cropping

    }
    return (<div>
        <Stack spacing={2} sx={{ marginTop: "25px" }}>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.name}
                    onChange={handleChange('name')}
                    placeholder=""
                    label="Name"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">Year</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.year}
                    onChange={handleChange('year')}
                    placeholder=""
                    label="Year"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.address}
                    onChange={handleChange('address')}
                    placeholder=""
                    label="Address"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">District</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.district}
                    onChange={handleChange('district')}
                    placeholder=""
                    label="District"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">No of towers</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.numOfTowers}
                    onChange={handleChange('numOfTowers')}
                    placeholder=""
                    label="No of towers"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">No of units</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.numOfUnits}
                    onChange={handleChange('numOfUnits')}
                    placeholder=""
                    label="No of units"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">Facilities</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.facilities}
                    onChange={handleChange('facilities')}
                    placeholder="Comma seperated"

                    label="Facilities"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.description}
                    onChange={handleChange('description')}
                    placeholder=""
                    label="Description"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">Developer</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.developer}
                    onChange={handleChange('developer')}
                    placeholder=""
                    label="Developer"
                />
            </FormControl>
            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-amount">Company</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.propertyManagement}
                    onChange={handleChange('propertyManagement')}
                    placeholder="Property management"
                    label="Company"
                />
            </FormControl>
            <Button variant="contained" onClick={submit}>Submit</Button>
            <>
                <InputLabel id="demo-simple-select-label">Upload images of the property</InputLabel>
                <input type="file" onChange={selectFileImages} multiple></input>
            </>
            <>
                <InputLabel id="demo-simple-select-label">Upload the floor plan</InputLabel>
                <input type="file" onChange={selectFileFloorplan} multiple></input>
            </>
            <>
                <InputLabel id="demo-simple-select-label">Upload other files (if any)</InputLabel>
                <input type="file" onChange={selectFileOther} multiple></input>
            </>
            <Button variant="contained" onClick={submitImages} type="submit">Upload images</Button>

        </Stack>
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