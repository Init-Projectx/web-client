import { useState, useEffect } from 'react';
import { getUser, updateUser } from '@/modules/fetch/fetchUser.js';
import styles from "./profile.module.css";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import jwtDecode from 'jwt-decode';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        city: '',
        zipcode: '',
        phone: '',
        province: '',
        address: '',
        photo: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const user = jwtDecode(token);
                const data = await getUser(user.id);
                setUserData(data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setUserData({ ...userData, [name]: files[0] });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(userData).forEach(key => {
            formData.append(key, userData[key]);
        });

        try {
            await updateUser(formData);
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
                    <div className="grid grid-cols-2 w-4/6 flex flex-col justify-end">
                        <div className="w-full flex flex-col">
                            <label className="text-sm ms-9 mt-4" htmlFor="username">Username</label>
                            <input id="username" name="username" value={userData.username} onChange={handleChange} className="w-5/6 rounded-lg ms-9 mb-4 border-2 border-slate-950" />
                            <label className="text-sm ms-9" htmlFor="city">City</label>
                            <input id="city" name="city" value={userData.city} onChange={handleChange} className="w-5/6 rounded-lg ms-9 mb-4 border-2 border-slate-950" />
                            <label className="text-sm ms-9" htmlFor="zipcode">Zip code</label>
                            <input id="zipcode" name="zipcode" value={userData.zipcode} onChange={handleChange} className="w-5/6 rounded-lg ms-9 mb-4 border-2 border-slate-950" />
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-sm ms-7 mt-4" htmlFor="phone">Phone number</label>
                            <input id="phone" name="phone" value={userData.phone} onChange={handleChange} className="w-5/6 rounded-lg ms-7 mb-4 border-2 border-slate-950" />
                            <label className="text-sm ms-7" htmlFor="province">Province</label>
                            <input id="province" name="province" value={userData.province} onChange={handleChange} className="w-5/6 rounded-lg ms-7 mb-4 border-2 border-slate-950" />
                        </div>
                        <div className="w-full">
                            <div className="mb-5">
                                <label htmlFor="address" className="ms-9 text-sm">Address</label>
                                <textarea id="address" name="address" value={userData.address} onChange={handleChange} cols="70" rows="6" className="ms-9 rounded-lg border-2 border-slate-950"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/5 mx-auto mb-10 text-sm">
                    <p>Photo</p>
                    <FileUpload name="photo" onChange={handleChange} className="flex justify-center mt-2 text-lg" />
                </div>
                <div className="w-3/5 flex justify-evenly items-center mx-auto mb-8">
                    <Button type="button" className="w-20 bg-amber-100 rounded-lg h-8 flex items-center text-sm text-yellow-500 hover:bg-red-300 hover:text-gray-100 poppins-semibold">Cancel</Button>
                    <Button type="submit" className="w-20 bg-yellow-500 rounded-lg h-8 flex justify-center items-center text-sm text-slate-950 hover:bg-yellow-400 poppins-semibold">Save</Button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
