import { useState, useEffect } from 'react';
import { User, Issue, Job, ServiceContact, ServiceProvider, Shop, Product, LeaderboardEntry, CommunityPost } from './types';
import { db, auth } from './firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, query, getDocFromServer } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const stripUndefined = (obj: any) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

// Initial empty states
const STORE = {
  issues: [] as Issue[],
  jobs: [] as Job[],
  services: [] as ServiceContact[],
  womenServices: [] as ServiceProvider[],
  shops: [] as Shop[],
  products: [] as Product[],
  communityPosts: [] as CommunityPost[],
  leaderboard: [] as LeaderboardEntry[],
  sliderImages: [] as string[],
  users: [] as any[],
  rides: [] as any[],
  activities: [] as any[]
};

// Simple pub-sub
type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach(l => l());
}

let unsubscribes: Array<() => void> = [];

function startSubscriptions() {
  stopSubscriptions();
  
  try {
    const attach = (colName: string, key: keyof typeof STORE) => {
      unsubscribes.push(onSnapshot(collection(db, colName), (snap) => {
        (STORE as any)[key] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        emit();
      }, (err) => handleFirestoreError(err, OperationType.LIST, colName)));
    };

    attach('issues', 'issues');
    attach('jobs', 'jobs');
    attach('services', 'services');
    attach('womenServices', 'womenServices');
    attach('shops', 'shops');
    attach('products', 'products');
    attach('communityPosts', 'communityPosts');
    attach('rides', 'rides');
    attach('activities', 'activities');
    
    // Custom logic for leaderboard by listening to users collection
    unsubscribes.push(onSnapshot(collection(db, 'users'), (snap) => {
      const users = snap.docs.map(d => ({ id: d.id, ...d.data() as any }));
      STORE.users = users;
      STORE.leaderboard = users.map(u => ({
        id: u.id,
        name: u.name || 'Unknown',
        points: u.points || 0,
        badge: u.points > 1000 ? 'Hero' : u.points > 500 ? 'Helper' : 'Citizen'
      }));
      emit();
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'users')));
    
  } catch (err) {
    console.error("Failed to start subscriptions:", err);
  }
}

function stopSubscriptions() {
  unsubscribes.forEach(u => u());
  unsubscribes = [];
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    startSubscriptions();
  } else {
    stopSubscriptions();
  }
});

