import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
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
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice.js';
import { app } from '../firebase.js';
import { errorHandler } from '../../../api/utils/error.js';

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
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListing, setUserListing] = useState([]);

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

  const signOutHandler = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      errorHandler(error.message);
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      showListingsError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListing((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
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
        <Link
          to="/create-listing"
          className="bg-green-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          Create Listing
        </Link>
        <div className="flex flex-row justify-between text-red-600 font-normal text-[17px]">
          <button type="button" onClick={deleteHandler}>
            Delete Account
          </button>
          <button type="button" onClick={signOutHandler}>
            Sign Out
          </button>
        </div>
        <p className=" text-red-600 font-normal text-[17px] mt-2">
          {error ? error : ''}
        </p>
        <p className=" text-green-600 font-normal text-[17px] mt-2">
          {updateSuccess ? 'Profile Updated Successfully!' : ''}
        </p>
        <button
          type="button"
          onClick={handleShowListing}
          className="text-center text-green-700"
        >
          Show listing
        </button>
        {showListingsError && (
          <p className=" text-red-600 font-normal text-[17px] mt-2">
            {showListingsError}
          </p>
        )}
        {userListing && userListing.length > 0 && (
          <>
            <h1 className="font-semibold text-[2rem] self-center">
              Your Listings
            </h1>
            {userListing.map((listing) => (
              <div
                key={listing._id}
                className="flex flex-row justify-between border rounded-lg p-3 items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain "
                  />
                </Link>
                <Link
                  className="font-semibold flex-1 text-slate-700 hover:underline truncate"
                  to={`/listing/${listing._id}`}
                >
                  <h3>{listing.name}</h3>
                </Link>
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteListing(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <button className="text-green-700 uppercase">Edit</button>
                </div>
              </div>
            ))}
          </>
        )}
      </form>
    </div>
  );
};

export default Profile;
