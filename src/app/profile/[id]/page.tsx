export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-200 text-black">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className=" p-2 ml-2 rounded text-blue-600">{params.id}</span>
      </p>
    </div>
  );
}
