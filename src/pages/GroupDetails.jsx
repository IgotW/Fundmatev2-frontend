import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Play, Plus, Trash2, Users, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addGroupMember, getGroupById, removeGroupMember, startGroup } from "../api/auth.api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import GroupActions from "../components/groups/GroupActions.jsx";

const today = () => new Date().toISOString().slice(0, 10);
const currency = (amount) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(Number(amount || 0));
const formatDate = (date) => new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", month: "long", day: "numeric", year: "numeric" }).format(new Date(date));

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [groupData, setGroupData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showStartForm, setShowStartForm] = useState(false);
  const [isSavingMember, setIsSavingMember] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [member, setMember] = useState({ name: "", phone: "", email: "", heads: "1" });
  const [startDate, setStartDate] = useState(today());

  const loadGroup = useCallback(async () => {
    if (!token || !groupId) return;
    try {
      setError("");
      const response = await getGroupById(groupId, token);
      setGroupData(response.data);
    } catch (loadError) {
      setError(loadError.message || "Failed to load group.");
    } finally {
      setIsLoading(false);
    }
  }, [groupId, token]);

  useEffect(() => {
    const requestId = window.setTimeout(() => { loadGroup(); }, 0);
    return () => window.clearTimeout(requestId);
  }, [loadGroup]);

  const submitMember = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!member.name.trim() || !member.email.trim()) {
      setError("Name and email address are required to add a member.");
      return;
    }
    setIsSavingMember(true);
    try {
      const response = await addGroupMember(groupId, { ...member, heads: Number(member.heads) }, token);
      setNotice(response.message || "Member added successfully.");
      setMember({ name: "", phone: "", email: "", heads: "1" });
      setShowMemberForm(false);
      await loadGroup();
    } catch (submitError) {
      setError(submitError.message || "Failed to add member.");
    } finally {
      setIsSavingMember(false);
    }
  };

  const removeMember = async (membershipId, name) => {
    if (!window.confirm(`Remove ${name} from this group?`)) return;
    setError("");
    setNotice("");
    try {
      const response = await removeGroupMember(groupId, membershipId, token);
      setNotice(response.message || "Member removed from the group.");
      await loadGroup();
    } catch (removeError) {
      setError(removeError.message || "Failed to remove member.");
    }
  };

  const submitStart = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsStarting(true);
    try {
      const response = await startGroup(groupId, startDate, token);
      setNotice(response.message || "Fund started successfully.");
      setShowStartForm(false);
      await loadGroup();
    } catch (startError) {
      setError(startError.message || "Failed to start the fund.");
    } finally {
      setIsStarting(false);
    }
  };

  if (isLoading) return <div className="rounded-2xl border border-line bg-white/60 px-6 py-12 text-center text-sm text-muted">Loading group...</div>;
  if (!groupData) return <div className="rounded-2xl border border-danger-text/20 bg-danger-bg p-6 text-danger-text">{error || "Group not found."}</div>;

  const { group, membership, members, cycles } = groupData;
  const isLeader = membership.role === "leader";
  const hasStarted = cycles.length > 0;

  return (
    <div>
      <Link to="/groups" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary"><ArrowLeft size={17} />Back to My Groups</Link>
      <section className="mt-8">
        <p className="text-sm font-medium text-muted">Group details</p>
        <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-3xl text-ink sm:text-4xl">{group.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">Manage members and begin the contribution schedule when your group is ready.</p>
          </div>
          {isLeader && <div className="flex flex-wrap gap-3">
            <button onClick={() => { setShowMemberForm((visible) => !visible); setShowStartForm(false); }} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-primary/30"><Plus size={17} />Add member</button>
            <button disabled={hasStarted} onClick={() => { setShowStartForm((visible) => !visible); setShowMemberForm(false); }} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-primary/40"><Play size={16} fill="currentColor" />{hasStarted ? "Fund started" : "Start fund"}</button>
            <GroupActions group={group} token={token} onUpdated={loadGroup} onDeleted={() => navigate("/groups")} onError={setError} onNotice={setNotice} />
          </div>}
        </div>
      </section>

      {error && <p className="mt-6 rounded-2xl border border-danger-text/20 bg-danger-bg px-4 py-3 text-sm text-danger-text">{error}</p>}
      {notice && <p className="mt-6 rounded-2xl border border-success-text/20 bg-success-bg px-4 py-3 text-sm text-success-text">{notice}</p>}

      {showMemberForm && <section className="mt-6 rounded-2xl border border-primary/20 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-2xl text-ink">Add a member</h2><p className="mt-1 text-sm text-muted">Email is required for account setup and receipts. Phone number is optional.</p></div><button onClick={() => setShowMemberForm(false)} className="rounded-full p-2 text-muted hover:bg-paper"><X size={18} /></button></div>
        <form onSubmit={submitMember} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink">Full name<input required value={member.name} onChange={(event) => setMember({ ...member, name: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" placeholder="Member name" /></label>
          <label className="text-sm font-medium text-ink">Email address<input required type="email" value={member.email} onChange={(event) => setMember({ ...member, email: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" placeholder="member@example.com" /></label>
          <label className="text-sm font-medium text-ink">Phone number <span className="font-normal text-muted">(optional)</span><input type="tel" value={member.phone} onChange={(event) => setMember({ ...member, phone: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" placeholder="09XXXXXXXXX" /></label>
          <label className="text-sm font-medium text-ink">Heads<input required min="1" step="1" type="number" value={member.heads} onChange={(event) => setMember({ ...member, heads: event.target.value })} className="mt-2 w-full rounded-xl border border-line bg-paper/40 px-3 py-2.5 font-normal outline-none focus:border-primary" /></label>
          <div className="sm:col-span-2"><button disabled={isSavingMember} className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-60">{isSavingMember ? "Adding member..." : "Add member to group"}</button></div>
        </form>
      </section>}

      {showStartForm && <section className="mt-6 rounded-2xl border border-gold/40 bg-[#fffdf5] p-5 sm:p-6">
        <h2 className="font-display text-2xl text-ink">Start the fund</h2><p className="mt-1 text-sm leading-6 text-muted">This creates every contribution cycle from the chosen start date until the distribution date, including each active member’s contribution record.</p>
        <form onSubmit={submitStart} className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end"><label className="text-sm font-medium text-ink">Start date<input required type="date" max={new Date(group.distributionDate).toISOString().slice(0, 10)} value={startDate} onChange={(event) => setStartDate(event.target.value)} className="mt-2 block rounded-xl border border-line bg-white px-3 py-2.5 font-normal outline-none focus:border-primary" /></label><p className="text-sm text-muted">Distribution: <span className="font-medium text-ink">{formatDate(group.distributionDate)}</span></p><button disabled={isStarting} className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white disabled:opacity-60">{isStarting ? "Generating schedule..." : "Confirm and start"}</button></form>
      </section>}

      <section className="mt-8"><div className="rounded-2xl border border-line bg-white/60 p-6"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-xs text-muted">Your role</p><p className="mt-1 text-sm font-medium capitalize text-ink">{membership.role}</p></div><div><p className="text-xs text-muted">Members</p><p className="mt-1 font-mono text-sm text-ink">{group.membersCount}</p></div><div><p className="text-xs text-muted">Contribution per head</p><p className="mt-1 font-mono text-sm text-ink">{currency(group.contributionAmount)}</p></div><div><p className="text-xs text-muted">Distribution date</p><p className="mt-1 text-sm text-ink">{formatDate(group.distributionDate)}</p></div></div></div></section>

      <section className="mt-6"><div className="rounded-2xl border border-line bg-white/60 p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-ink">Group members</p><p className="mt-1 text-xs text-muted">Each member’s heads determine their contribution amount.</p></div><Users className="text-primary" size={20} /></div><div className="mt-5 divide-y divide-divider">{members.filter((item) => item.user).map((item) => <div key={item._id} className="flex items-center justify-between gap-4 py-4 first:pt-0"><div className="min-w-0"><p className="truncate text-sm font-medium text-ink">{item.user.name}</p><p className="truncate text-xs text-muted">{item.user.email || item.user.phone || "No contact information"}</p></div><div className="flex items-center gap-2"><span className="hidden rounded-full bg-paper px-3 py-1 text-xs text-muted sm:inline">{item.heads} {item.heads === 1 ? "head" : "heads"}</span><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">{item.role}</span>{isLeader && item.role !== "leader" && <button onClick={() => removeMember(item._id, item.user.name)} className="rounded-full p-2 text-danger-text transition hover:bg-danger-bg" aria-label={`Remove ${item.user.name}`}><Trash2 size={16} /></button>}</div></div>)}</div></div></section>

      <section className="mt-6"><div className="rounded-2xl border border-line bg-white/60 p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-ink">Contribution cycles</p><p className="mt-1 text-xs text-muted">{hasStarted ? `${cycles.length} cycle(s) generated through distribution.` : "Start the fund to generate the schedule."}</p></div><CalendarDays size={20} className="text-primary" /></div><div className="mt-5 divide-y divide-divider">{cycles.length === 0 ? <p className="py-4 text-sm text-muted">No contribution cycles found.</p> : cycles.map((cycle, index) => <Link key={cycle._id} to={`/groups/${group._id}/cycles/${cycle._id}`} className="group flex items-center justify-between gap-4 rounded-xl px-2 py-4 transition hover:bg-paper"><div><p className="text-xs font-medium uppercase tracking-wide text-muted">Cycle {index + 1}</p><p className="text-sm font-medium text-ink">{formatDate(cycle.dueDate)}</p><p className="mt-1 font-mono text-xs text-muted">{currency(cycle.contributionAmount)}</p></div><ArrowRight size={17} className="text-muted transition group-hover:translate-x-1" /></Link>)}</div></div></section>
    </div>
  );
};

export default GroupDetails;
