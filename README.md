# Expo Product Explorer 🚀

**Student Name:** Muhammad Abubakar Ali  
**Roll Number:** 22i-2693  
**Course Assignment:** Expo + Git + GitHub + Expo MCP + GitHub Actions  

---

## 📁 Repository Structure
```text
expo-product-explorer/
├── .github/
│   └── workflows/
│       └── expo-ci.yml
├── Screenshot/
│   ├── 01-local-project.png
│   ├── 02-expo-qr.png
│   ├── 03-updated-ui.png
│   └── 04-github-actions.png
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── explore.tsx
│   ├── components/
│   │   └── ProductCard.tsx
│   └── hooks/
├── assets/
├── package.json
├── package-lock.json
├── eslint.config.js
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Expo Development Server
```bash
npx expo start
```
- Press `w` to open in browser (Web)
- Press `a` to open in Android Emulator
- Scan the on-screen QR code with **Expo Go** on your physical mobile device.

### 3. Run Lint Checks Locally
```bash
npm run lint
```

---

## 🔄 End-to-End Workflow Followed

### Steps 1–6: Local Setup & GitHub Connection
```bash
# Initialize project & branch
git init
git branch -M main

# Add remote & push initial commit
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/expo-product-explorer.git
git push -u origin main
```

### Steps 7–9: Feature Branching & UI Modification
```bash
# Create feature branch
git checkout -b feature/products

# Commit UI enhancements with student info (Muhammad Abubakar Ali, 22i-2693)
git add .
git commit -m "Add product explorer UI and student details Muhammad Abubakar Ali (22i-2693)"
git push -u origin feature/products
```

### Steps 10–12: Expo MCP Integration
The **Expo MCP Server** (`@expo/mcp-server`) provides AI agents with context regarding official Expo SDK docs, EAS configuration, and dependency validation.
- **Official Documentation:** [docs.expo.dev/mcp](https://docs.expo.dev/mcp/)
- **Command / Integration:**
  ```json
  {
    "mcpServers": {
      "expo": {
        "command": "npx",
        "args": ["-y", "@expo/mcp-server"]
      }
    }
  }
  ```

### Steps 14–18: GitHub Actions CI & Pull Request
1. Created `.github/workflows/expo-ci.yml` running on `ubuntu-latest` with Node 20, `npm ci`, and `npm run lint`.
2. Created a Pull Request from `feature/products` into `main`.
3. GitHub Actions CI runs automatically and passes with a green checkmark.
4. Reviewed and merged the Pull Request into `main`.

---

## 🧪 Pipeline Break & Fix Demonstration

### Part A: Green Build
- The current codebase is clean and passes `npm run lint` and CI.

### Part B: Introduce Controlled Error (Break the Pipeline)
To test pipeline failure, introduce an unused variable or syntax/lint error in `src/app/index.tsx`:
```typescript
const unusedValue: string = 123; // Lint / Type error
```
Push this to the branch and observe the red failure in the GitHub Actions tab.

### Part C: Diagnose & Fix
1. Open the failed run in GitHub Actions.
2. Read the error log in the `Run lint` step.
3. Remove the invalid code and run `npm run lint` locally to confirm.
4. Commit and push the fix:
   ```bash
   git add .
   git commit -m "Fix lint error in index.tsx"
   git push
   ```
5. Observe the GitHub Actions check turn green!

---

## 📸 Screenshots Checklist (`Screenshot/` folder)
Place your screenshots in the `Screenshot/` directory with the following names:
1. `01-local-project.png` — Screenshot showing project folder/files on your computer.
2. `02-expo-qr.png` — Screenshot showing the Expo QR code in your terminal (`npx expo start`).
3. `03-updated-ui.png` — Screenshot of the application running with your Name & Roll on mobile/web.
4. `04-github-actions.png` — Screenshot showing your GitHub Actions CI workflow successfully passed on GitHub.
