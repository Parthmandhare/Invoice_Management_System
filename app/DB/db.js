import mongoose from 'mongoose';

const db_url = "mongodb+srv://parthmandhare12:eAq2rMh0bnf4lF9p@cluster0.sdgmj.mongodb.net/invoices?retryWrites=true&w=majority&appName=Cluster0";

// Create a function to connect to the database
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(db_url);
      console.log("Database is connected!");
    } catch (e) {
      console.log("Something went wrong while connecting db!", e);
    }
  }
};

// Schema definitions
const dummySchema = new mongoose.Schema({
  Fname: String,
  Age: Number
});

const invoiceSchema = new mongoose.Schema({
  Vendor_Name: String,
  Invoice_Number: Number,
  Status: String,
  Net_Amount: Number,
  Invoice_Date: Date,
  Due_Date: Date,
  Department: String,
  PO_Number: Number,
  Created_Date: Date
}, { timestamps: true });

// Model definitions with proper checking
const dummy = mongoose.models.Dummy || mongoose.model('Dummy', dummySchema);
const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

export { dummy, connectDB, Invoice };