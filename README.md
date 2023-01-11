# SPA + REST API application based on Auth0 solution.

Supports OIDC authentication and authorization based on Authorization Code Flow with PCKE.

The application was created for a project at the university.

Compatible with Node.js 16.

## Installation
```git clone https://github.com/AlpenGod/pwr-zbi-auth0-spa```  
```cd pwr-zbi-auth0-spa```  
```npm install```  
Next, populate the src/auth_config.json file with the appropriate Auth0 values. Look at src/auth_config_example.json as a reference.

## Usage
```npm run dev```

## Troubleshooting

The frontend, located on port 3000 by default, uses a self signed cert, so it is necessary to accept it.  

The backend, located by default on port 3001, does not use TLS. Because of this, the browser can block loading mixed active content. For testing purposes, it may be necessary to temporarily disable this layer of protection.
