import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">System zarządzania użytkownikami i dostępem w oparciu o Auth0</h1>

    <p className="lead">
      Jest to prosta aplikacja jednostronicowa na projekt Zarządzanie bezpieczeństwem informacji, ktorej celem jest prezentacja zaimplementowanych funkcjonalnosci oferowanych przez Auth0.
    </p>
  </div>
);

export default Hero;
