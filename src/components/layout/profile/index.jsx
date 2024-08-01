"use client";

import { useState, useEffect } from 'react';
import { getUser, updateUser } from '@/modules/fetch/fetchUser.js';
import styles from "./profile.module.css";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import jwtDecode from "jwt-decode";

const Profile = () => {
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        city_id: '',
        zipCode: '',
        phoneNumber: '',
        province_id: '',
        address: '',
        photo: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const user = jwtDecode(token);
                const data = await getUser(user.id);
                setUserData({
                    id: data.id,
                    username: data.username,
                    city_id: data.city_id,
                    zipCode: data.zipCode,
                    phoneNumber: data.phoneNumber,
                    province_id: data.province_id,
                    address: data.address,
                    photo: data.photo,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleFileDrop = (acceptedFiles) => {
        setUserData(prevState => ({
            ...prevState,
            photo: acceptedFiles[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            data: {
                username: userData.username,
                phoneNumber: userData.phoneNumber,
                city_id: userData.city_id,
                province_id: userData.province_id,
                zipCode: userData.zipCode,
                address: userData.address,
                photo: userData.photo
            },
            id: userData.id
        };

        try {
            await updateUser(data, userData.photo);
            alert('User updated successfully');
        } catch (error) {
            console.error("Error updating user data:", error);
            alert('Failed to update user');
        }
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="w-5/6 h-full shadow-lg my-10 flex flex-col text-xl">
                <div className="flex justify-center">
                    <h1 className={styles.poppinssemibold}>USER PROFILE</h1>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 w-4/6 flex-col justify-end">
                        <div className="w-full flex flex-col">
                            <label className="text-sm ms-9 mt-4" htmlFor="username">Username</label>
                            <input 
                                id="username" 
                                name="username" 
                                value={userData.username} 
                                onChange={handleChange} 
                                className="w-5/6 rounded-lg ms-9 mb-4 border-2 border-slate-950" 
                                required 
                            />
                            <label className="text-sm ms-9" htmlFor="city">City</label>
                            <input 
                                id="city" 
                                name="city_id" 
                                value={userData.city_id} 
                                onChange={handleChange} 
                                className="w-5/6 rounded-lg ms-9 mb-4 border-2 border-slate-950" 
                                required 
                            />
                            <label className="text-sm ms-9" htmlFor="zipcode">Zip code</label>
                            <input 
                                id="zipcode" 
                                name="zipCode" 
                                value={userData.zipCode} 
                                onChange={handleChange} 
                                className="w-5/6 rounded-lg ms-9 mb-4 border-2 border-slate-950" 
                                required 
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-sm ms-7 mt-4" htmlFor="phone">Phone number</label>
                            <input 
                                id="phone" 
                                name="phoneNumber" 
                                value={userData.phoneNumber} 
                                onChange={handleChange} 
                                className="w-5/6 rounded-lg ms-7 mb-4 border-2 border-slate-950" 
                                required 
                            />
                            <label className="text-sm ms-7" htmlFor="province_id">Province</label>
                            <input 
                                id="province_id" 
                                name="province_id" 
                                value={userData.province_id} 
                                onChange={handleChange} 
                                className="w-5/6 rounded-lg ms-7 mb-4 border-2 border-slate-950" 
                                required 
                            />
                        </div>
                        <div className="w-full">
                            <div className="mb-5">
                                <label htmlFor="address" className="ms-9 text-sm">Address</label>
                                <textarea 
                                    id="address" 
                                    name="address" 
                                    value={userData.address} 
                                    onChange={handleChange} 
                                    cols="70" 
                                    rows="6" 
                                    className="ms-9 rounded-lg border-2 border-slate-950"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/5 mx-auto mb-10 text-sm">
                    <p>Photo</p>
                    <FileUpload onDrop={handleFileDrop} className="flex justify-center mt-2 text-lg" />
                </div>
                <div className="w-3/5 flex justify-evenly items-center mx-auto mb-8">
                    <Button type="button" className="w-20 bg-amber-100 rounded-lg h-8 flex items-center text-sm text-yellow-500 hover:bg-red-300 hover:text-gray-100 poppins-semibold">Cancel</Button>
                    <Button type="submit" className="w-20 bg-yellow-500 rounded-lg h-8 flex justify-center items-center text-sm text-slate-950 hover:bg-yellow-400 poppins-semibold">Save</Button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
