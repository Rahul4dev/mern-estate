import { useSelector } from 'react-redux';

const Profile = () => {
  const currentUser = useSelector((state) => state.user.user.currentUser);
  return (
    <div className="flex flex-col p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <img
        src={currentUser.avatar}
        alt="profilePic"
        className="rounded-full h-17 w-17 object-cover mb-10 self-center"
      />
      <form className="flex flex-col gap-4 max-w-2xl ">
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="Username"
          id="username"
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Email Address"
          id="email"
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed">
          Update
        </button>
        <button
          type="button"
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          Create Listing
        </button>
        <div className="flex flex-row justify-between text-red-600 font-normal text-[17px]">
          <button type="button">Delete Account</button>
          <button type="button">Sign Out</button>
        </div>
        <div className="text-center text-green-700"> Show listing</div>
      </form>
    </div>
  );
};

export default Profile;
