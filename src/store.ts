import { useState, useEffect } from 'react';
import { Issue, Job, ServiceContact, ServiceProvider, Shop, Product, LeaderboardEntry, CommunityPost } from './types';
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
  sliderImages: [] as string[]
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
    try {
      await setDoc(docRef, { ...issue, userId: auth.currentUser?.uid, id: undefined });
    } catch(err) {
      handleFirestoreError(err, OperationType.CREATE, 'issues');
    }
  },
  async updateIssue(id: string, partial: Partial<Issue>) {
    try {
      await updateDoc(doc(db, 'issues', id), partial);
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
    try {
      await setDoc(doc(db, 'jobs', id), { ...job, id: undefined });
    } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'jobs'); }
  },
  async updateJob(id: string, partial: Partial<Job>) {
    try { await updateDoc(doc(db, 'jobs', id), partial); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'jobs'); }
  },
  async deleteJob(id: string) {
    try { await deleteDoc(doc(db, 'jobs', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'jobs'); }
  },

  async addService(service: ServiceProvider) {
    const id = service.id || Date.now().toString();
    try { await setDoc(doc(db, 'womenServices', id), { ...service, id: undefined }); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'womenServices'); }
  },
  async updateService(id: string, partial: Partial<ServiceProvider>) {
    try { await updateDoc(doc(db, 'womenServices', id), partial); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'womenServices'); }
  },
  async deleteService(id: string) {
     try { await deleteDoc(doc(db, 'womenServices', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'womenServices'); }
  },

  async addCommunityPost(post: CommunityPost) {
    const id = post.id || Date.now().toString();
    try { await setDoc(doc(db, 'communityPosts', id), { ...post, userId: auth.currentUser?.uid, id: undefined }); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'communityPosts'); }
  },
  async updateCommunityPost(id: string, partial: Partial<CommunityPost>) {
    try { await updateDoc(doc(db, 'communityPosts', id), partial); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'communityPosts'); }
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
    try { await setDoc(doc(db, 'shops', id), { ...shop, id: undefined }); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'shops'); }
  },
  async updateShop(id: string, partial: Partial<Shop>) {
    try { await updateDoc(doc(db, 'shops', id), partial); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'shops'); }
  },
  async deleteShop(id: string) {
    try { await deleteDoc(doc(db, 'shops', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'shops'); }
  },

  async addProduct(product: Product) {
    const id = product.id || Date.now().toString();
    try { await setDoc(doc(db, 'products', id), { ...product, id: undefined }); } catch(err) { handleFirestoreError(err, OperationType.CREATE, 'products'); }
  },
  async updateProduct(id: string, partial: Partial<Product>) {
    try { await updateDoc(doc(db, 'products', id), partial); } catch(err) { handleFirestoreError(err, OperationType.UPDATE, 'products'); }
  },
  async deleteProduct(id: string) {
    try { await deleteDoc(doc(db, 'products', id)); } catch(err) { handleFirestoreError(err, OperationType.DELETE, 'products'); }
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
