async function UserProfile({ params }: any) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">{id}</span>
      </p>
    </div>
  );
}

export default UserProfile;
