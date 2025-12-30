const Bus = require('../models/Bus');

// @desc    Get list of buses
// @route   GET /api/buses
// @access  Private
const getBuses = async (req, res) => {
    console.log('Attempting to fetch buses...');
    console.log('User making request:', req.user);
    try {
        let buses = await Bus.find({});

        if (buses.length === 0) {
            // If no buses are in the DB, seed it with the default list
            const defaultBuses = [
                { busId: '4519', name: 'Bus 1: 4519' },
                { busId: '4520', name: 'Bus 2: 4520' },
                { busId: '0090', name: 'Bus 3: 0090' },
                { busId: '2897', name: 'Bus 4: 2897' },
                { busId: '0084', name: 'Bus 5: 0084' },
            ];
            await Bus.insertMany(defaultBuses);
            buses = await Bus.find({});
        }

        // The frontend expects 'id', so we'll map '_id' to 'id'
        const formattedBuses = buses.map(bus => ({
            id: bus.busId,
            name: bus.name
        }));

        res.json(formattedBuses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getBuses };
