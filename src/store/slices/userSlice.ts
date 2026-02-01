import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const userSlice = createSlice({
    name: 'user',
    initialState: { isAuthenticated: false, user: null, token: null },
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            localStorage.setItem('isAuthenticated', action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
    },
});

const register = createAsyncThunk(
    'users/register',
    async (data: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
    const login = createAsyncThunk(
        'users/login',
        async (data: { email: string, password: string }, { rejectWithValue }) => {
            try {
                const response = await axiosInstance.post('/auth/login', data);
                return response.data;
            } catch (error) {
                return rejectWithValue(error);
            }
        }
    )


export { register, login };
export const { setIsAuthenticated, setUser, setToken } = userSlice.actions;
export default userSlice.reducer;