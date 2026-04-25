import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import OrderPage from "@/pages/order";
import OrdersPage from "@/pages/orders";
import AdminPage from "@/pages/admin";
import AddEmployeePage from "@/pages/add-employee";
import DeleteEmployeePage from "@/pages/delete-employee";
import DashboardPage from "@/pages/dashboard";
import { StoreProvider, useStore } from "@/store";

const queryClient = new QueryClient();

function Protected({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useStore();
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/">
        <Protected>
          <HomePage />
        </Protected>
      </Route>
      <Route path="/order">
        <Protected>
          <OrderPage />
        </Protected>
      </Route>
      <Route path="/orders">
        <Protected>
          <OrdersPage />
        </Protected>
      </Route>
      <Route path="/admin">
        <Protected>
          <AdminPage />
        </Protected>
      </Route>
      <Route path="/add-employee">
        <Protected>
          <AddEmployeePage />
        </Protected>
      </Route>
      <Route path="/delete-employee">
        <Protected>
          <DeleteEmployeePage />
        </Protected>
      </Route>
      <Route path="/dashboard">
        <Protected>
          <DashboardPage />
        </Protected>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StoreProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </StoreProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
