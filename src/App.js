import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

const LoginPage = lazy(() => import("./Components/Login/LoginPage"));
const HomePage = lazy(() => import("./Components/HomePage/HomePage"));
const Rules = lazy(() => import("./Components/Rules/Rules"));
const DepositPage = lazy(() => import("./Components/DepositPage/DepositPage"));
const UserAuctionPage = lazy(() => import("./Components/UserAuction/UserAuctionPage"));
const AdminAuctionPage = lazy(() => import("./Components/AdminAuctionPage/AdminAuctionPage"));
const AuctionTypePage = lazy(() => import("./Components/AuctionType/AuctionType"));
const CountdownPage = lazy(() => import("./Components/MatchCountDownPage/MatchCountDown"));
const PaymentsProcess = lazy(() => import("./Components/PaymentsProcess/PaymentsProcess"));
const ChangePassword = lazy(() => import("./Components/ChangePassword/ChangePassword"));
const TransactionPage = lazy(() => import("./Components/Transactions/Transactions"));
const PaymentStatus = lazy(() => import("./Components/PaymentStatus/PaymentStatus"));
const MyBets = lazy(() => import("./Components/MyBets/MyBets"));
const ContactUs = lazy(() => import("./Components/ContactUs/ContactUs"));
const PlayerDetails = lazy(() => import("./Components/MyBets/PlayerDetails"));
const MatchPage = lazy(() => import("./Components/MatchDeatils/MatchDetails"));
const PlayersList = lazy(() => import("./Components/PlayersList/PlayersList"));
const PlayersFinalList = lazy(() => import("./Components/PlayersList/PlayersFinalList"));
const Registration = lazy(() => import("./Components/Registration/Registration"));
const RegisterProcess = lazy(() => import("./Components/Registration/RegisterProcess"));
const Withdrawl = lazy(() => import("./Components/Withdrawl/Withdrawl"));
const Header = lazy(() => import("./Components/Header/Header"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const OtpVerification = lazy(() => import("./Components/OtpVerification/OtpVerification"));
const TermsAndConditions = lazy(() => import("./Components/Terms&Conditions/Terms&Conditions"));
const PlayerModal = lazy(() => import("./Components/ReusableCode/SoldModal"));
const Updates = lazy(() => import("./Components/Updates/Updates"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get("jwtToken"));

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <>
              <Header setIsAuthenticated={setIsAuthenticated} />
              <Routes>
                <Route path="/register-process" element={<RegisterProcess />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/auction-type/:matchId" element={<AuctionTypePage />} />
                <Route path="/depositpage" element={<DepositPage />} />
                <Route path="/user-auctionpage/:matchId" element={<UserAuctionPage />} />
                <Route path="/admin-auctionpage" element={<AdminAuctionPage />} />
                <Route path="/match-countdown/:matchId" element={<CountdownPage />} />
                <Route path="/payments-process" element={<PaymentsProcess />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/player-details" element={<PlayerDetails />} />
                <Route path="/payment-status/:id" element={<PaymentStatus />} />
                <Route path="/bets" element={<MyBets />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/matchs-page" element={<MatchPage />} />
                <Route path="/players-list" element={<PlayersList />} />
                <Route path="/players-final-list/:matchId" element={<PlayersFinalList />} />
                <Route path="/withdrawl" element={<Withdrawl />} />
                <Route path="/otpverification" element={<OtpVerification />} />
                <Route path="/terms&conditions" element={<TermsAndConditions />} />
                <Route path="/soldmodal" element={<PlayerModal />} />
                <Route path="/updates" element={<Updates />} />
                <Route path="*" element={<Navigate to="/homepage" />} />
              </Routes>
              <Footer />
            </>
          )}
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
