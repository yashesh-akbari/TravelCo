export default function Policies() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-orange-600">Terms & Conditions / Privacy Policy</h1>

      <section className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-orange-600">Terms & Conditions</h2>
        <p className="text-sm text-gray-700">
          This is a sample terms page. Later this content will come from database admin editor.
        </p>
        <p className="text-sm text-gray-600">
          - All prices are subject to change<br/>
          - Booking is confirmed only after payment<br/>
          - TravelCo is not responsible for natural events / delays<br/>
        </p>
      </section>

      <section className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-orange-600">Privacy Policy</h2>
        <p className="text-sm text-gray-700">
          We collect basic user inputs (name, email) only for enquiry purpose. We do not sell data.
        </p>
      </section>

    </div>
  );
}
