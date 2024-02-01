export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile with id</h1>
      <hr />
      <p>Profile page with ID in URL (Different page)</p>
      <p>
        ID is : <span className="font-semibold">{params.id}</span>
      </p>
    </div>
  );
}
