function Topbar() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-pulse">Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="font-medium">User</span>
        <div className="w-10 h-10 rounded-full bg-pulse flex items-center justify-center text-white font-semibold">
          U
        </div>
      </div>
    </header>
  );
}

export default Topbar;
