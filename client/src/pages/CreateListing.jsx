const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className=" flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5 ml-2" id="sale" />
              <label htmlFor="sale">Sale</label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" className="w-5  ml-2" id="Rent" />
              <label htmlFor="Rent">Rent</label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" className="w-5  ml-2" id="Parking" />
              <label htmlFor="Parking">Parking Spot</label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" className="w-5  ml-2" id="Furnished" />
              <label htmlFor="Furnished">Furnished</label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" className="w-5  ml-2" id="Offer" />
              <label htmlFor="Offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-[65px] h-15 border-gray-300 rounded-lg"
                id="bedrooms"
                min={'1'}
                max={'10'}
                required
              />
              <label htmlFor="bedrooms">Beds</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-[65px] h-15 border-gray-300 rounded-lg"
                id="bathrooms"
                min={'1'}
                max={'10'}
                required
              />
              <label htmlFor="bathrooms">Baths</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                id="price"
                min={'1'}
                max={'10'}
                required
              />
              <label htmlFor="price" className="flex flex-col">
                Regular Price{' '}
                <span className="text-center text-xs">($ / Month)</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                id="discount"
                min={'1'}
                max={'10'}
                required
              />
              <label htmlFor="discount" className="flex flex-col">
                Discounted Price{' '}
                <span className="text-center text-xs">($ / Month)</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold pl-2">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              className="p-3 border border-gray-300 rounded w-full cursor-pointer"
              multiple
            />
            <button className="p-3  text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 mt-4 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
