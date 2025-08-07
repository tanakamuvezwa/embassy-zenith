import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import VisaInfo from "./pages/VisaInfo";
import Articles from "./pages/Articles";
import ArticleEditor from "./pages/ArticleEditor";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Employees from "./pages/Employees";
import Recruitment from "./pages/Recruitment";
import InCountryCheck from "./pages/InCountryCheck";
import BusinessVisas from "./pages/BusinessVisas";
import StudentVisas from "./pages/StudentVisas";
import TouristVisas from "./pages/TouristVisas";
import Contacts from "./pages/Contacts";
import Appointments from "./pages/Appointments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/visa-info" element={<VisaInfo />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/new" element={<ArticleEditor />} />
          <Route path="/articles/edit/:id" element={<ArticleEditor />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/recruitment" element={<Recruitment />} />
          <Route path="/in-country-check" element={<InCountryCheck />} />
          <Route path="/visa-applications/business" element={<BusinessVisas />} />
          <Route path="/visa-applications/student" element={<StudentVisas />} />
          <Route path="/visa-applications/tourist" element={<TouristVisas />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
