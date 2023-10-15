import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from '../redux/user/userSlice.js';
import { app } from '../firebase.js';

//*   Create Firebase Storage: To Store the profile image
//* Step 1: Open Firebase Account, Go to Build=> Storage => Get Started => Create the Storage
//* Step 2: Go to Rules => Edit the Allow section and paste
// allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')

const Profile = () => {
  const { currentUser, loading, error } = useSelector(
    (state) => state.user.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileProgress(Math.round(progress));
      },
      // if error in uploadTask
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      // get the DownloadURL of the image we uploaded to the firebase server
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const deleteHandler = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

      navigate('/sign-in');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          className="rounded-full object-cover self-center max-w-[120px] cursor-pointer hover:opacity-60 mt-2"
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profilePic"
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Occurred! Check image type and try Again!
            </span>
          ) : fileProgress > 0 && fileProgress < 100 ? (
            <span className="text-slate-700">{`Uploading  ${fileProgress}%`}</span>
          ) : !fileUploadError && fileProgress === 100 ? (
            <span className="text-green-500">Image Uploaded Successfully!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Email Address"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <button
          type="button"
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          Create Listing
        </button>
        <div className="flex flex-row justify-between text-red-600 font-normal text-[17px]">
          <button type="button" onClick={deleteHandler}>
            Delete Account
          </button>
          <button type="button">Sign Out</button>
        </div>
        <p className=" text-red-600 font-normal text-[17px] mt-2">
          {error ? error : ''}
        </p>
        <p className=" text-green-600 font-normal text-[17px] mt-2">
          {updateSuccess ? 'Profile Updated Successfully!' : ''}
        </p>
        <p className="text-center cursor-pointer text-green-700">
          Show listing
        </p>
      </form>
    </div>
  );
};

export default Profile;
