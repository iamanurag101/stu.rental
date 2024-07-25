import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    latitude: { 
        type: Number, 
        required: true 
    },
    longitude: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String 
    },
    
    availabilityStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
