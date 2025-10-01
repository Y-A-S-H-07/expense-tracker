import React, { useState } from "react";
import { register, login } from "../api";

export default function Register({ onLogin, switchToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setErr("");
    try {
      await register(form);
      // login immediately
      const res = await login({ email: form.email, password: form.password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      onLogin(res.user);
    } catch (error) {
      setErr(error.error || "register failed");
    }
  };

  return (
    <div className="card auth">
      <h2 className="center">Register</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <input name="name" className="form-control" placeholder="your name" value={form.name} onChange={change} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="email" className="form-control" placeholder="email" value={form.email} onChange={change} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="password" type="password" className="form-control" placeholder="password" value={form.password} onChange={change} />
        </div>
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" type="submit">Register</button>
          <button type="button" className="btn" onClick={switchToLogin}>Back</button>
        </div>
      </form>
    </div>
  );
}
