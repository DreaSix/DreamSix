import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import LoginPage from "./Components/Login/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
import MainHomePage from "./Components/MainHomePage/MainHomePage";
import Rules from "./Components/Rules/Rules";
import DepositPage from "./Components/DepositPage/DepositPage";
import USerAuctionPage from "./Components/UserAuction/UserAuctionPage";
import AdminAuctionPage from "./Components/AdminAuctionPage/AdminAuctionPage";
import AuctionTypePage from "./Components/AuctionType/AuctionType";
import CountdownPage from "./Components/MatchCountDownPage/MatchCountDown";
import PaymentsProcess from "./Components/PaymentsProcess/PaymentsProcess";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import TransactionPage from "./Components/Transactions/Transactions";
import PaymentStatus from "./Components/PaymentStatus/PaymentStatus";
import MyBets from "./Components/MyBets/MyBets";
import ContactUs from "./Components/ContactUs/ContactUs";
import PlayerDetails from "./Components/MyBets/PlayerDetails";
import MatchPage from "./Components/MatchDeatils/MatchDetails";
import PlayersList from "./Components/PlayersList/PlayersList";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Router>
        {/* {isAuthenticated ? <NavbarAfterLogin /> : <NavbarBeforeLogin />} */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/main-homepage" element={<MainHomePage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/auction-type" element={<AuctionTypePage />} />
          <Route path="/depositpage" element={<DepositPage />} />
          <Route path="/user-auctionpage" element={<USerAuctionPage />} />
          <Route path="/admin-auctionpage" element={<AdminAuctionPage />} />
          <Route path="/match-countdown" element={<CountdownPage />} />
          <Route path="/payments-process" element={<PaymentsProcess />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/players" element={<TransactionPage />} />
          <Route path="/player-details" element={<PlayerDetails />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/bets" element={<MyBets />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/matchs-page" element={<MatchPage />} />
          <Route path="/players-list" element={<PlayersList />} />
          <Route path="/players-final-list" element={<PlayersList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
