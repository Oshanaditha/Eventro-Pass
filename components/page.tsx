// "use client";

// import React, { useEffect, useState } from "react";

// /**
//  * TicketBooking - Registration & Profile React component (Next.js + Tailwind)
//  * - Supports registration by Email (with password) or Mobile (OTP)
//  * - OAuth button placeholders for Google / Facebook / Apple
//  * - Profile management (edit/save preferences)
//  *
//  * NOTES for integration:
//  * - Implement server endpoints: /api/auth/send-otp, /api/auth/verify-otp, /api/auth/register, /api/profile
//  * - For OTP delivery use an SMS/WhatsApp provider (e.g., Twilio, MessageBird, Dialog eZ, etc.)
//  * - For OAuth use NextAuth.js or your preferred OAuth flow and point the buttons to /api/auth/<provider>
//  * - This component uses localStorage as a fallback so you can try the flows in the browser without a backend.
//  */

// const DEFAULT_CATEGORIES = [
//   "Music",
//   "Sports",
//   "Theatre",
//   "Exhibitions",
//   "Festivals",
//   "Conferences",
//   "Workshops",
// ];

// export default function TicketAuthProfile({ brandName = "LankaTickets" }) {
//   const [view, setView] = useState("register"); // register | otp | profile
//   const [method, setMethod] = useState("mobile"); // mobile | email | oauth

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     nic: "",
//     categories: [],
//   });

//   // OTP / verification
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // If you're developing locally and haven't created backend endpoints, we'll fallback to a mock mode.
//   const isMock = typeof window !== "undefined" && window.location.hostname === "localhost";

//   useEffect(() => {
//     const saved = typeof window !== "undefined" && localStorage.getItem("tk_profile_v1");
//     if (saved) {
//       try {
//         const p = JSON.parse(saved);
//         setForm((s) => ({ ...s, ...p }));
//         // assume user already registered -> show profile
//         if (p.email || p.mobile) setView("profile");
//       } catch (e) {
//         // ignore
//       }
//     }
//   }, []);

//   // OTP countdown
//   useEffect(() => {
//     if (timer <= 0) return undefined;
//     const id = setTimeout(() => setTimer((t) => t - 1), 1000);
//     return () => clearTimeout(id);
//   }, [timer]);

//   function setField(k, v) {
//     setForm((f) => {
//       const next = { ...f, [k]: v };
//       return next;
//     });
//   }

//   function toggleCategory(cat) {
//     setForm((f) => {
//       const exists = f.categories.includes(cat);
//       const next = exists
//         ? f.categories.filter((c) => c !== cat)
//         : [...f.categories, cat];
//       return { ...f, categories: next };
//     });
//   }

//   function normalizeMobile(raw) {
//     if (!raw) return "";
//     const s = raw.trim();
//     // allow formats: 07xxxxxxx, 7xxxxxxxx, +947xxxxxxx, 947xxxxxxx
//     const digits = s.replace(/[^0-9+]/g, "");
//     if (/^\+94/.test(digits)) return digits;
//     if (/^0/.test(digits)) return "+94" + digits.slice(1);
//     if (/^7[0-9]{8}$/.test(digits)) return "+94" + digits;
//     if (/^94[0-9]{9}$/.test(digits)) return "+" + digits;
//     // fallback: return as-is (caller should validate)
//     return digits;
//   }

//   async function handleSendOtp() {
//     setError("");
//     const mobile = normalizeMobile(form.mobile);
//     if (!/^\+94[0-9]{9}$/.test(mobile)) {
//       setError("Please enter a valid Sri Lankan mobile number (e.g. 07xxxxxxxx or +947xxxxxxxx). ");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     if (isMock) {
//       // Local mock: accept any number and show a fake OTP
//       await new Promise((r) => setTimeout(r, 800));
//       setOtpSent(true);
//       setTimer(120);
//       setMessage("Mock OTP sent: 123456 (use this code in local dev)");
//       setLoading(false);
//       setView("otp");
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Failed to send OTP");
//       setOtpSent(true);
//       setTimer(120);
//       setMessage("OTP sent. Check SMS or WhatsApp.");
//       setView("otp");
//     } catch (err) {
//       setError(err?.message || "Could not send OTP. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleVerifyOtp() {
//     setError("");
//     if (!otp || otp.length < 4) {
//       setError("Enter the 4-6 digit OTP you received.");
//       return;
//     }
//     setLoading(true);

