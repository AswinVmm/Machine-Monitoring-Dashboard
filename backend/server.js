const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'machines.json');

app.use(cors());
app.use(express.json());

let machines = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const VALID_STATUSES = ['running', 'idle', 'fault'];

app.get('/api/machines', (req, res) => {
    res.status(200).json(machines);
});

app.get('/api/machines/:id', (req, res) => {
    const machine = machines.find((m) => m.id === req.params.id);
    if (!machine) return res.status(404).json({ error: `Machine with id '${req.params.id}' not found` });
    res.status(200).json(machine);
});

app.patch('/api/machines/:id/status', (req, res) => {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Request body must include a 'status' field" });
    if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid status '${status}'. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    const index = machines.findIndex((m) => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: `Machine with id '${req.params.id}' not found` });

    machines[index] = { ...machines[index], status, lastUpdated: new Date().toISOString() };
    res.status(200).json(machines[index]);
});

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => { console.error(err.stack); res.status(500).json({ error: 'Internal server error' }); });

app.listen(PORT, () => console.log(`server running on ${PORT}`));