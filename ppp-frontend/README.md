# PPP Frontend

This project is a React application that interfaces with a FastAPI backend to manage and display Paycheck Protection Program (PPP) data. 

## Project Structure

```
ppp-frontend
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # React components
│   │   ├── BusinessSearch.tsx  # Component for searching businesses
│   │   ├── BusinessDetails.tsx  # Component for displaying business details
│   │   └── LoadDataButton.tsx   # Component for loading PPP data
│   ├── pages               # Page components
│   │   ├── Home.tsx       # Home page component
│   │   └── NotFound.tsx   # 404 Not Found page component
│   ├── api                 # API interaction functions
│   │   └── pppApi.ts      # Functions for interacting with FastAPI endpoints
│   ├── App.tsx            # Main application component
│   └── index.tsx          # Entry point for the React application
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd ppp-frontend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

## Usage

- Use the **Business Search** component on the home page to search for businesses by name, state, or city.
- Click on a business to view detailed information.
- Use the **Load Data** button to load PPP data from the backend.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.