function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Hello Tailwind!
          </h1>
          <p className="text-gray-600 mb-6">
            Your Tailwind CSS setup is working perfectly.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