//     if (isMock) {
//       await new Promise((r) => setTimeout(r, 600));
//       if (otp.trim() === "123456") {
//         // mark verified and open profile editor
//         setMessage("Phone verified (mock). Please complete your profile.");
//         setView("profile");
//         setOtpSent(false);
//         // save mobile to local storage as verified
//         const payload = { ...form };
//         localStorage.setItem("tk_profile_v1", JSON.stringify(payload));
//       } else {
//         setError("Invalid mock OTP. Use 123456 in local dev.");
//       }
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile: normalizeMobile(form.mobile), otp }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "OTP verification failed");
//       setMessage("Phone verified. Please complete your profile.");
//       setView("profile");
//       setOtpSent(false);
//       // optionally save result to local storage as temp profile
//       localStorage.setItem("tk_profile_v1", JSON.stringify(form));
//     } catch (err) {
//       setError(err?.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleRegisterEmail(e) {
//     e?.preventDefault?.();
//     setError("");
//     if (!form.name || !form.email || !form.password) {
//       setError("Please enter name, email and password.");
//       return;
//     }
//     setLoading(true);
//     if (isMock) {
//       await new Promise((r) => setTimeout(r, 800));
//       // save locally
//       localStorage.setItem("tk_profile_v1", JSON.stringify(form));
//       setMessage("Registered locally (mock). You are now on your profile.");
//       setView("profile");
//       setLoading(false);
//       return;
//     }
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Registration failed");
//       // redirect or show profile
//       setMessage("Registration successful. Welcome!");
//       setView("profile");
//       localStorage.setItem("tk_profile_v1", JSON.stringify(form));
//     } catch (err) {
//       setError(err?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleSaveProfile(e) {
//     e?.preventDefault?.();
//     setLoading(true);
//     setError("");
//     try {
//       if (isMock) {
//         await new Promise((r) => setTimeout(r, 600));
//         localStorage.setItem("tk_profile_v1", JSON.stringify(form));
//         setMessage("Profile saved locally (mock).");
//         setLoading(false);
//         return;
//       }
//       const res = await fetch("/api/profile", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Failed to save profile");
//       setMessage("Profile updated.");
//     } catch (err) {
//       setError(err?.message || "Could not save profile");
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleOAuth(provider) {
//     // Placeholder. Integrate NextAuth or OAuth endpoints on the server.
//     // e.g. redirect to /api/auth/google
//     window.location.href = `/api/auth/${provider}`;
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
//         <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-2xl font-bold">{brandName}</h1>
//               <p className="text-sm opacity-90">Secure ticketing for Sri Lanka.</p>
//             </div>
//             <div className="text-xs opacity-90">Step: {view === "otp" ? "Verify" : view === "profile" ? "Profile" : "Register"}</div>
//           </div>

//           <div className="mt-8">
//             <h2 className="text-xl font-semibold">Why verify your mobile?</h2>
//             <p className="mt-3 text-sm opacity-90">
//               Mobile verification via OTP is widely trusted in Sri Lanka and helps reduce ticket fraud,
//               speed up entry at venues, and allow ticket delivery via WhatsApp.
//             </p>

//             <ul className="mt-6 space-y-3 text-sm opacity-95">
//               <li>• OTP via SMS or WhatsApp</li>
//               <li>• Save favourite event categories</li>
//               <li>• Receive event reminders by SMS</li>
//             </ul>
//           </div>

//           <div className="mt-8 text-sm opacity-90">
//             <strong>Local dev note:</strong>
//             <p className="mt-2">If you're running on <span className="font-medium">localhost</span> the component uses a mock flow (OTP = <code>123456</code>).</p>
//           </div>
//         </div>

//         <div className="p-8">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex gap-2">
//               <button onClick={() => { setView("register"); }} className={`px-3 py-1 rounded-md ${view !== "profile" ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>Register</button>
//               <button onClick={() => { setView("profile"); }} className={`px-3 py-1 rounded-md ${view === "profile" ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>Profile</button>
//             </div>
//             <div className="text-xs text-slate-500">Accessible · Mobile-first</div>
//           </div>

//           {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded">{message}</div>}
//           {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}

//           {view === "register" && (
//             <div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Choose registration method</label>
//                 <div className="flex gap-2">
//                   <button onClick={() => setMethod("mobile")} className={`px-3 py-2 rounded-md border ${method === "mobile" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white"}`}>Mobile (OTP)</button>
//                   <button onClick={() => setMethod("email")} className={`px-3 py-2 rounded-md border ${method === "email" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white"}`}>Email</button>
//                   <button onClick={() => setMethod("oauth")} className={`px-3 py-2 rounded-md border ${method === "oauth" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white"}`}>Sign-in with Google/FB</button>
//                 </div>
//               </div>

//               {method === "mobile" && (
//                 <div>
//                   <label className="block text-sm font-medium">Mobile number</label>
//                   <input
//                     type="tel"
//                     value={form.mobile}
//                     onChange={(e) => setField("mobile", e.target.value)}
//                     placeholder="07xxxxxxxx or +947xxxxxxxx"
//                     className="mt-2 w-full px-3 py-2 border rounded-md"
//                     aria-label="Mobile number"
//                   />
//                   <div className="flex gap-2 mt-3">
//                     <button onClick={handleSendOtp} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-md">{loading ? 'Sending...' : 'Send OTP'}</button>
//                     <button onClick={() => { setForm({ ...form, mobile: '' }); setError(''); }} className="px-4 py-2 border rounded-md">Clear</button>
//                   </div>
//                 </div>
//               )}

//               {method === "email" && (
//                 <form onSubmit={handleRegisterEmail} className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium">Full name</label>
//                     <input className="mt-2 w-full px-3 py-2 border rounded-md" value={form.name} onChange={(e) => setField("name", e.target.value)} />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium">Email</label>
//                     <input type="email" className="mt-2 w-full px-3 py-2 border rounded-md" value={form.email} onChange={(e) => setField("email", e.target.value)} />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium">Password</label>
//                     <input type="password" className="mt-2 w-full px-3 py-2 border rounded-md" value={form.password} onChange={(e) => setField("password", e.target.value)} />
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <input id="tnc" type="checkbox" className="h-4 w-4" required />
//                     <label htmlFor="tnc" className="text-sm">I agree to the terms & privacy</label>
//                   </div>

//                   <div>
//                     <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-md">{loading ? 'Registering...' : 'Register'}</button>
//                   </div>
//                 </form>
//               )}

//               {method === "oauth" && (
//                 <div className="space-y-3">
//                   <p className="text-sm">Continue with one of the social providers. (Configure server-side OAuth)</p>
//                   <div className="flex flex-col sm:flex-row gap-2 mt-3">
//                     <button onClick={() => handleOAuth('google')} className="px-4 py-2 border rounded-md">Continue with Google</button>
//                     <button onClick={() => handleOAuth('facebook')} className="px-4 py-2 border rounded-md">Continue with Facebook</button>
//                     <button onClick={() => handleOAuth('apple')} className="px-4 py-2 border rounded-md">Continue with Apple</button>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-6 text-xs text-slate-500">Already have an account? Switch to <button onClick={() => setView('profile')} className="underline">Profile</button> to edit your info.</div>
//             </div>
//           )}

//           {view === "otp" && (
//             <div>
//               <h3 className="text-lg font-medium mb-3">Enter OTP</h3>
//               <p className="text-sm text-slate-600 mb-3">We sent an OTP to {normalizeMobile(form.mobile) || 'your mobile'}. It may arrive via SMS or WhatsApp.</p>
//               <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="w-full px-3 py-2 border rounded-md" />
//               <div className="flex items-center gap-2 mt-3">
//                 <button onClick={handleVerifyOtp} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-md">{loading ? 'Verifying...' : 'Verify OTP'}</button>

//                 <button onClick={() => { if (timer > 0) return; handleSendOtp(); }} className="px-4 py-2 border rounded-md" disabled={timer > 0}>{timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}</button>
//               </div>

//               <div className="mt-4 text-sm text-slate-500">If you didn't receive the SMS, check network or try WhatsApp delivery (supported by some providers).</div>
//             </div>
//           )}

//           {view === "profile" && (
//             <form onSubmit={handleSaveProfile} className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium">Full name</label>
//                 <input className="mt-2 w-full px-3 py-2 border rounded-md" value={form.name} onChange={(e) => setField("name", e.target.value)} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">Email</label>
//                 <input type="email" className="mt-2 w-full px-3 py-2 border rounded-md" value={form.email} onChange={(e) => setField("email", e.target.value)} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">Mobile (verified if you completed OTP)</label>
//                 <input className="mt-2 w-full px-3 py-2 border rounded-md" value={form.mobile} onChange={(e) => setField("mobile", e.target.value)} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">NIC (optional)</label>
//                 <input className="mt-2 w-full px-3 py-2 border rounded-md" value={form.nic} onChange={(e) => setField("nic", e.target.value)} placeholder="e.g. 861234567V" />
//                 <p className="mt-1 text-xs text-slate-500">NIC is optional but useful for age-restricted or government events.</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Favourite event categories</label>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                   {DEFAULT_CATEGORIES.map((c) => (
//                     <label key={c} className={`p-2 border rounded-md cursor-pointer ${form.categories.includes(c) ? 'bg-indigo-50 border-indigo-300' : 'bg-white'}`}>
//                       <input type="checkbox" className="mr-2" checked={form.categories.includes(c)} onChange={() => toggleCategory(c)} />
//                       <span className="text-sm">{c}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button className="px-4 py-2 bg-indigo-600 text-white rounded-md" disabled={loading}>{loading ? 'Saving...' : 'Save profile'}</button>
//                 <button type="button" onClick={() => { localStorage.removeItem('tk_profile_v1'); setForm({ name:'', email:'', password:'', mobile:'', nic:'', categories:[] }); setMessage('Local profile removed.'); }} className="px-4 py-2 border rounded-md">Remove local profile</button>
//               </div>
//             </form>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }
