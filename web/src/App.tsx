import {
  Route,
  BrowserRouter as Router, Routes
} from "react-router-dom";
import { LayoutWrapper } from "./components/layout-wrapper";
import { Home } from "./pages/home";
import { Quote } from "./pages/quote";

const App = () => {
  return (
      <Router>
          <LayoutWrapper>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/:symbol" element={<Quote />} />
              </Routes>
          </LayoutWrapper>
      </Router>
  )
}

export default App
