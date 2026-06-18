import MainLayout from "../layouts/MainLayout";

function Settings() {
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <p className="text-gray-600">
          Manage your application settings and preferences here.
        </p>
      </div>
    </MainLayout>
  );
}

export default Settings;
