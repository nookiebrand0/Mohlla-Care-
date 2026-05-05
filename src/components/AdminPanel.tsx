import React, { useState } from "react";
import {
  ShieldCheck,
  Edit3,
  Trash2,
  Plus,
  Image as ImageIcon,
  AlertTriangle,
  Users,
  Briefcase,
  Store,
  Phone,
  Trophy,
  HeartHandshake,
  Check,
  X
} from "lucide-react";
import { useStore, store } from "../store";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("Issues");
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<{type: string, item: any, payload?: any} | null>(null);
  
  const state = useStore();
  
  // Temporary state for the edit form
  const [editForm, setEditForm] = useState({ 
    title: '', description: '', category: '', status: '',
    name: '', serviceType: '', price: '', phone: '', company: '', salary: ''
  });

  const tabs = [
    { id: "Users", icon: Users, count: state.users?.length || 0 },
    { id: "Issues", icon: AlertTriangle, count: state.issues?.length || 0 },
    { id: "Services", icon: HeartHandshake, count: state.womenServices?.length || 0 },
    { id: "Jobs", icon: Briefcase, count: state.jobs?.length || 0 },
    { id: "Community", icon: Users, count: state.communityPosts?.length || 0 },
    { id: "Shop", icon: Store, count: state.shops?.length || 0 },
    { id: "Directory", icon: Phone, count: state.services?.length || 0 },
    { id: "Rides", icon: AlertTriangle, count: state.rides?.length || 0 },
  ];

  const handleAction = (action: string, item: any = null, payload: any = null) => {
    setActionType({ type: action, item, payload });
    if (payload) {
      setEditForm({
        ...editForm,
        ...payload
      });
    } else {
      setEditForm({ title: '', description: '', category: '', status: 'Open', name: '', serviceType: '', price: '', phone: '', company: '', salary: '' });
    }
    setShowModal(true);
  };

  const confirmAction = () => {
    const isEdit = actionType?.type === 'Edit';
    const isAdd = actionType?.type === 'Add New';
    const isDelete = actionType?.type === 'Delete';

    if (activeTab === 'Issues') {
      if (isAdd) {
         store.addIssue({ 
           id: Date.now().toString(),
           title: editForm.title || '',
           description: editForm.description || '',
           category: editForm.category || 'General',
           status: editForm.status || 'reported',
           upvotes: 0, 
           reportedBy: 'Admin', 
           createdAt: new Date().toISOString() 
         } as any);
      } else if (isEdit && actionType?.payload) {
         store.updateIssue(actionType.payload.id, {
           title: editForm.title,
           description: editForm.description,
           category: editForm.category,
           status: editForm.status
         });
      } else if (isDelete && actionType?.payload) {
         store.deleteIssue(actionType.payload.id);
      }
    } else if (activeTab === 'Services') {
      if (isAdd) {
         store.addService({ 
           id: Date.now().toString(),
           name: editForm.name || '',
           serviceType: editForm.serviceType || '',
           description: editForm.description || '',
           price: editForm.price || '',
           phone: editForm.phone || '',
           rating: 5 
         } as any);
      } else if (isEdit && actionType?.payload) {
         store.updateService(actionType.payload.id, {
           name: editForm.name,
           serviceType: editForm.serviceType,
           description: editForm.description,
           price: editForm.price,
           phone: editForm.phone
         });
      } else if (isDelete && actionType?.payload) {
         store.deleteService(actionType.payload.id);
      }
    } else if (activeTab === 'Jobs') {
      if (isAdd) {
         store.addJob({ 
           id: Date.now().toString(),
           title: editForm.title || '',
           company: editForm.company || '',
           type: (editForm.category || 'Full-time') as any,
           description: editForm.description || '',
           salary: editForm.salary || '',
           contact: editForm.phone || ''
         });
      } else if (isEdit && actionType?.payload) {
         store.updateJob(actionType.payload.id, {
           title: editForm.title,
           company: editForm.company,
           description: editForm.description,
           salary: editForm.salary,
           contact: editForm.phone
         });
      } else if (isDelete && actionType?.payload) {
         store.deleteJob(actionType.payload.id);
      }
    } else if (activeTab === 'Users') {
      if (isEdit && actionType?.payload) {
         store.updateUser(actionType.payload.id, {
           name: editForm.name,
           phone: editForm.phone
         });
      }
    } else if (activeTab === 'Shop') {
      if (isAdd) {
         store.addShop({ 
           id: Date.now().toString(),
           name: editForm.name || '',
           category: editForm.category || '',
           rating: 5,
           isOpen: true
         } as any);
      } else if (isEdit && actionType?.payload) {
         store.updateShop(actionType.payload.id, {
           name: editForm.name,
           category: editForm.category
         });
      } else if (isDelete && actionType?.payload) {
         store.deleteShop(actionType.payload.id);
      }
    } else if (activeTab === 'Community') {
      if (isAdd) {
         store.addCommunityPost({ 
           id: Date.now().toString(),
           content: editForm.description || '',
           isAnonymous: false,
           replies: 0,
           createdAt: new Date().toISOString()
         } as any);
      } else if (isEdit && actionType?.payload) {
         store.updateCommunityPost(actionType.payload.id, {
           content: editForm.description || ''
         });
      } else if (isDelete && actionType?.payload) {
         store.deleteCommunityPost(actionType.payload.id);
      }
    } else if (activeTab === 'Directory') {
      if (isAdd) {
         store.addServiceContact({ 
           id: Date.now().toString(),
           name: editForm.name || '',
           category: editForm.category || '',
           phone: editForm.phone || '',
           rating: 5
         } as any);
      } else if (isEdit && actionType?.payload) {
         store.updateServiceContact(actionType.payload.id, {
           name: editForm.name,
           category: editForm.category,
           phone: editForm.phone
         });
      } else if (isDelete && actionType?.payload) {
         store.deleteServiceContact(actionType.payload.id);
      }
    } else if (activeTab === 'Rides') {
      if (isEdit && actionType?.payload) {
         store.updateRide(actionType.payload.id, editForm);
      } else if (isDelete && actionType?.payload) {
         store.deleteRide(actionType.payload.id);
      }
    }

    setShowModal(false);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'Services':
        return state.womenServices.map((svc: any) => (
          <div key={svc.id} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <div>
              <div className="font-bold text-white">{svc.name}</div>
              <div className="text-sm text-slate-400">{svc.serviceType || svc.category}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction('Edit', svc.name, svc)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit3 className="w-4 h-4"/></button>
              <button onClick={() => handleAction('Delete', svc.name, svc)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/40"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ));
      case 'Jobs':
        return state.jobs.map((job: any) => (
          <div key={job.id} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <div>
              <div className="font-bold text-white">{job.title}</div>
              <div className="text-sm text-slate-400">{job.company}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction('Edit', job.title, job)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit3 className="w-4 h-4"/></button>
              <button onClick={() => handleAction('Delete', job.title, job)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/40"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ));
      case 'Issues':
        return state.issues.map((issue: any) => (
          <div key={issue.id} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <div>
              <div className="font-bold text-white">{issue.title}</div>
              <div className="text-sm text-slate-400">{issue.status}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction('Edit', issue.title, issue)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit3 className="w-4 h-4"/></button>
              <button onClick={() => handleAction('Delete', issue.title, issue)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/40"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ));
      case 'Users':
        return state.users?.map((u: any) => (
          <div key={u.id} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <div>
              <div className="font-bold text-white">{u.name || (u.phone || 'Anonymous')}</div>
              <div className="text-sm text-slate-400">Points: {u.points || 0}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction('Edit', u.name, u)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit3 className="w-4 h-4"/></button>
            </div>
          </div>
        )) || [];
      case 'Shop':
        return state.shops?.map((s: any) => (
          <div key={s.id} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <div>
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-sm text-slate-400">{s.category}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction('Edit', s.name, s)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit3 className="w-4 h-4"/></button>
              <button onClick={() => handleAction('Delete', s.name, s)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/40"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        )) || [];
      case 'Community':
        return state.communityPosts?.map((p: any) => (
          <div key={p.id} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <div>
              <div className="font-bold text-white truncate max-w-[200px]">{p.content}</div>
              <div className="text-sm text-slate-400">By {p.authorName || 'Anon'}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction('Edit', p.content, p)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit3 className="w-4 h-4"/></button>
              <button onClick={() => handleAction('Delete', p.content, p)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/40"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        )) || [];
      case 'Directory':
        return state.services?.map((d: any) => (
          <div key={d.id} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <div>
              <div className="font-bold text-white">{d.name}</div>
              <div className="text-sm text-slate-400">{d.category}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction('Edit', d.name, d)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit3 className="w-4 h-4"/></button>
              <button onClick={() => handleAction('Delete', d.name, d)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/40"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        )) || [];
      case 'Rides':
        return state.rides?.map((r: any) => (
          <div key={r.id} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <div>
              <div className="font-bold text-white">{r.pickup} → {r.dropoff}</div>
              <div className="text-sm text-slate-400">Status: {r.status}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction('Edit', r.id, r)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit3 className="w-4 h-4"/></button>
              <button onClick={() => handleAction('Delete', r.id, r)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/40"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        )) || [];
      default:
        return (
          <div className="bg-black/20 p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
             <ShieldCheck className="w-16 h-16 text-slate-600 mb-4" />
             <h3 className="text-xl font-medium text-slate-300">Admin Controls for {activeTab}</h3>
             <p className="text-slate-500 mt-2 max-w-sm">Manage data for {activeTab}.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full pb-20 flex flex-col md:flex-row gap-6">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <tab.icon className="w-5 h-5" />
              {tab.id}
            </div>
            <span className="bg-black/30 px-2 py-0.5 rounded-md text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 min-h-[500px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Manage {activeTab}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Add, edit, or remove entries from this section.
            </p>
          </div>
          <button
            onClick={() => handleAction("Add New", activeTab)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>

        {/* Content specific to active tab */}
        <div className="space-y-4">
          {getTabContent()}
        </div>
      </div>

      {/* Admin Action Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              {actionType?.type} {actionType?.item ? `'${actionType.item}'` : 'Item'}
            </h3>
            <p className="text-slate-400 mb-6 text-sm">
              This action has been intercepted. The changes are applied locally for the demo.
            </p>
            
            {actionType?.type !== 'Delete' && activeTab === 'Issues' ? (
               <div className="space-y-3 mb-6">
                 <input type="text" placeholder="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <textarea placeholder="Description" rows={3} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Category" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white">
                    <option value="reported">Reported</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                 </select>
               </div>
            ) : actionType?.type !== 'Delete' && activeTab === 'Services' ? (
               <div className="space-y-3 mb-6">
                 <input type="text" placeholder="Name" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Service Type" value={editForm.serviceType} onChange={e => setEditForm({...editForm, serviceType: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <textarea placeholder="Description" rows={2} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Price" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Phone" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
               </div>
            ) : actionType?.type !== 'Delete' && activeTab === 'Jobs' ? (
               <div className="space-y-3 mb-6">
                 <input type="text" placeholder="Job Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Company" value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <textarea placeholder="Description" rows={2} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Salary" value={editForm.salary} onChange={e => setEditForm({...editForm, salary: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
                 <input type="text" placeholder="Contact Phone" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
               </div>
            ) : actionType?.type !== 'Delete' && (
               <div className="space-y-3 mb-6">
                 <input type="text" placeholder="Title / Name" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" defaultValue={actionType?.item || ''} />
                 <textarea placeholder="Description" rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" />
               </div>
            )}

            <div className="flex gap-3 justify-end mt-4">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={confirmAction}
                className={`px-4 py-2 rounded-lg flex-1 justify-center font-bold flex items-center gap-2 transition-all text-white ${
                  actionType?.type === 'Delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {actionType?.type === 'Delete' ? <Trash2 className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
