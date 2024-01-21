import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMachines, createMachine, deleteMachine, updateMachine } from '../redux/slices/machines';
import { Grid, Card, CardContent, Typography, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Switch, FormControlLabel } from '@mui/material';
import axios from '../redux/axios';

const AdminMachimePage = () => {
    const dispatch = useDispatch();
    const machines = useSelector(state => state.machines.machines);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [currentMachine, setcurrentMachine] = useState(null);
    const [newMachine, setnewMachine] = useState({ name: '', model: '', imageUrl: '', condition: false });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        dispatch(fetchMachines());
    }, [dispatch]);

    const handleOpenEditDialog = (machine) => {
        setcurrentMachine(machine);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setcurrentMachine(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setnewMachine({ name: '', model: '', imageUrl: '', condition: false });
    };

    const handleChange = (e, machineType) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        machineType === 'new' ? setnewMachine({ ...newMachine, [name]: newValue }) : setcurrentMachine({ ...currentMachine, [name]: newValue });
    };

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const uploadImage = async (formData) => {
        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multimachine/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    };

    const handleCreateOrupdateMachine = async (isCreate) => {
        let machineData = isCreate ? newMachine : currentMachine;

        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            const uploadedImageData = await uploadImage(formData);
            if (uploadedImageData && uploadedImageData.url) {
                machineData = { ...machineData, imageUrl: `${window.location.protocol}//localhost:4444${uploadedImageData.url}` };
            }
        }

        if (isCreate) {
            dispatch(createMachine(machineData));
            handleCloseCreateDialog();
        } else {
            dispatch(updateMachine({ id: currentMachine._id, updatedData: machineData }));
            handleCloseEditDialog();
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Управление Оборудованием</Typography>
            <Button color="primary" onClick={handleOpenCreateDialog}>Добавить Оборудование</Button>
            <Grid container spacing={3}>
                {machines.map(machine => (
                    <Grid item key={machine._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="240"
                                image={machine.imageUrl || 'default_machine_image.jpg'}
                                alt={machine.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{machine.name}</Typography>
                                <Typography variant="body2">{machine.model}</Typography>
                                <Typography variant="body2">{`condition: ${machine.condition ? 'Working' : 'Out of order'}`}</Typography>
                                <Button color="primary" onClick={() => handleOpenEditDialog(machine)}>Изменить</Button>
                                <Button color="secondary" onClick={() => dispatch(deleteMachine(machine._id))}>Удалить</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Creating a New machine */}
            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
                <DialogTitle>Добавить Оборудование</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Нзавание"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newMachine.name}
                        onChange={(e) => handleChange(e, 'new')}
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        label="Модель"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        value={newMachine.model}
                        onChange={(e) => handleChange(e, 'new')}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newMachine.condition}
                                onChange={(e) => handleChange(e, 'new')}
                                name="condition"
                            />
                        }
                        label="Работоспособность"
                    />
                    <TextField type="file"
                        margin="dense"
                        fullWidth
                        variant="standard"
                        onChange={handleFileChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog}>Cancel</Button>
                    <Button onClick={() => handleCreateOrupdateMachine(true)}>Create</Button>
                </DialogActions>
            </Dialog>
            {/* Dialog for Editing a machine */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Изменить Оборудование</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentMachine?.name}
                        onChange={(e) => handleChange(e, 'edit')}
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        label="Описание"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        value={currentMachine?.model}
                        onChange={(e) => handleChange(e, 'edit')}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={currentMachine?.condition || false}
                                onChange={(e) => handleChange(e, 'edit')}
                                name="condition"
                            />
                        }
                        label="Доступность"
                    />
                    <TextField
                        type="file"
                        margin="dense"
                        fullWidth
                        variant="standard"
                        onChange={handleFileChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={() => handleCreateOrupdateMachine(false)}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminMachimePage;