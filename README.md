<div align="center">

  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=40&pause=1000&color=8B5CF6&center=true&vCenter=true&width=600&lines=Smart+Notes;Organize+Your+Thoughts;Real-Time+Syncing;Built+with+Next.js" alt="Typing SVG" />

  <p align="center">
    <strong>✨ A full-stack notes app featuring real-time syncing, secure authentication, and a responsive UI. ✨</strong>
  </p>

  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />

</div>

<br/>

## 🚀 Features
* **Live Synchronization:** Notes update instantly across all your devices without refreshing.
* **Secure Authentication:** User login and signup handled securely via Firebase Auth.
* **Smart Organization:** Pin your most important notes to the top of your dashboard.
* **Modern UI:** Built with Tailwind CSS, featuring glassmorphism elements, custom gradients, and seamless dark/light mode toggling.

---

## 🧠 Theory & Code Walkthrough

Below is a side-by-side look at how the core architecture of Smart Notes works under the hood.

<table>
  <tr>
    <th width="50%">Theory & Architecture</th>
    <th width="50%">Implementation</th>
  </tr>
  <tr>
    <td>
      <h3>1. Real-Time Data Syncing</h3>
      <p>Instead of making traditional REST API calls (GET/POST) that require the user to refresh the page, Smart Notes utilizes Firebase's <strong>WebSockets</strong>.</p>
      <p>By using the <code>onSnapshot</code> listener, the frontend maintains a continuous, open connection to Firestore. Any time a note is added or pinned, the database pushes the update directly to the client, triggering an immediate React state update.</p>
    </td>
    <td>
<pre><code>
const q = query(
  collection(db, "notes"),
  where("userEmail", "==", currentUser.email)
);

// Real-time listener
onSnapshot(q, (snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  
  setNotes(data); // Instantly updates UI
});
</code></pre>
    </td>
  </tr>
  <tr>
    <td>
      <h3>2. Auth State Management</h3>
      <p>To prevent "UI flashing" (where a logged-out user briefly sees the dashboard before being redirected), the app uses an Observer pattern for authentication.</p>
      <p>The <code>onAuthStateChanged</code> method acts as a global watcher. It silently verifies the user's secure token on every route change, dictating whether the Navbar shows the Dashboard or the Login/Signup buttons.</p>
    </td>
    <td>
<pre><code>
useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth, 
    (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
  });

  return () => unsubscribe();
}, []);
</code></pre>
    </td>
  </tr>
</table>

---
