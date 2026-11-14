# Finance Tracker

პირადი ფინანსების აღრიცხვის აპლიკაცია (React + Vite + Tailwind CSS).

## გაშვება

```bash
npm install
npm run dev        # დეველოპმენტი
npm run build      # production build
npm test           # Vitest + React Testing Library
```

## გამოქვეყნება (GitHub + Vercel)

1. შექმენით GitHub repository და ატვირთეთ პროექტი (`node_modules` და `dist` არ აიტვირთება — `.gitignore`-შია).
2. [vercel.com](https://vercel.com) → **Add New → Project** → აირჩიეთ repository. Vercel თავად ამოიცნობს Vite-ს:
   Build Command `npm run build`, Output Directory `dist`.
3. **Deploy**. `vercel.json` უზრუნველყოფს, რომ `/transactions`-ის განახლება 404-ს არ იძლეოდეს.

> ⚠️ `dist/index.html` ფაილზე ორჯერ დაკლიკებით (`file://`) გახსნისას გვერდი თეთრია — ბრაუზერი ბლოკავს JS-ს.
> ლოკალურად გამოიყენეთ `npm run dev` ან `npm run build && npm run preview`.

## ფუნქციონალი

- **რეგისტრაცია / ლოგინი** — `react-hook-form` + `yup` ვალიდაცია, token ინახება `localStorage`-ში (`token` key)
- **Protected routes** — დაუცველ გვერდებზე გადამისამართება `/login`-ზე
- **დაფა** — ბალანსი, შემოსავალი, ხარჯი, ხარჯები კატეგორიების მიხედვით, ბოლო ტრანზაქციები
- **ტრანზაქციები** — დამატება, რედაქტირება, წაშლა, ძებნა, ფილტრი (ტიპი/კატეგორია), დალაგება
- **მონაცემები** ინახება მომხმარებლის მიხედვით `localStorage`-ში
- **GeoLab ლოგო** — header-სა და footer-ში, დაკლიკებით იხსნება https://geolab.edu.ge/
- **Responsive** — მობილურზე burger menu
- **ოპტიმიზაცია** — `React.lazy` code splitting, `memo`/`useMemo`/`useCallback`, ერთადერთი სურათი — ლოგო (8 KB WebP), დანარჩენი SVG, მსუბუქი CSS დიაგრამა

## სტრუქტურა

```
src/
  components/   # Navbar (burger), FormField, StatsCards, CategoryChart, TransactionForm/List/Filters, ProtectedRoute
  pages/        # Login, Register, Dashboard, Transactions, NotFound
  context/      # AuthContext, TransactionsContext
  hooks/        # useTransactions
  utils/        # storage, authApi (mock backend), finance (გამოთვლები)
  test/         # Vitest ტესტები
```

## შენიშვნა

Backend არ არის: `src/utils/authApi.js` არის mock API. რეალურ სისტემაში აქ გამოიძახება სერვერის endpoint-ები და token სერვერისგან მიიღება.
