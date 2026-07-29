import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const fetchMachines = createAsyncThunk('machines/fetchMachines', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${API_URL}/api/machines`)
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        return await res.json()
    } catch (err) { return rejectWithValue(err.message) }
})

export const acknowledgeFault = createAsyncThunk('machines/acknowledgeFault', async (id, { rejectWithValue }) => {
    try {
        const res = await fetch(`${API_URL}/api/machines/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'idle' }),
        })
        if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || `Status ${res.status}`) }
        return await res.json()
    } catch (err) { return rejectWithValue(err.message) }
})

const machinesSlice = createSlice({
    name: 'machines',
    initialState: { list: [], status: 'idle', error: null, selectedId: null, statusFilter: 'all', searchTerm: '' },
    reducers: {
        selectMachine: (s, a) => { s.selectedId = a.payload },
        clearSelectedMachine: (s) => { s.selectedId = null },
        setStatusFilter: (s, a) => { s.statusFilter = a.payload },
        setSearchTerm: (s, a) => { s.searchTerm = a.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMachines.pending, (s) => { s.status = 'loading'; s.error = null })
            .addCase(fetchMachines.fulfilled, (s, a) => { s.status = 'succeeded'; s.list = a.payload })
            .addCase(fetchMachines.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload })
            .addCase(acknowledgeFault.pending, (s, a) => { const m = s.list.find(x => x.id === a.meta.arg); if (m) m.status = 'idle' })
            .addCase(acknowledgeFault.fulfilled, (s, a) => { const i = s.list.findIndex(x => x.id === a.payload.id); if (i !== -1) s.list[i] = a.payload })
            .addCase(acknowledgeFault.rejected, (s, a) => { s.error = a.payload })
    },
})

export const { selectMachine, clearSelectedMachine, setStatusFilter, setSearchTerm } = machinesSlice.actions
export default machinesSlice.reducer