import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu/Menu";
import TodoSection from "./components/Todo/TodoSection";
import TodoProvider from "./components/context/TodoProvider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="max-w-7xl mx-auto px-4 min-h-screen flex flex-col">
      <section className="mb-40">
        <TodoProvider>
          <Menu />
          <TodoSection />
        </TodoProvider>
      </section>
      <Footer />
      <Toaster />
    </main>
  );
}

export default App;
