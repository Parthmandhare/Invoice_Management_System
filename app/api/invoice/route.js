import { connectDB, Invoice } from "@/app/DB/db";
import { NextResponse } from "next/server";

// create invoice
export async function POST(req) {
  try {
    await connectDB(); // Ensure database connection

    const data = await req.json(); // Use req.json() instead of req.body in Next.js API routes
    console.log("data from body:", data);

    const newInvoice = await Invoice.create(data);
    console.log("doc is created:", newInvoice);

    return NextResponse.json(
      {
        success: true,
        doc: newInvoice,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// delete invoice
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const invoiceID = searchParams.get("id");
    console.log("Invoice ID to delete:", invoiceID);

    await connectDB();
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceID);

    if (!deletedInvoice) {
      return NextResponse.json(
        { success: false, message: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Invoice deleted", id: invoiceID },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting invoice",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// get all invoices with filters
export async function GET(req) {
    try {
        // Alternative way to get query parameters
        const url = new URL(req.url);
        const Vendor_Name = url.searchParams.get('Vendor_Name');
        const Status = url.searchParams.get('Status');
        const Invoice_Number = url.searchParams.get('Invoice_Number');
        
        // Build query object
        const query = {};
        
        if (Vendor_Name) {
            query.Vendor_Name = new RegExp(Vendor_Name, 'i'); 
        }
        
        if (Status) {
            query.Status = Status;
        }
        if (Invoice_Number) {
            query.Invoice_Number = Invoice_Number;
        }
        
        console.log('URL:', req.url);
        console.log('Query Parameters:', { Vendor_Name, Status });
        console.log('MongoDB Query:', query);
        
        await connectDB();
        const docs = await Invoice.find(query);
        
        return NextResponse.json(
          {
            success: true,
            data: docs,
          },
          {
            status: 202,
          }
        );
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
          {
            success: false,
            data: error.message,
          },
          {
            status: 500,
          }
        );
    }
}
