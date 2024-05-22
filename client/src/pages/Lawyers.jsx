
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../utils';
import { Loading } from "../components";
import Lawyer from '../components/Lawyer';

const LawyerPage = () => {
  const [lawyers, setLawyers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLawyers = async () => {
      setIsFetching(true);
      try {
        const res = await apiRequest({
          url: '/user/getAllUsers',
          method: 'GET',
        });
        setLawyers(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchLawyers();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const filteredLawyers = await lawyers.filter((lawyer) => {
        return (
          lawyer.title.toLowerCase().includes(query) ||
          lawyer.name.toLowerCase().includes(query)
        );
      });
      setLawyers(filteredLawyers);
    } else {
      const fetchLawyers = async () => {
        setIsFetching(true);
        try {
          const res = await apiRequest({
            url: '/user/getAllUsers',
            method: 'GET',
          });
          setLawyers(res);
        } catch (error) {
          console.error(error);
        } finally {
          setIsFetching(false);
        }
      };
      await fetchLawyers();
    }
  };

  return (
    <div className='container mx-auto p-5'>
      <h1 className='heading'>Lawyers</h1>
      <form onSubmit={handleSearch} className='flex search flex-wrap mb-4'>
        <input
          type='text'
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          placeholder='Search lawyers'
          className='w-full md:w-1/2 px-3 mb-6 md:mb-0'
        />
        <button
          type='submit'
          className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'
        >
          Search
        </button>
      </form>
      {isFetching ? (
        <Loading />
      ) : (
        <div className='flex flex-wrap -mx-3'>
          <Lawyer lawyers={lawyers} />
        </div>
      )}
    </div>
  );
};

export default LawyerPage;