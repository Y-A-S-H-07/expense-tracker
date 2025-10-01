import React from "react";

export default function TransactionList({ list = [], onDelete }) {
  const income = list.filter(x => x.amount > 0).reduce((s, x) => s + x.amount, 0);
  const expense = list.filter(x => x.amount < 0).reduce((s, x) => s + x.amount, 0);
  const balance = income + expense;

  return (
    <>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="small">Balance</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{balance.toFixed(2)}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="small">Income</div>
            <div className="positive">+{income.toFixed(2)}</div>
            <div className="small" style={{ marginTop: 6 }}>Expense</div>
            <div className="negative">{expense.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Transactions</h3>
        {list.length === 0 && <div className="small">no transactions yet</div>}
        {list.map(tx => (
          <div className="tx" key={tx._id}>
            <div>
              <div style={{ fontWeight: 700 }}>{tx.title}</div>
              <div className="small">{new Date(tx.createdAt).toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className={`amount ${tx.amount >= 0 ? "positive" : "negative"}`}>{tx.amount >= 0 ? "+" : ""}{tx.amount}</div>
              <button className="btn" style={{ marginTop: 8 }} onClick={() => onDelete(tx._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
