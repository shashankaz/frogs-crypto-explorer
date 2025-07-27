const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[90vh] bg-white">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
