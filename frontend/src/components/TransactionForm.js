import React, { useState } from "react";

export default function TransactionForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const submit = e => {
    e.preventDefault();
    const num = Number(amount);
    if (!title || amount === "") return alert("fill fields");
    if (Number.isNaN(num)) return alert("amount must be a number");
    onCreate({ title, amount: num });
    setTitle(""); setAmount("");
  };

  return (
    <div className="card">
      <h3>Add transaction</h3>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <input className="form-control" placeholder="title (eg. Salary, Tea)" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input className="form-control" placeholder="amount (+ income, - expense)" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
