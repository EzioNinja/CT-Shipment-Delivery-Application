import React, { useEffect, useState } from "react";
import { adminRequest } from "../../Helper/interceptor/axois";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { RouteObjects } from "../../Routes/RouteObject";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editName, setEditName] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [image, setImage] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );
  const [profileImage, setProfileImage] = useState(image);
  const [admin, setAdmin] = useState({});
  const [username, setUsername] = useState("");
  const [usermobile, setUsermobile] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setUsername(admin.username);
    setUsermobile(admin.mobile);
  }, [admin]);

  const getData = async () => {
    try {
      const response = await adminRequest({
        url: "/admin/get-admininfo-id",
        method: "POST",
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setAdmin(response.data.data);
        setProfileImage(response.data.image || image);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    if (profileImage) {
      const formData = new FormData();
      formData.append("profileimage", profileImage);

      try {
        dispatch(showloading());
        const response = await adminRequest({
          url: `${process.env.REACT_APP_DOMAIN}/admin/updateadminprofileimage`,
          method: "POST",
          data: formData,
        });

        dispatch(hideloading());

        if (response.data.success) {
          getData();
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        handleError(err);
      }
    }
  };

  const changeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setProfileImage(file);
    }
  };

  const updateForm = async (input, field) => {
    try {
      const response = await adminRequest({
        url: "/admin/updateadminDetails",
        method: "POST",
        data: { input, field },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEditMobile(false);
        setEditName(false);
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    dispatch(hideloading());
    toast.error("Something went wrong");
    console.error(err);
    localStorage.removeItem("admintoken");
    navigate(RouteObjects.AdminLogin);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-5/6 py-2 dark:bg-gray-800 dark:text-gray-50 rounded-md">
        <div className="flex justify-center items-center">
          <h1 className="font-serif font-extrabold text-2xl">
            Hai Admin {admin.username}!
          </h1>
        </div>

        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x mt-10">
          <div className="md:py-0 md:px-6">
            <div className="flex justify-center items-center h-80 w-80 ml-16 bg-slate-700 rounded-lg">
              <img
                src={admin.profileimage || image}
                alt="Admin"
                className="rounded-full h-60 w-60 dark:bg-gray-500"
              />
            </div>
            <div className="flex justify-center mt-2">
              <button className="bg-blue-700 rounded-sm p-2">
                <label htmlFor="imageUpload">
                  Choose Image
                  <input
                    type="file"
                    id="imageUpload"
                    name="profileimage"
                    className="hidden"
                    onChange={changeImage}
                  />
                </label>
              </button>
              <button
                type="submit"
                onClick={submitImage}
                className="bg-green-700 rounded-sm p-2 ml-2"
              >
                Upload
              </button>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="container shadow-md">
              <div className="mb-4">
                <div className="p-3 space-y-6">
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Full Name
                      {editName ? (
                        <button
                          onClick={() => updateForm(username, "username")}
                          className="material-symbols-outlined ml-2 absolute mt-1 bg-green-800 rounded-md text-white font-semibold"
                        >
                          done
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditName(true)}
                          className="material-symbols-outlined ml-1 absolute mt-1"
                        >
                          edit
                        </button>
                      )}
                    </p>
                    {editName ? (
                      <input
                        type="text"
                        className="w-3/4 text-muted text-sm md:text-base lg:text-lg bg-gray-300 rounded-md ml-10"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    ) : (
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg pl-10">
                        {admin.username}
                      </p>
                    )}
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Email
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg pl-10">
                      {admin.email}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Contact
                      {editMobile ? (
                        <button
                          onClick={() => updateForm(usermobile, "mobile")}
                          className="material-symbols-outlined ml-4 absolute mt-1 bg-green-800 rounded-md text-white font-semibold"
                        >
                          done
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditMobile(true)}
                          className="material-symbols-outlined ml-4 absolute mt-1"
                        >
                          edit
                        </button>
                      )}
                    </p>
                    {editMobile ? (
                      <input
                        type="text"
                        className="w-3/4 text-muted text-sm md:text-base lg:text-lg bg-gray-300 rounded-md ml-10"
                        value={usermobile}
                        onChange={(e) => setUsermobile(e.target.value)}
                      />
                    ) : (
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg pl-10">
                        {admin.mobile}
                      </p>
                    )}
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center mt-10">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg underline">
                      About
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default AdminProfile;
