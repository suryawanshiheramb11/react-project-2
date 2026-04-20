# Personal Finance & Expense Analytics App

A robust and modern Personal Finance application designed to help users track their income, monitor expenses, and carefully maintain a budget. Built with React, this app showcases a premium, fully customized dark-mode glassmorphic design and highly intuitive user flows without relying on heavy external styling libraries.

## 🚀 Features

- **Interactive Dashboard**: At-a-glance financial insights, giving you real-time tracking of your total income, total expenses, and net balance.
- **Transaction Management**: Add, edit, and safely delete your incomes and expenses with multiple categories (Food, Travel, Rent, Subscriptions, etc). The forms are validated precisely via `react-hook-form` & `yup`.
- **Deep Visual Analytics**: Interactive Pie Charts, Bar Charts, and Trend Line Charts utilizing `recharts` to map out and give perspective on your spending habits over time.
- **Budget Tracking**: Set a monthly budget, actively monitor category expenses, and get visual warnings when you begin reaching or over-extending your goals.
- **Data Persistence**: Transactions logically sync and safely persist on the local environment utilizing robust `LocalStorage` mapping.
- **Dynamic Routing**: Multi-page layout orchestrated flawlessly with `react-router-dom`.

## 🛠️ Technology Stack

- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (CSS Modules & Variables) + Glassmorphism Aesthetics
- **State Management**: React Context API (`FinanceContext`)
- **Routing**: React Router DOM v6
- **Forms & Validation**: React Hook Form + Yup
- **Charts / UI**: Recharts + Framer Motion
- **Utilities**: date-fns (Dates), uuid (Unique IDs)

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/suryawanshiheramb11/react-project-2.git
   cd react-project-2
   ```

2. **Install the dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port specified by Vite) to view the application in action.

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components (Charts, TransactionCard, BudgetCard)
├── context/             # Global state logic (FinanceContext)
├── hooks/               # Custom reusable logic (useTransactions, useBudget)
├── pages/               # Primary routed views (Dashboard, Transactions, addTransaction)
├── services/            # Setup for any external fetching interfaces
├── utils/               # Formatting scripts (e.g. currencyFormatter)
├── App.jsx              # Main routing and wrapper setup
└── index.css            # Global design tokens and utilities
```
