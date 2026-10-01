import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { deleteGroup, updateGroup } from "../../api/auth.api.js";

const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");

const GroupActions = ({ group, token, onUpdated, onDeleted, onError, onNotice }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({});

  const openEditor = () => {
    setForm({
      name: group.name,
      description: group.description || "",
      contributionAmount: String(group.contributionAmount),
      contributionFrequency: group.contributionFrequency,
      paymentDays: (group.paymentDays || []).join(", "),
      distributionDate: toDateInput(group.distributionDate),
      gracePeriod: String(group.gracePeriod ?? 0),
      penaltyAmount: String(group.penaltyAmount ?? 0),
    });
    setIsEditing(true);
  };

  const save = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    onError("");
    try {
      const paymentDays = form.contributionFrequency === "custom"
        ? form.paymentDays.split(",").map((day) => Number(day.trim())).filter((day) => Number.isInteger(day) && day >= 1 && day <= 31)
        : [];
      const response = await updateGroup(group._id, {
        ...form,
        contributionAmount: Number(form.contributionAmount),
        gracePeriod: Number(form.gracePeriod),
        penaltyAmount: Number(form.penaltyAmount),
        paymentDays,
      }, token);
      onNotice(response.message || "Group updated successfully.");
      setIsEditing(false);
      await onUpdated();
    } catch (error) {
      onError(error.message || "Failed to update group.");
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete ${group.name}? This will remove all members from the group.`)) return;
    onError("");
    try {
      const response = await deleteGroup(group._id, token);
      onNotice(response.message || "Group deleted successfully.");
      onDeleted();
    } catch (error) {
      onError(error.message || "Failed to delete group.");
    }
  };

  return <>
    <button onClick={openEditor} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-primary/30"><Pencil size={16} />Edit group</button>
    <button onClick={remove} className="inline-flex items-center gap-2 rounded-full border border-danger-text/30 bg-white px-4 py-2.5 text-sm font-medium text-danger-text transition hover:bg-danger-bg"><Trash2 size={16} />Delete group</button>
    {isEditing && <section className="mt-6 basis-full rounded-2xl border border-primary/20 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-2xl text-ink">Edit group</h2><p className="mt-1 text-sm text-muted">Changes apply to future cycles; existing cycles retain their original rules.</p></div><button onClick={() => setIsEditing(false)} className="rounded-full p-2 text-muted hover:bg-paper"><X size={18} /></button></div>
      <form onSubmit={save} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-ink">Group name<input required value={form.name || ""} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" /></label>
        <label className="text-sm font-medium text-ink">Contribution per head<input required min="1" type="number" value={form.contributionAmount || ""} onChange={(event) => setForm({ ...form, contributionAmount: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" /></label>
        <label className="text-sm font-medium text-ink">Frequency<select value={form.contributionFrequency || "monthly"} onChange={(event) => setForm({ ...form, contributionFrequency: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary"><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="custom">Custom dates</option></select></label>
        <label className="text-sm font-medium text-ink">Distribution date<input required type="date" value={form.distributionDate || ""} onChange={(event) => setForm({ ...form, distributionDate: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" /></label>
        {form.contributionFrequency === "custom" && <label className="text-sm font-medium text-ink">Payment days<input value={form.paymentDays || ""} onChange={(event) => setForm({ ...form, paymentDays: event.target.value })} placeholder="15, 30" className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" /></label>}
        <label className="text-sm font-medium text-ink">Grace period (days)<input min="0" type="number" value={form.gracePeriod || ""} onChange={(event) => setForm({ ...form, gracePeriod: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" /></label>
        <label className="text-sm font-medium text-ink">Penalty amount<input min="0" type="number" value={form.penaltyAmount || ""} onChange={(event) => setForm({ ...form, penaltyAmount: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" /></label>
        <label className="text-sm font-medium text-ink sm:col-span-2">Description<textarea value={form.description || ""} onChange={(event) => setForm({ ...form, description: event.target.value })} rows="3" className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" /></label>
        <div className="sm:col-span-2"><button disabled={isSaving} className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white disabled:opacity-60">{isSaving ? "Saving..." : "Save changes"}</button></div>
      </form>
    </section>}
  </>;
};

export default GroupActions;
