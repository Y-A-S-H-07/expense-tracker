const API = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

async function req(path, opts = {}) {
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { headers, ...opts });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export const register = payload => req("/auth/register", { method: "POST", body: JSON.stringify(payload) });
export const login = payload => req("/auth/login", { method: "POST", body: JSON.stringify(payload) });

export const fetchTx = () => req("/transactions");
export const createTx = payload => req("/transactions", { method: "POST", body: JSON.stringify(payload) });
export const removeTx = id => req(`/transactions/${id}`, { method: "DELETE" });
