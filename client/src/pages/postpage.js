import React, { useState } from "react";
import {
    Box,
    Card,
    Typography,
    TextField,
    InputLabel,
    IconButton,
    Button,
    Grid,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from "axios";
import toast from "react-hot-toast";


const PostPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token")
    const [selectedImages, setSelectedImages] = useState([]);
    const [postData, setpostData] = useState({
        userId: user ? user._id : '',
        model: '',
        price: '',
        phoneNumber: '',
        images: [],
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpostData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // const handleImageUpload = async (e) => {
    //     const files = Array.from(e.target.files);
    //     const formData = new FormData();
    //     files.forEach((file) => {
    //         formData.append("images", file);
    //     });

    //     try {
    //         const response = await axios.post("http://localhost:5000/api/post/upload-images", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         if (response.status === 200) {
    //             const uploadedImageUrls = response.data.imageUrls;
    //             setpostData((prev) => ({
    //                 ...prev,
    //                 images: [...prev.images, ...uploadedImageUrls],
    //             }));
    //             toast.success("Image uploaded successfully!");
    //         } else {
    //             toast.error("Failed to upload images.");
    //         }
    //     } catch (error) {
    //         console.error("Error uploading images:", error);
    //         toast.error("An error occurred while uploading images.");
    //     }
    // };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images", file);
        });

        try {
            const response = await axios.post("http://localhost:5000/api/post/upload-images", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const uploadedImageUrls = response.data.imageUrls;
                setpostData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...uploadedImageUrls],
                }));
                toast.success("Image uploaded successfully!");
            } else {
                toast.error("Failed to upload images.");
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("An error occurred while uploading images.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user?._id) {
            toast.error("User data not found in local storage!");
            return;
        }
        if (
            !postData.model ||
            !postData.price ||
            !postData.phoneNumber
        ) {
            toast.error("Please fill all fields!");
            return;
        }
        console.log("images", postData.images)
        if (!(postData.images.length >= 1 && postData.images.length <= 10)) {
            toast.error("You must upload images between 1 and 10 images!");
            return;
        }
        if (!(parseFloat(postData.price) > 0) || isNaN(postData.price)) {
            toast.error("Price should be a positive number!");
            return;
        }
        if (!/^\d{11}$/.test(postData.phoneNumber)) {
            toast.error("Please enter a valid 11-digit phone number!");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/post/create-post",
                postData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201) {
                toast.success("Post created successfully!");
                setpostData({
                    userId: user ? user._id : '',
                    model: '',
                    price: '',
                    phoneNumber: '',
                    images: [],
                });
                setSelectedImages('')
            } else {
                toast.error(response.data.error || "Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error(error.response?.data?.message || "An error occurred while creating the post.");
        }
    };


    // const handleImageChange = (event) => {

    //     //previously when I was using uploads folder on backend to upload images
    //     const files = Array.from(event.target.files);
    //     const imageUrls = files.map((file) => URL.createObjectURL(file));
    //     setSelectedImages((prev) => [...prev, ...imageUrls]);


    //     // Now when I am using Cloudinary.
    //     setSelectedImages(Array.from(event.target.files));
    // };
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));

        setSelectedImages((prev) => [...prev, ...imageUrls]);
    };
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f4f8',
            }}
        >
            <Card
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: 600,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 4, color: '#333' }}>
                    Create a Car Listing
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="model"
                                label="Model"
                                value={postData.model}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="price"
                                label="Price"
                                type="text"
                                value={postData.price}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="phoneNumber"
                                label="Contact"
                                value={postData.phoneNumber}
                                onChange={handleInputChange}
                                multiline
                                rows={1}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="carImages" sx={{ mb: 1, fontSize: '0.9rem', color: '#555' }}>
                                Upload Images
                            </InputLabel>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    component="label"
                                    color="primary"
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: 'skyBlue',
                                        '&:hover': { bgcolor: 'hoverSkyBlue' },
                                    }}
                                >
                                    <PhotoCamera />
                                    <input
                                        type="file"
                                        id="carImages"
                                        accept="image/*"
                                        multiple
                                        hidden
                                        onChange={(e) => {
                                            handleImageUpload(e);
                                            handleImageChange(e);
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        </Grid>
                        {selectedImages.length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                    Image Previews:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                                    {selectedImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '8px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        )}

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 4,
                            padding: '10px',
                            '&:hover': {
                                bgcolor: 'hoverSkyBlue',
                            },
                        }}
                    >
                        Create Listing
                    </Button>
                </form>
            </Card>
        </Box>
    );

};


export default PostPage;
