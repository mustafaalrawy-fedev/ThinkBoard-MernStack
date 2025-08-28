import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import axiosInstance from '../lib/axios';

/*
  GET ALL NOTES
*/
const useGet = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [NotesData, setNotesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/notes');
        const { data } = response;
        setNotesData(data);
        setIsError(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        handleError(error, 'Failed To Get Notes!', null, setIsRateLimited);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { isRateLimited, NotesData, isLoading, setNotesData, isError };
};

// ==========================================================
// ==========================================================

/*
  CREATE NEW NOTE
*/
const usePost = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createdData, setCreatedData] = useState([]);
  const navigate = useNavigate();

  const handlePost = async (payload) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post('/notes', payload);
      const { data } = response;
      setCreatedData(data);
      toast.success('Note Created Successfully!');
      navigate('/');
      return data;
    } catch (error) {
      console.log(error);
      const rateLimitToast = () =>
        toast.error("Slow Down, You're Creating Notes Too Fast!", {
          duration: 5000,
          icon: '💀',
          className: 'text-sm font-bold',
        });
      handleError(
        error,
        'Failed To Create Note!',
        rateLimitToast,
        setIsRateLimited
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { isRateLimited, handlePost, isLoading, createdData, setCreatedData };
};

// ==========================================================
// ==========================================================

/*
  DELETE NOTE
*/
const useDelete = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedData, setDeletedData] = useState([]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.delete(`notes/${id}`);
      const { data } = response;
      setDeletedData(data);
      toast.success('Note Deleted Successfully!');
      return data;
    } catch (error) {
      console.log(error);
      handleError(error, 'Failed To Delete Note!', null, setIsRateLimited);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isRateLimited,
    handleDelete,
    isLoading,
    deletedData,
    setDeletedData,
  };
};

// ==========================================================
// ==========================================================

/*
  GET NOTE BY ID
*/
const useGetNoteById = (id) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [NoteData, setNoteData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoteById = async (id) => {
      try {
        const response = await axiosInstance.get(`notes/${id}`);
        const { data } = response;
        setNoteData(data);
      } catch (error) {
        console.log(error);
        const rateLimitToast = () => {
          navigate('/');
          return toast.error('Slow Down, You Are Fetching The Note Too Fast!', {
            duration: 5000,
            icon: '💀',
            className: 'text-sm font-bold',
          });
        };
        handleError(
          error,
          'Failed To Get Note!',
          rateLimitToast,
          setIsRateLimited
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchNoteById(id);
  }, [id, navigate]);
  return { isRateLimited, NoteData, isLoading };
};

// ==========================================================
// ==========================================================

/*
  UPDATE NOTE
*/
const usePut = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [UpdatedData, setUpdatedData] = useState([]);
  const navigate = useNavigate();

  const handlePut = async (id, payload) => {
    try {
      setIsSaving(true);
      const response = await axiosInstance.put(`notes/${id}`, payload);
      const { data } = response;
      setUpdatedData(data);
      toast.success('Note Updated Successfully!');
      navigate('/');
      return data;
    } catch (error) {
      console.log(error);
      handleError(error, 'Failed To Update Note!', null, setIsRateLimited);
    } finally {
      setIsSaving(false);
    }
  };
  return { isRateLimited, handlePut, isSaving, UpdatedData, setUpdatedData };
};

// ==========================================================
// ==========================================================

/*
  HANDLE ERROR ISOLATED
*/
const handleError = (
  error,
  toastErrorMsg,
  rateLimitToast,
  setIsRateLimited
) => {
  if (error?.response?.status === 429) {
    console.log('Rate Limit Reached');
    if (rateLimitToast) rateLimitToast();
    setIsRateLimited(true);
  } else {
    toast.error(toastErrorMsg);
  }
};

export { useGet, usePost, useDelete, usePut, useGetNoteById };
