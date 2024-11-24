



export default async function Home() {
  
  const data = [
    {
      vendor: "Volopay Pvt. Ltd.",
      invoice: "No: 1000101 IN000000161",
      status: "Awaiting Approval",
      amount: "2,93,000",
      date: "18-03-2024",
      due: "28-04-2024",
      department: "Marketing",
      costCenter: "Bangalore",
    },
    // Add more rows as needed
  ];

  const getStatusBadge = (status) => {
    const statusColors = {
      "Awaiting Approval": "bg-purple-100 text-purple-700",
      Open: "bg-blue-100 text-blue-700",
      Approved: "bg-green-100 text-green-700",
      "Vendor not found": "bg-orange-100 text-orange-700",
      Processing: "bg-yellow-100 text-yellow-700",
      Paid: "bg-teal-100 text-teal-700",
    };
  }  

  return (
   <>
      
      GO to /invoices please
     
      
   </>
  );
}
