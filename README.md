# 📌 Project Overview

## 🚀 Available Routes
- `/` → **Entry page** (list of users)  
- `/users/:id` → **User detail page**  
- `/404` → **Not Found page**  

---

## 📖 Description
This Angular project demonstrates a modern **zoneless application** with reactive state management using **signals** and **observer patterns**.  

- The **entry page** fetches a list of users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users).  
- Users are displayed in **card** and **list views**, with **search** and **pagination** features to filter results.  
- Clicking on a card or table row navigates to the **user detail page**, showing more information.  
- If the requested resource exists, details are shown. Otherwise, a **404 page** notifies the user.  

---

## ✨ Features
- 🔄 **Observer Pattern** – Fetch data with `HttpClient` and update UI reactively.  
- ⚡ **Angular Signals** – Manage reactivity (e.g., search and pagination in user-list).  
- 🌀 **Zoneless Angular** – Performance-optimized without relying on `zone.js`.  
- 🧩 **Dependency Injection** – Using both `injector()` API and traditional constructor injection.  
- 🛣️ **Angular Routing** – Navigate between pages, set/query params, and fetch route params.  
- 🎨 **Bootstrap + ng-bootstrap** – Responsive styling and UI components.  
- 📥 **Input Signals** – Reactive inputs between components.  
- 📝 **Reactive Forms** – Using `formControl()` in sync with signals for dynamic form handling.  

---

## 🛠️ Tech Stack
- **Angular** (latest)  
- **Bootstrap** / **ng-bootstrap**  
- **JSONPlaceholder API** (for demo data)  

---

