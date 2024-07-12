import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import myimage from "../../components/images/def.jpg";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { drivervalidate } from "../../Helper/Validations/validation";
import { RouteObjects } from "../../Routes/RouteObject";
import { AddHubDetails, getCityDetails } from "./adminutil/api";

const addDriver = () => {
  const [hubcity, setHubCity] = useState([]);
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(myimage);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    city: "",
    address: "",
    mobile: "",
    pin: "",
    licence: "",
    website: "",
    bio: "",
    profileimage: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showloading());
        const response = await getCityDetails();
        dispatch(hideloading());

        if (response.data.success) {
          toast.success(response.data.message);
          setHubCity(response.data.data);
        }
      } catch (error) {
        dispatch(hideloading());
        toast.error("Something went wrong");
        localStorage.removeItem("admintoken");
        navigate(RouteObjects.AdminLogin);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileimage: file,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = drivervalidate(formData);
    setErrors(error);

    if (Object.keys(error).length === 0) {
      try {
        dispatch(showloading());

        const formDataToSend = new FormData();
        for (const key in formData) {
          if (formData.hasOwnProperty(key)) {
            formDataToSend.append(key, formData[key]);
          }
        }

        const response = await AddHubDetails(formDataToSend);
        dispatch(hideloading());

        if (response.data.success) {
          navigate(RouteObjects.DriverList);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideloading());
        toast.error("Something went wrong");
        localStorage.removeItem("admintoken");
        navigate(RouteObjects.AdminLogin);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-200 dark:text-gray-50">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
          <div className="space-y-2 col-span-full lg:col-span-1 bg-white relative object-cover overflow-hidden">
            <div className="bg-gray-600 absolute bottom-0">
              <img className="h-full w-full" src={image} alt="Profile" />
              <input
                type="file"
                name="profileimage"
                className="w-full"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="firstname" className="text-sm">
                First name
              </label>
              <input
                id="firstname"
                type="text"
                name="fname"
                onChange={handleInputChange}
                placeholder="First name"
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              {errors.fname && <p className="text-red-500">{errors.fname}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                Last name
              </label>
              <input
                id="lastname"
                type="text"
                name="lname"
                onChange={handleInputChange}
                placeholder="Last name"
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              {errors.lname && <p className="text-red-500">{errors.lname}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="city" className="text-sm">
                City
              </label>
              <select
                id="city"
                name="city"
                onChange={handleInputChange}
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              >
                <option value="">Select City</option>
                {hubcity.map((city, index) => (
                  <option key={index} value={city.value}>
                    {city.city}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500">{errors.city}</p>}
            </div>
            <div className="col-span-full">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                onChange={handleInputChange}
                className="border rounded p-2 w-full h-20 resize-none text-black"
                placeholder="Type your address here..."
              />
              {errors.address && <p className="text-red-500">{errors.address}</p>}
            </div>
            <div className="col-span-full sm:col-span-2">
              <label htmlFor="mobile" className="text-sm">
                Mobile
              </label>
              <input
                id="mobile"
                type="number"
                name="mobile"
                onChange={handleInputChange}
                placeholder="Mobile"
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
            </div>
            <div className="col-span-full sm:col-span-2">
              <label htmlFor="pin" className="text-sm">
                PIN
              </label>
              <input
                id="pin"
                type="text"
                name="pin"
                onChange={handleInputChange}
                placeholder="PIN"
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              {errors.pin && <p className="text-red-500">{errors.pin}</p>}
            </div>
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-4 gap-6 p-3 rounded-md shadow-sm dark:bg-gray-900">
          <div className="grid grid-cols-6 gap-2 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="licence" className="text-sm">
                Licence number*
              </label>
              <input
                id="licence"
                type="text"
                name="licence"
                onChange={handleInputChange}
                placeholder="Licence number"
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              {errors.licence && <p className="text-red-500">{errors.licence}</p>}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm">
                Website (optional)
              </label>
              <input
                id="website"
                type="text"
                name="website"
                onChange={handleInputChange}
                placeholder="https://"
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              {errors.website && <p className="text-red-500">{errors.website}</p>}
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-sm">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                onChange={handleInputChange}
                placeholder="Type your bio here..."
                className="w-full h-8 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              {errors.bio && <p className="text-red-500">{errors.bio}</p>}
            </div>
            <div className="col-span-full h-8 rounded-md sm:col-span-2 bg-blue-500 text-center">
              <button type="submit" className="w-full h-full">
                Submit
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default addDriver;
