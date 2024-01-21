import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMachines } from '../redux/slices/machines';
import { Grid, Card, CardContent, Typography, CardMedia, Chip } from '@mui/material';

const MachinePage = () => {
    const dispatch = useDispatch();
    const machines = useSelector(state => state.machines.machines);
    const loading = useSelector(state => state.machines.status) === 'loading';

    useEffect(() => {
        dispatch(fetchMachines());
    }, [dispatch]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Оборудование</Typography>
            <Grid container spacing={3}>
                {machines.map(machine => (
                    <Grid item key={machine._id
                    } xs={12} sm={6} md={4}>
                        <Card
                            sx={{ '&:hover': { boxShadow: 6 } }}
                        >
                            <CardMedia
                                component="img"
                                height="340"
                                image={machine.imageUrl || 'default_machine_image.jpg'}
                                alt={machine.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{machine.name}</Typography>
                                <Typography variant="body2">{machine.model}</Typography>
                                <Chip
                                    label={machine.condition ? 'В эксплуатации' : 'В ремонте'}
                                    color={machine.condition ? 'success' : 'error'}
                                    size="small"
                                    style={{ marginTop: 10 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default MachinePage;