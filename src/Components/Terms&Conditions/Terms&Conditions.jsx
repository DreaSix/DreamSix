import React from "react";
import { Card } from "antd";
import "./Terms&Conditions.scss";

const TermsAndConditions = () => {
  return (
    <main>
    <div className="terms-container">
      <Card className="terms-card" title="Terms and Conditions">
        <div className="terms-content">
          <h2>1. Introduction</h2>
          <p>
            Welcome to our betting app. By using our services, you agree to be bound by these Terms and Conditions.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old or the legal age for gambling in your jurisdiction to use this app.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            Users must provide accurate information and are responsible for maintaining the confidentiality of their account credentials.
          </p>

          <h2>4. Betting Rules</h2>
          <p>
            All bets are subject to our house rules. We reserve the right to void any bets suspected of fraud or unfair advantage.
          </p>

          <h2>5. Deposits and Withdrawals</h2>
          <p>
            Deposits and withdrawals must be made through approved payment methods. Processing times may vary.
          </p>

          <h2>6. Responsible Gambling</h2>
          <p>
            We promote responsible gambling. Users can set limits on deposits and self-exclude if necessary.
          </p>

          <h2>7. Privacy Policy</h2>
          <p>
            Your personal information is protected under our Privacy Policy. We do not share your data with third parties without consent.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued use of the app signifies acceptance of the changes.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions regarding these terms, please contact our support team.
          </p>
        </div>
      </Card>
    </div>      
    </main>
  );
};

export default TermsAndConditions;
