export default function Destinations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">

      <a
        href="/destinations/domestic"
        className="border rounded-xl p-10 text-center shadow-sm hover:shadow-md transition bg-white"
      >
        <h2 className="text-2xl font-bold text-orange-600">Domestic</h2>
        <p className="text-gray-600 mt-2">Explore India’s beauty</p>
      </a>

      <a
        href="/destinations/international"
        className="border rounded-xl p-10 text-center shadow-sm hover:shadow-md transition bg-white"
      >
        <h2 className="text-2xl font-bold text-orange-600">International</h2>
        <p className="text-gray-600 mt-2">Discover the world</p>
      </a>

    </div>
  );
}
