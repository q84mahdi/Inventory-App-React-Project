import CategoryForm from "./components/CategoryForm";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";
import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <div className="bg-slate-800 max-h-fit min-h-screen">
        <Navbar />

        {/* Container */}
        <div className="flex flex-col items-center justify-center px-4">
          {/* App Content */}
          <div className="container max-w-lg mx-auto relative">
            <CategoryForm />

            <ProductForm />

            <ProductsList />
          </div>
        </div>
      </div>
    </AppProviders>
  );
}

export default App;
