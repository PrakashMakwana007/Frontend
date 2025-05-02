const PublishButton = ({ loading, disabled, onClick }) => {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      onClick={onClick}
      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        loading || disabled
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-base sm:py-3 sm:px-6 md:py-4 md:px-8`}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
          Uploading...
        </>
      ) : (
        "Publish"
      )}
    </button>
  );
};

export default PublishButton;
