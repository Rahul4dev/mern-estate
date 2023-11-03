import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { ListingItem } from '../components';

const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);

  return (
    <div>
      {/* { Top } */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find Your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-slate-400 text-xs sm:text-sm">
          React Estate is the best place to find your next perfect place to
          live. <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Lets Start now...{' '}
        </Link>
      </div>
      {/* { Swiper } */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* { Listing results } */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                to={'/search?offer=true'}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Rentals
              </h2>
              <Link
                to={'/search?type=rent'}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more Rentals
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sales
              </h2>
              <Link
                to={'/search?type=sale'}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more properties for sales
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
