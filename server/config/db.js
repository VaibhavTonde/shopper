import mongoose from 'mongoose';


const connectDB = async (params) => {

    const dbURI = process.env.MONGO_URI;

    try {
        const conn = mongoose.connect(dbURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`-------MongoDB connection successfull-------`);

    } catch (error) {
        console.log(`-------MongoDB Connection to Database Failed! : ${error.message}-------`);
        process.exit(1);
    }
}

export default connectDB;