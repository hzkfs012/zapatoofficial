
import React from 'react';
import { Database } from '@/integrations/supabase/types';

type Booking = Database['public']['Tables']['booking_requests']['Row'];

interface InvoiceTemplateProps {
  booking: Booking;
  invoiceRef: React.RefObject<HTMLDivElement>;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ booking, invoiceRef }) => {
  return (
    <div ref={invoiceRef} className="p-8 bg-white text-black w-[800px]">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="flex items-center space-x-4">
            <img src="/icons/brush.svg" alt="Shoe Shine Service Logo" className="h-14 w-14" />
            <div>
                <h2 className="text-2xl font-semibold">Zapato Lauderia.co</h2>
                <p className="text-sm text-gray-600">2nd Floor, Opposit KSEB office</p>
                <p className="text-sm text-gray-600">Siraj Bypass road, Koduvally</p>
                <p className="text-sm text-gray-600">zapatolauderiaco@gmail.com</p>
            </div>
        </div>
        <div className="text-right">
          <h1 className="text-4xl font-bold text-gray-800">Invoice</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h3 className="font-semibold mb-2 text-gray-700">Bill To:</h3>
          <p>{booking.name}</p>
          <p>{booking.email}</p>
          {booking.phone && <p>{booking.phone}</p>}
        </div>
        <div className="text-right">
          <p><span className="font-semibold">Invoice #:</span> {booking.id.slice(0, 8).toUpperCase()}</p>
          <p><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
          <p><span className="font-semibold">Booking Date:</span> {new Date(booking.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <table className="w-full mb-8 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left font-semibold text-gray-600">Service Description</th>
            <th className="p-2 text-right font-semibold text-gray-600">Amount</th>
          </tr>
        </thead>
        <tbody>
          {booking.service.map((s, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{s}</td>
              <td className="p-2 text-right">{index === booking.service.length - 1 && booking.payment_amount ? `₹${(booking.payment_amount / 100).toFixed(2)}` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-end">
        <div className="w-1/3">
            <div className="flex justify-between mb-2">
                <span className="font-semibold">Subtotal:</span>
                <span>{booking.payment_amount ? `₹${(booking.payment_amount / 100).toFixed(2)}` : 'N/A'}</span>
            </div>
            <div className="flex justify-between mb-2 font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>{booking.payment_amount ? `₹${(booking.payment_amount / 100).toFixed(2)}` : 'N/A'}</span>
            </div>
             <div className="flex justify-between text-sm">
                <span className="font-semibold">Payment Status:</span>
                <span className="capitalize font-medium text-green-600">{booking.payment_status}</span>
            </div>
        </div>
      </div>

      <div className="mt-16 text-center text-xs text-gray-500">
        <p>Thank you for your business!</p>
        <p>If you have any questions, please contact us.</p>
      </div>
    </div>
  );
};
