import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle2, Circle, ClipboardList, Home, Layers, BookOpen,
  Users, Code2, Plus, Trash2, Menu, X, ListTodo, ArrowRight
} from "lucide-react";
import { useTaskStore } from "./store/useTaskStore";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/groups", label: "Task Groups", icon: Layers },
  { to: "/guide", label: "User Guide", icon: BookOpen },
  { to: "/users", label: "User Information", icon: Users },
  { to: "/developers", label: "Developers", icon: Code2 }
];

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-700">
            <span className="rounded-xl bg-indigo-100 p-2"><ListTodo size={22} /></span>
            TaskFlow
          </Link>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to}
                  className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"}`}>
                  <Icon size={16} />{item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
        {menuOpen && (
          <nav className="grid gap-1 border-t border-slate-100 px-4 py-3 md:hidden">
            {navItems.map((item) => <Link key={item.to} onClick={() => setMenuOpen(false)} to={item.to} className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100">{item.label}</Link>)}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">
        TaskFlow To-Do List · Laboratory 4 · DCIT 26
      </footer>
    </div>
  );
}

function PageTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">{eyebrow}</p>
      <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-slate-500">{description}</p>
    </div>
  );
}

function Dashboard() {
  const tasks = useTaskStore((state) => state.tasks);
  const groups = useTaskStore((state) => state.groups);
  const done = tasks.filter((task) => task.done).length;
  const pending = tasks.length - done;

  return (
    <>
      <div className="mb-8 rounded-2xl bg-indigo-700 px-6 py-8 text-white sm:px-9">
        <p className="mb-2 text-indigo-200">WELCOME TO TASKFLOW</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Plan your day. Get things done.</h1>
        <p className="mt-3 max-w-xl text-indigo-100">Keep your school activities, personal tasks, and projects organized in one place.</p>
        <Link to="/groups" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-indigo-700 hover:bg-indigo-50">View Task Groups <ArrowRight size={17} /></Link>
      </div>

      <PageTitle eyebrow="Overview" title="Dashboard" description="Here is a quick look at your tasks." />
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Tasks" number={tasks.length} icon={<ClipboardList />} />
        <StatCard title="Completed Tasks" number={done} icon={<CheckCircle2 />} />
        <StatCard title="Pending Tasks" number={pending} icon={<Circle />} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Your Task Groups</h2>
          <Link to="/groups" className="text-sm font-semibold text-indigo-600 hover:underline">See all</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {groups.map((group) => (
            <Link key={group.id} to={`/groups/${group.id}`} className="rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:bg-indigo-50">
              <p className="font-semibold">{group.name}</p>
              <p className="mt-1 text-sm text-slate-500">{tasks.filter((task) => task.groupId === group.id).length} task(s)</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function StatCard({ title, number, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-700">{icon}</div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-bold">{number}</p>
    </div>
  );
}

function TaskRows({ tasks }) {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  if (tasks.length === 0) return <p className="rounded-xl bg-slate-50 p-5 text-center text-slate-500">No tasks here yet. Add your first task above.</p>;

  return (
    <div className="divide-y divide-slate-100">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3 py-4">
          <button onClick={() => toggleTask(task.id)} className={`shrink-0 ${task.done ? "text-green-600" : "text-slate-400 hover:text-indigo-600"}`} aria-label="Change task status">
            {task.done ? <CheckCircle2 /> : <Circle />}
          </button>
          <span className={`flex-1 break-words ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{task.title}</span>
          <span className={`hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline ${task.done ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{task.done ? "Done" : "Not Done"}</span>
          <button onClick={() => deleteTask(task.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Delete task"><Trash2 size={18} /></button>
        </div>
      ))}
    </div>
  );
}

function GroupsPage() {
  const groups = useTaskStore((state) => state.groups);
  const tasks = useTaskStore((state) => state.tasks);
  const addGroup = useTaskStore((state) => state.addGroup);
  const [groupName, setGroupName] = useState("");

  function createGroup(event) {
    event.preventDefault();
    if (!groupName.trim()) return;
    addGroup(groupName.trim());
    setGroupName("");
  }

  return (
    <>
      <PageTitle eyebrow="Organize your work" title="Task Groups" description="Create categories and open a group to see its tasks." />
      <form onSubmit={createGroup} className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row">
        <input value={groupName} onChange={(event) => setGroupName(event.target.value)} placeholder="Enter new group name" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" />
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"><Plus size={18} /> Create Group</button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Link key={group.id} to={`/groups/${group.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md">
            <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-700"><Layers /></div>
            <h2 className="font-bold">{group.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{tasks.filter((task) => task.groupId === group.id).length} task(s)</p>
            <p className="mt-4 text-sm font-semibold text-indigo-600">Open group →</p>
          </Link>
        ))}
      </div>
    </>
  );
}

function GroupDetail() {
  const { groupId } = useParams();
  const groups = useTaskStore((state) => state.groups);
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const [taskName, setTaskName] = useState("");
  const group = groups.find((item) => item.id === groupId);
  const groupTasks = tasks.filter((task) => task.groupId === groupId);

  function submitTask(event) {
    event.preventDefault();
    if (!taskName.trim()) return;
    addTask(taskName.trim(), groupId);
    setTaskName("");
  }

  if (!group) return <div className="rounded-2xl bg-white p-8 text-center"><h1 className="text-xl font-bold">Group not found</h1><Link className="mt-3 inline-block text-indigo-600" to="/groups">Back to groups</Link></div>;

  return (
    <>
      <Link to="/groups" className="mb-5 inline-block text-sm font-semibold text-indigo-600 hover:underline">← Back to Task Groups</Link>
      <PageTitle eyebrow="Selected category" title={group.name} description="Add a task below. Tasks added here will appear only in this group." />
      <form onSubmit={submitTask} className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row">
        <input value={taskName} onChange={(event) => setTaskName(event.target.value)} placeholder="What do you need to do?" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" />
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"><Plus size={18} /> Add Task</button>
      </form>
      <section className="rounded-2xl border border-slate-200 bg-white px-5">
        <div className="border-b border-slate-100 py-4"><h2 className="font-bold">Tasks in this group ({groupTasks.length})</h2></div>
        <TaskRows tasks={groupTasks} />
      </section>
    </>
  );
}

function GuidePage() {
  const steps = [
    ["Create a task group", "Open Task Groups, type a category name, then click Create Group."],
    ["Add a task", "Open a group, enter your task in the text box, then click Add Task."],
    ["Mark Done or Not Done", "Click the circle beside a task. Click it again to change it back."],
    ["Delete a task", "Click the trash icon beside the task you want to remove."],
    ["Move between pages", "Use the navigation links at the top. Open a group to view only its tasks."],
    ["View sample user information", "Open User Information. Axios sends a request to DummyJSON and displays the returned user details."],
    ["How Zustand works", "Zustand stores tasks and groups in one shared store. Pages read and update the same data, so changes appear in other pages."]
  ];
  return (
    <>
      <PageTitle eyebrow="Help center" title="User Guide" description="Follow these simple steps to use the TaskFlow website." />
      <div className="space-y-3">
        {steps.map(([title, description], index) => (
          <div key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">{index + 1}</span>
            <div><h2 className="font-bold">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div>
          </div>
        ))}
      </div>
    </>
  );
}

function UserInformationPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("https://dummyjson.com/users/1");
        setUser(response.data);
      } catch {
        setError("Unable to load user information. Please check your internet connection and try again.");
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  return (
    <>
      <PageTitle eyebrow="External API" title="User Information" description="Sample user details retrieved from the DummyJSON API using Axios." />
      <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6">
        {loading && <p className="py-8 text-center text-indigo-600">Loading user information...</p>}
        {error && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {user && (
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <img src={user.image} alt="User profile" className="h-28 w-28 rounded-full bg-slate-100 object-cover" />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="mt-1 text-sm text-slate-500">@{user.username}</p>
              <div className="mt-4 space-y-2 text-sm">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
              </div>
              <p className="mt-4 text-xs text-slate-400">Source: dummyjson.com/users/1</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function DevelopersPage() {
  return (
    <>
      <PageTitle eyebrow="Project team" title="Developers" description="Meet the students who created this To-Do List website." />
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-700"><Users /></div>
        <h2 className="text-lg font-bold">Group Members</h2>
        <p className="mt-2 text-sm text-slate-500">The complete names of our group member presentation.</p>
        <ol className="mt-5 space-y-3">
          {[" 1 - Jove Tristan Pelones", "2 - Cyron James Polias ", 
"3 - Mike Rain Advincula", " 4 - Kyle John Flores"].map((name, index) => (
            <li key={index} className="rounded-lg bg-slate-50 px-4 py-3 font-medium">{index + 1}. {name}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:groupId" element={<GroupDetail />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/users" element={<UserInformationPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="*" element={<div className="rounded-2xl bg-white p-8 text-center"><h1 className="text-xl font-bold">Page not found</h1><Link to="/" className="mt-3 inline-block text-indigo-600">Go to Dashboard</Link></div>} />
      </Routes>
    </Layout>
  );
}