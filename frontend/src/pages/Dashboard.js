import React, { useEffect, useState } from "react";
import { fetchTx, createTx, removeTx } from "../api";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard({ user, onLogout }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchTx();
      setList(data);
    } catch (e) {
      setErr(e.error || "failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const doCreate = async payload => {
    try {
      const tx = await createTx(payload);
      setList(prev => [tx, ...prev]);
    } catch (e) { alert(e.error || "fail"); }
  };

  const doDelete = async id => {
    if (!window.confirm("delete?")) return;
    try {
      await removeTx(id);
      setList(prev => prev.filter(x => x._id !== id));
    } catch (e) { alert(e.error || "fail"); }
  };

  return (
    <div>
      <div className="header">
        <div className="brand">Expense Tracker</div>
        <div>
          <span className="small" style={{ marginRight: 10 }}>Hi, {user.name}</span>
          <button className="btn" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); onLogout(); }}>Logout</button>
        </div>
      </div>

      {err && <div style={{ color: "red" }}>{err}</div>}
      {loading ? <div>loading...</div> : <>
        <TransactionList list={list} onDelete={doDelete} />
        <TransactionForm onCreate={doCreate} />
      </>}
    </div>
  );
}