export const store = {
  get state() {
    return STORE;
  },
  
  async addIssue(issue: Issue) {
    const id = issue.id || Date.now().toString();
    const docRef = doc(db, 'issues', id);
    const { id: _, ...issueWithoutId } = issue;
    const cleanData = Object.fromEntries(Object.entries({ ...issueWithoutId, userId: auth.currentUser?.uid }).filter(([_, v]) => v !== undefined));
    try {
      await setDoc(docRef, cleanData);
    } catch(err) {
      handleFirestoreError(err, OperationType.CREATE, 'issues');
    }
  },
  async updateIssue(id: string, partial: Partial<Issue>) {
    try {
      await updateDoc(doc(db, 'issues', id), stripUndefined(partial));
    } catch(err) {
      handleFirestoreError(err, OperationType.UPDATE, 'issues');
    }
  },
  async deleteIssue(id: string) {
    try {
      await deleteDoc(doc(db, 'issues', id));
    } catch(err) {
      handleFirestoreError(err, OperationType.DELETE, 'issues');
    }
  },

  async addJob(job: Job) {
    const id = job.id || Date.now().toString();
    const { id: _, ...data } = job;
    try {
      await setDoc(doc(db, 'jobs', id), stripUndefined(data));
    } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'jobs'); }
  },
  async updateJob(id: string, partial: Partial<Job>) {
    try { await updateDoc(doc(db, 'jobs', id), stripUndefined(partial)); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'jobs'); }
  },
  async deleteJob(id: string) {
    try { await deleteDoc(doc(db, 'jobs', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'jobs'); }
  },

  async addService(service: ServiceProvider) {
    const id = service.id || Date.now().toString();
    const { id: _, ...data } = service;
    try { await setDoc(doc(db, 'womenServices', id), stripUndefined(data)); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'womenServices'); }
  },
  async updateService(id: string, partial: Partial<ServiceProvider>) {
    try { await updateDoc(doc(db, 'womenServices', id), stripUndefined(partial)); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'womenServices'); }
  },
  async deleteService(id: string) {
     try { await deleteDoc(doc(db, 'womenServices', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'womenServices'); }
  },

  async addServiceContact(contact: ServiceContact) {
    const id = contact.id || Date.now().toString();
    const { id: _, ...data } = contact;
    try { await setDoc(doc(db, 'services', id), stripUndefined(data)); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'services'); }
  },
  async updateServiceContact(id: string, partial: Partial<ServiceContact>) {
    try { await updateDoc(doc(db, 'services', id), stripUndefined(partial)); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'services'); }
  },
  async deleteServiceContact(id: string) {
    try { await deleteDoc(doc(db, 'services', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'services'); }
  },

  async addCommunityPost(post: CommunityPost) {
    const id = post.id || Date.now().toString();
    const { id: _, ...data } = post;
    try { await setDoc(doc(db, 'communityPosts', id), stripUndefined({ ...data, userId: auth.currentUser?.uid })); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'communityPosts'); }
  },
  async updateCommunityPost(id: string, partial: Partial<CommunityPost>) {
    try { await updateDoc(doc(db, 'communityPosts', id), stripUndefined(partial)); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'communityPosts'); }
  },
  async deleteCommunityPost(id: string) {
    try { await deleteDoc(doc(db, 'communityPosts', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'communityPosts'); }
  },
  async createUser(user: User) {
    const docRef = doc(db, 'users', user.id);
    try {
      const snap = await getDocFromServer(docRef);
      if (!snap.exists()) {
        await setDoc(docRef, {
          name: user.name,
          role: user.role || 'user',
          isVerified: true,
          phone: user.phone,
          area: user.area || '',
          points: user.points || 0
        });
      }
    } catch(err) {
      handleFirestoreError(err, OperationType.CREATE, 'users');
    }
  },

  async updateUser(id: string, partial: Partial<User>) {
    try { await updateDoc(doc(db, 'users', id), partial); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'users'); }
  },

  async addShop(shop: Shop) {
    const id = shop.id || Date.now().toString();
    const { id: _, ...data } = shop;
    try { await setDoc(doc(db, 'shops', id), stripUndefined(data)); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'shops'); }
  },
  async updateShop(id: string, partial: Partial<Shop>) {
    try { await updateDoc(doc(db, 'shops', id), stripUndefined(partial)); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'shops'); }
  },
  async deleteShop(id: string) {
    try { await deleteDoc(doc(db, 'shops', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'shops'); }
  },

  async addProduct(product: Product) {
    const id = product.id || Date.now().toString();
    const { id: _, ...data } = product;
    try { await setDoc(doc(db, 'products', id), stripUndefined(data)); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'products'); }
  },
  async updateProduct(id: string, partial: Partial<Product>) {
    try { await updateDoc(doc(db, 'products', id), stripUndefined(partial)); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'products'); }
  },
  async deleteProduct(id: string) {
    try { await deleteDoc(doc(db, 'products', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'products'); }
  },

  async addActivity(title: string, detail: string, points?: number) {
    const id = Date.now().toString();
    try { 
      await setDoc(doc(db, 'activities', id), stripUndefined({ 
        title, 
        detail, 
        points: points || 0, 
        userId: auth.currentUser?.uid, 
        createdAt: new Date().toISOString() 
      })); 
    } catch(err) { console.error('Error logging activity: ', err); }
  },

  async addRide(ride: any) {
    const id = ride.id || Date.now().toString();
    const { id: _, ...data } = ride;
    try { await setDoc(doc(db, 'rides', id), stripUndefined({ ...data, userId: auth.currentUser?.uid, status: 'searching', createdAt: new Date().toISOString() })); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'rides'); }
  },
  async updateRide(id: string, partial: any) {
    try { await updateDoc(doc(db, 'rides', id), stripUndefined(partial)); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'rides'); }
  },
  async deleteRide(id: string) {
    try { await deleteDoc(doc(db, 'rides', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'rides'); }
  },
};

export function useStore() {
  const [state, setState] = useState(STORE);
  
  useEffect(() => {
    const listener = () => setState({ ...STORE });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  
  return state;
}
