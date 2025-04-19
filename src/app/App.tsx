import { Builder } from "@/components/builder/Builder";
import { AppNavbar } from "@/components/layout/AppNavbar";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <AppNavbar className="col-span-full" />
      <main className="px-7 py-[26px] flex-1 min-h-[calc(100vh-88px)]">
        <Builder />
      </main>
    </div>
  );
}

export default App;
