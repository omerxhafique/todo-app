import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Snackbar,
    IconButton,
    CssBaseline,
    Switch,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskTitle, setEditingTaskTitle] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const [darkMode, setDarkMode] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;


    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/tasks`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, [API_URL]);

    const addTask = async () => {
        if (!task) {
            setSnackbar({ open: true, message: 'Task cannot be empty!' });
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/tasks`, { title: task });
            setTasks([...tasks, response.data]);
            setTask('');
            setSnackbar({ open: true, message: 'Task added successfully!' });
        } catch (error) {
            console.error('Error adding task:', error);
            setSnackbar({ open: true, message: 'Failed to add task.' });
        }
        setLoading(false);
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/tasks/${id}`);
            setTasks(tasks.filter((t) => t._id !== id));
            setSnackbar({ open: true, message: 'Task deleted successfully!' });
        } catch (error) {
            console.error('Error deleting task:', error);
            setSnackbar({ open: true, message: 'Failed to delete task.' });
        }
    };

    const startEditingTask = (id, title) => {
        setEditingTaskId(id);
        setEditingTaskTitle(title);
    };

    const updateTask = async () => {
        if (!editingTaskTitle) {
            setSnackbar({ open: true, message: 'Task cannot be empty!' });
            return;
        }
        try {
            const response = await axios.put(`${API_URL}/api/tasks/${editingTaskId}`, {
                title: editingTaskTitle,
            });
            setTasks(tasks.map((t) => (t._id === editingTaskId ? response.data : t)));
            setEditingTaskId(null);
            setEditingTaskTitle('');
            setSnackbar({ open: true, message: 'Task updated successfully!' });
        } catch (error) {
            console.error('Error updating task:', error);
            setSnackbar({ open: true, message: 'Failed to update task.' });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <TextField
                            label="New Task"
                            variant="outlined"
                            fullWidth
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={addTask}
                            disabled={loading}
                            startIcon={<AddIcon />}
                        >
                            {loading ? 'Adding...' : 'Add'}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                    {tasks.map((t) => (
                        <Grid item xs={12} key={t._id}>
                            <Card variant="outlined" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                <CardContent>
                                    {editingTaskId === t._id ? (
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={editingTaskTitle}
                                            onChange={(e) => setEditingTaskTitle(e.target.value)}
                                        />
                                    ) : (
                                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                            {t.title}
                                        </Typography>
                                    )}
                                </CardContent>
                                <CardActions>
                                    {editingTaskId === t._id ? (
                                        <Button
                                            size="small"
                                            color="primary"
                                            startIcon={<SaveIcon />}
                                            onClick={updateTask}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            size="small"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => startEditingTask(t._id, t.title)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <IconButton
                                        color="secondary"
                                        onClick={() => deleteTask(t._id)}
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ open: false, message: '' })}
                message={snackbar.message}
                action={
                    <IconButton size="small" color="inherit" onClick={() => setSnackbar({ open: false, message: '' })}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </ThemeProvider>
    );
};


export default Todo;
