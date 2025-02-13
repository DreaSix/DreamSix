import React, { useState } from "react";
import "./App.css";
import Cookies from "js-cookie";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
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
import PlayersFinalList from "./Components/PlayersList/PlayersFinalList";
import Registration from "./Components/Registration/Registration";
import RegisterProcess from "./Components/Registration/RegisterProcess";
import Withdrawl from "./Components/Withdrawl/Withdrawl";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get("jwtToken"))  

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
        {/* {!isAuthenticated ? (
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : ( */}
          <>
            <Header setIsAuthenticated={setIsAuthenticated} />
            <Routes>
              <Route path="/register-process" element={<RegisterProcess />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/auction-type/:matchId" element={<AuctionTypePage />} />
              <Route path="/depositpage" element={<DepositPage />} />
              <Route path="/user-auctionpage" element={<USerAuctionPage />} />
              <Route path="/admin-auctionpage" element={<AdminAuctionPage />} />
              <Route path="/match-countdown/:matchId" element={<CountdownPage />} />
              <Route path="/payments-process" element={<PaymentsProcess />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/player-details" element={<PlayerDetails />} />
              <Route path="/payment-status" element={<PaymentStatus />} />
              <Route path="/bets" element={<MyBets />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/matchs-page" element={<MatchPage />} />
              <Route path="/players-list" element={<PlayersList />} />
              <Route path="/players-final-list/:matchId" element={<PlayersFinalList />} />
              <Route path="/withdrawl" element={<Withdrawl />} />
              <Route path="*" element={<Navigate to="/homepage" />} />
            </Routes>
            <Footer />
          </>
        {/* )} */}
      </Router>
    </div>
  );
}

export default App;
