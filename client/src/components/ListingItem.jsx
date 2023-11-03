import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

/* eslint-disable react/prop-types */
export default function ListingItem({ listing }) {
  const defaultImageAddress =
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTAwMTQwMg&ixlib=rb-4.0.3&q=80&w=1080';
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || defaultImageAddress}
          alt="listing cover"
          className="h-[320px] sm:h-[240px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <h1 className="text-lg  font-semibold text-slate-700 truncate">
            {listing.name}
          </h1>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-700">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="font-semibold text-gray-600 mt-1 ">
            $
            {listing.offer
              ? listing.discountedPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="flex gap-4 text-sm font-semibold text-gray-600">
            <p>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </p>
            <p>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
