import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import TodoSection from "./components/Todo/TodoSection";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="max-w-7xl mx-auto px-4 min-h-screen flex flex-col">
      <section className="mb-40">
        <Menu />
        <TodoSection />
      </section>
      <Footer />
      <Toaster />
    </main>
  );
}

export default App;
